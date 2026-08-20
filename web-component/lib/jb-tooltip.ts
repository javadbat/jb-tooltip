import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import { registerDefaultVariables } from "jb-core/theme";
import CSS from "./jb-tooltip.css";
import "./jb-tooltip-message/jb-tooltip-message.js";
import { renderHTML } from "./render.js";
import type { ElementsObject } from "./types.js";
import VariablesCSS from "./variables.css";
export * from "./jb-tooltip-message/jb-tooltip-message.js";
export * from "./types.js";

const HIDE_DELAY = 100;
const TAIL_EDGE_PADDING = 8;

type ResolvedPlacement = "top" | "right" | "bottom" | "left";

export class JBTooltipWebComponent extends JBBaseComponent {
  elements!: ElementsObject;
  #internals!: ElementInternals;
  #eventController?: AbortController;
  #triggerEventController?: AbortController;
  #trigger: HTMLElement | null = null;
  #pointerOverTrigger = false;
  #pointerOverTooltip = false;
  #triggerFocused = false;
  #tooltipFocused = false;
  #hideTimeout?: number;
  #tailPositionFrame?: number;
  #tailResizeObserver?: ResizeObserver;
  #managedDescription?: { trigger: HTMLElement; value: string };

  static get observedAttributes() {
    return ["content", "position-area", "position-try-fallbacks", "tail"];
  }

  get content(): string {
    return this.getAttribute("content") ?? "";
  }

  set content(value: string) {
    if (value) {
      this.setAttribute("content", value);
    } else {
      this.removeAttribute("content");
    }
  }

  get positionArea(): string {
    return this.getAttribute("position-area")?.trim() || "top";
  }

  set positionArea(value: string) {
    if (value.trim()) {
      this.setAttribute("position-area", value);
    } else {
      this.removeAttribute("position-area");
    }
  }

  get positionTryFallbacks(): string {
    return this.getAttribute("position-try-fallbacks")?.trim() || "flip-block, flip-inline";
  }

  set positionTryFallbacks(value: string) {
    if (value.trim()) {
      this.setAttribute("position-try-fallbacks", value);
    } else {
      this.removeAttribute("position-try-fallbacks");
    }
  }

  get tail(): boolean {
    return parseBooleanAttribute(this.getAttribute("tail"));
  }

  set tail(value: boolean) {
    this.toggleAttribute("tail", value);
  }

  get open(): boolean {
    return this.elements.tooltip.matches(":popover-open");
  }

  constructor() {
    super();
    this.#initWebComponent();
  }

  connectedCallback() {
    this.#registerEventListeners();
    this.#updateTrigger();
    this.#updateContent();
    this.#updatePosition();
    this.#observeTailGeometry();
  }

  disconnectedCallback() {
    this.#eventController?.abort();
    this.#triggerEventController?.abort();
    this.#tailResizeObserver?.disconnect();
    this.#clearHideTimeout();
    this.#clearTailPositionFrame();
    this.#clearManagedDescription();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, _newValue: string | null) {
    if (name === "content") {
      this.#updateContent();
      return;
    }
    if (name === "tail") {
      this.#scheduleTailPosition();
      return;
    }
    this.#updatePosition();
  }

