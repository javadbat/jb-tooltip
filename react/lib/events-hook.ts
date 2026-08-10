import { useEvent } from "jb-core/react";
import type { JBTooltipToggleEvent, JBTooltipWebComponent } from "@jbui/tooltip";
import type { RefObject } from "react";

export type EventProps = {
  /** Called before the native tooltip popover changes state. Prevent the event to cancel opening when supported. */
  onBeforeToggle?: (event: JBTooltipToggleEvent) => void;
  /** Called after the native tooltip popover changes state. */
  onToggle?: (event: JBTooltipToggleEvent) => void;
};

export function useEvents(element: RefObject<JBTooltipWebComponent | null>, props: EventProps) {
  useEvent(element, "beforetoggle", props.onBeforeToggle);
  useEvent(element, "toggle", props.onToggle);
}
