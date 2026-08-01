import type { EventTypeWithTarget } from "jb-core";
import type { JBTooltipWebComponent } from "./jb-tooltip.js";

export type ElementsObject = {
  tooltip: HTMLDivElement;
  tooltipContent: HTMLDivElement;
  defaultMessage: HTMLElement;
  triggerSlot: HTMLSlotElement;
  contentSlot: HTMLSlotElement;
  fallbackContent: HTMLSpanElement;
};

export type JBTooltipToggleEvent = EventTypeWithTarget<ToggleEvent, JBTooltipWebComponent>;
