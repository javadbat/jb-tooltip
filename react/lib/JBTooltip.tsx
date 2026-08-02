"use client";

import type { JBElementStandardProps } from "jb-core/react";
import "jb-tooltip";
import type { JBTooltipMessageWebComponent, JBTooltipWebComponent, SizeVariants } from "jb-tooltip";
import React, { type PropsWithChildren, useImperativeHandle, useRef } from "react";
import { type EventProps, useEvents } from "./events-hook.js";
import "./module-declaration.js";

type TooltipProps = EventProps & {
  /** Plain-text tooltip content. Use JBTooltipMessage in the content slot for rich content. */
  content?: string;
  /** Native CSS anchor placement. Defaults to top. */
  positionArea?: string;
  /** Native CSS anchor fallback strategy. Defaults to flip-block, flip-inline. */
  positionTryFallbacks?: string;
  /** Show the standard tooltip message tail. */
  tail?: boolean;
};

export type Props = PropsWithChildren<TooltipProps> & JBElementStandardProps<JBTooltipWebComponent, keyof TooltipProps>;

export const JBTooltip = React.forwardRef<JBTooltipWebComponent, Props>((props, ref) => {
  const element = useRef<JBTooltipWebComponent>(null);
  const { children, content, onBeforeToggle, onToggle, positionArea, positionTryFallbacks, tail, ...otherProps } = props;

  useImperativeHandle(ref, () => element.current!, []);
  useEvents(element, { onBeforeToggle, onToggle });

  return (
    <jb-tooltip {...otherProps} content={content} position-area={positionArea} position-try-fallbacks={positionTryFallbacks} ref={element} tail={tail}>
      {children}
    </jb-tooltip>
  );
});

JBTooltip.displayName = "JBTooltip";

type TooltipMessageProps = {
  /** Controls the standard message padding, typography, radius, and tail size. */
  size?: SizeVariants;
  /** Show the message tail. A parent JBTooltip with tail also enables it. */
  tail?: boolean;
};

export type JBTooltipMessageProps = PropsWithChildren<TooltipMessageProps> & JBElementStandardProps<JBTooltipMessageWebComponent, keyof TooltipMessageProps>;

export const JBTooltipMessage = React.forwardRef<JBTooltipMessageWebComponent, JBTooltipMessageProps>((props, ref) => {
  const element = useRef<JBTooltipMessageWebComponent>(null);
  const { children, size, tail, ...otherProps } = props;

  useImperativeHandle(ref, () => element.current!, []);

  return (
    <jb-tooltip-message {...otherProps} ref={element} size={size} tail={tail}>
      {children}
    </jb-tooltip-message>
  );
});

JBTooltipMessage.displayName = "JBTooltipMessage";

export type { SizeVariants } from "jb-tooltip";