  /** Opens the tooltip when it has a trigger and content. */
  show() {
    if (!this.isConnected || !this.#trigger || !this.#hasContent() || this.open) {
      return;
    }
    this.#clearHideTimeout();
    this.elements.tooltip.showPopover({ source: this.#trigger });
  }

  /** Closes the tooltip. */
  hide() {
    this.#clearHideTimeout();
    if (this.open) {
      this.elements.tooltip.hidePopover();
    }
  }

  /** Toggles the tooltip and returns its resulting open state. */
  toggle(): boolean {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
    return this.open;
  }

  #initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      clonable: true,
      serializable: true,
    });
    this.#internals = this.attachInternals();
    registerDefaultVariables();
    const template = document.createElement("template");
    template.innerHTML = `<style>${VariablesCSS} ${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.elements = {
      tooltip: shadowRoot.querySelector(".tooltip")!,
      tooltipContent: shadowRoot.querySelector(".tooltip-content")!,
      defaultMessage: shadowRoot.querySelector(".default-message")!,
      triggerSlot: shadowRoot.querySelector("slot:not([name])")!,
      contentSlot: shadowRoot.querySelector('slot[name="content"]')!,
      fallbackContent: shadowRoot.querySelector(".fallback-content")!,
    };
  }

  #registerEventListeners() {
    this.#eventController?.abort();
    this.#eventController = new AbortController();
    const { signal } = this.#eventController;
    this.elements.triggerSlot.addEventListener("slotchange", this.#updateTrigger, { signal });
    this.elements.contentSlot.addEventListener("slotchange", this.#updateContent, { signal });
    this.elements.tooltip.addEventListener("pointerenter", this.#onTooltipPointerEnter, { signal });
    this.elements.tooltip.addEventListener("pointerleave", this.#onTooltipPointerLeave, { signal });
    this.elements.tooltip.addEventListener("focusin", this.#onTooltipFocusIn, { signal });
    this.elements.tooltip.addEventListener("focusout", this.#onTooltipFocusOut, { signal });
    this.elements.tooltip.addEventListener("beforetoggle", this.#onBeforeToggle, { signal });
    this.elements.tooltip.addEventListener("toggle", this.#onToggle, { signal });
    window.addEventListener("resize", this.#scheduleTailPosition, { signal });
    window.addEventListener("scroll", this.#scheduleTailPosition, { capture: true, signal });
  }

  #updateTrigger = () => {
    const nextTrigger = this.elements.triggerSlot.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
    if (nextTrigger === this.#trigger) {
      this.#updateAccessibleDescription();
      return;
    }

    this.#triggerEventController?.abort();
    this.#clearManagedDescription();
    this.#trigger = nextTrigger ?? null;
    this.#pointerOverTrigger = false;
    this.#triggerFocused = false;

    if (!this.#trigger) {
      this.hide();
      this.#observeTailGeometry();
      return;
    }

    this.#triggerEventController = new AbortController();
    const { signal } = this.#triggerEventController;
    this.#trigger.addEventListener("pointerenter", this.#onTriggerPointerEnter, { signal });
    this.#trigger.addEventListener("pointerleave", this.#onTriggerPointerLeave, { signal });
    this.#trigger.addEventListener("focusin", this.#onTriggerFocusIn, { signal });
    this.#trigger.addEventListener("focusout", this.#onTriggerFocusOut, { signal });
    this.#observeTailGeometry();
    this.#updateAccessibleDescription();
  };

  #updateContent = () => {
    this.elements.fallbackContent.textContent = this.content;
    this.#updateAccessibleDescription();
    if (!this.#hasContent()) {
      this.hide();
    }
    this.#scheduleTailPosition();
  };

  #hasContent(): boolean {
    return this.elements.contentSlot.assignedElements({ flatten: true }).length > 0 || this.content.trim().length > 0;
  }

  #getContentText(): string {
    const assignedContent = this.elements.contentSlot.assignedElements({ flatten: true });
    if (assignedContent.length > 0) {
      return assignedContent
        .map(element => element.textContent?.trim())
        .filter(Boolean)
        .join(" ");
    }
    return this.content.trim();
  }

  #updateAccessibleDescription() {
    const trigger = this.#trigger;
    if (!trigger) {
      return;
    }
    const description = this.#getContentText();
    const managedDescription = this.#managedDescription;
    const ariaDescription = trigger.getAttribute("aria-description");
    const hasAuthoredDescription =
      trigger.hasAttribute("aria-describedby") || (ariaDescription !== null && (managedDescription?.trigger !== trigger || ariaDescription !== managedDescription.value));

    if (!description || hasAuthoredDescription) {
      this.#clearManagedDescription();
      return;
    }

    trigger.setAttribute("aria-description", description);
    this.#managedDescription = { trigger, value: description };
  }

  #clearManagedDescription() {
    const managedDescription = this.#managedDescription;
    if (managedDescription && managedDescription.trigger.getAttribute("aria-description") === managedDescription.value) {
      managedDescription.trigger.removeAttribute("aria-description");
    }
    this.#managedDescription = undefined;
  }

  #updatePosition() {
    if (!this.elements) {
      return;
    }
    const positionArea = this.positionArea;
    this.elements.tooltip.style.setProperty("position-area", positionArea);
    this.elements.tooltip.style.setProperty("position-try-fallbacks", this.positionTryFallbacks);
    this.#scheduleTailPosition();
  }

  #observeTailGeometry() {
    if (!this.isConnected) {
      return;
    }
    this.#tailResizeObserver ??= new ResizeObserver(this.#scheduleTailPosition);
    this.#tailResizeObserver.disconnect();
    this.#tailResizeObserver.observe(this.elements.tooltipContent);
    if (this.#trigger) {
      this.#tailResizeObserver.observe(this.#trigger);
    }
  }

  #scheduleTailPosition = () => {
    if (!this.open || this.#tailPositionFrame !== undefined) {
      return;
    }
    this.#tailPositionFrame = window.requestAnimationFrame(() => {
      this.#tailPositionFrame = undefined;
      this.#updateTailPosition();
    });
  };

  #updateTailPosition() {
    const trigger = this.#trigger;
    const message = this.#getActiveTooltipMessage();
    if (!trigger || !message || !this.open) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = message.getBoundingClientRect();
    const placement = this.#resolvePlacement(triggerRect, contentRect);
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const rawOffset = placement === "top" || placement === "bottom" ? triggerCenterX - contentRect.left : triggerCenterY - contentRect.top;
    const availableSize = placement === "top" || placement === "bottom" ? contentRect.width : contentRect.height;
    const offset = Math.min(Math.max(rawOffset, TAIL_EDGE_PADDING), Math.max(availableSize - TAIL_EDGE_PADDING, TAIL_EDGE_PADDING));

    this.elements.tooltip.dataset.placement = placement;
    message.dataset.placement = placement;
    message.style.setProperty("--tooltip-tail-offset", `${offset}px`);
  }

  #getActiveTooltipMessage(): HTMLElement | null {
    const assignedContent = this.elements.contentSlot.assignedElements({ flatten: true });
    if (assignedContent.length === 0) {
      return this.elements.defaultMessage;
    }
    return (assignedContent.find(element => element.localName === "jb-tooltip-message") as HTMLElement | undefined) ?? null;
  }

  #resolvePlacement(triggerRect: DOMRect, contentRect: DOMRect): ResolvedPlacement {
    const candidates: Array<{ placement: ResolvedPlacement; distance: number }> = [];
    if (contentRect.bottom <= triggerRect.top + 1) {
      candidates.push({ placement: "top", distance: triggerRect.top - contentRect.bottom });
    }
    if (contentRect.left >= triggerRect.right - 1) {
      candidates.push({ placement: "right", distance: contentRect.left - triggerRect.right });
    }
    if (contentRect.top >= triggerRect.bottom - 1) {
      candidates.push({ placement: "bottom", distance: contentRect.top - triggerRect.bottom });
    }
    if (contentRect.right <= triggerRect.left + 1) {
      candidates.push({ placement: "left", distance: triggerRect.left - contentRect.right });
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => a.distance - b.distance);
      return candidates[0].placement;
    }

    const deltaX = contentRect.left + contentRect.width / 2 - (triggerRect.left + triggerRect.width / 2);
    const deltaY = contentRect.top + contentRect.height / 2 - (triggerRect.top + triggerRect.height / 2);
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX >= 0 ? "right" : "left";
    }
    return deltaY >= 0 ? "bottom" : "top";
  }

  #clearTailPositionFrame() {
    if (this.#tailPositionFrame !== undefined) {
      window.cancelAnimationFrame(this.#tailPositionFrame);
      this.#tailPositionFrame = undefined;
    }
  }

  #onTriggerPointerEnter = () => {
    this.#pointerOverTrigger = true;
    this.show();
  };

  #onTriggerPointerLeave = () => {
    this.#pointerOverTrigger = false;
    this.#scheduleHide();
  };

  #onTriggerFocusIn = () => {
    this.#triggerFocused = true;
    this.show();
  };

  #onTriggerFocusOut = () => {
    this.#triggerFocused = false;
    this.#scheduleHide();
  };

  #onTooltipPointerEnter = () => {
    this.#pointerOverTooltip = true;
    this.#clearHideTimeout();
  };

  #onTooltipPointerLeave = () => {
    this.#pointerOverTooltip = false;
    this.#scheduleHide();
  };

  #onTooltipFocusIn = () => {
    this.#tooltipFocused = true;
    this.#clearHideTimeout();
  };

  #onTooltipFocusOut = () => {
    this.#tooltipFocused = false;
    this.#scheduleHide();
  };

  #scheduleHide() {
    this.#clearHideTimeout();
    this.#hideTimeout = window.setTimeout(() => {
      if (!this.#pointerOverTrigger && !this.#pointerOverTooltip && !this.#triggerFocused && !this.#tooltipFocused) {
        this.hide();
      }
    }, HIDE_DELAY);
  }

  #clearHideTimeout() {
    if (this.#hideTimeout !== undefined) {
      window.clearTimeout(this.#hideTimeout);
      this.#hideTimeout = undefined;
    }
  }

  #onBeforeToggle = (event: ToggleEvent) => {
    const forwardedEvent = new ToggleEvent("beforetoggle", {
      oldState: event.oldState,
      newState: event.newState,
      bubbles: true,
      composed: true,
      cancelable: event.cancelable,
    });
    if (!this.dispatchEvent(forwardedEvent)) {
      event.preventDefault();
    }
  };

  #onToggle = (event: ToggleEvent) => {
    if (event.newState === "open") {
      this.#internals.states.add("open");
      this.#scheduleTailPosition();
    } else {
      this.#internals.states.delete("open");
      this.#clearTailPositionFrame();
    }
    this.dispatchEvent(
      new ToggleEvent("toggle", {
        oldState: event.oldState,
        newState: event.newState,
        bubbles: true,
        composed: true,
      }),
    );
  };
}

defineWebComponent("jb-tooltip", JBTooltipWebComponent);
