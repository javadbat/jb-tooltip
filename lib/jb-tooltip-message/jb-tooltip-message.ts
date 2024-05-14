import { JBTooltipWebComponent } from "../jb-tooltip";
import { TooltipXPosition, TooltipYPosition } from "../Types";
import HTML from "./jb-tooltip-message.html";
import CSS from "./jb-tooltip-message.scss";
import { Elements } from "./types";
export class JBTooltipMessageWebComponent extends HTMLElement {
  #elements!: Elements;
  constructor() {
    super();
    this.initWebComponent();
  }
  connectedCallback() {
    // standard web component event that called when all of dom is binded
    this.callOnLoadEvent();
    this.initProp();
    this.callOnInitEvent();
  }
  private callOnLoadEvent() {
    const event = new CustomEvent("load", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  private callOnInitEvent() {
    const event = new CustomEvent("init", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  private initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
    });
    const html = `<style>${CSS}</style>` + "\n" + HTML;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.#elements = {
      componentWrapper: shadowRoot.querySelector(
        ".jb-tooltip-message-web-component"
      ) as HTMLDivElement,
      arrow: shadowRoot.querySelector(".arrow")! as HTMLDivElement,
    };
  }
  private registerEventListener() {
    //this.elements.qrcodeWrapper.addEventListener('click', this.toggleisOpen.bind(this));
  }
  private initProp() {
    this.registerEventListener();
    this.#initMessageBoxPosition();
  }
  #parentTooltipWebComponent: JBTooltipWebComponent | null = null;
  #getParentTooltipWebComponent(): JBTooltipWebComponent | null {
    if (this.#parentTooltipWebComponent) {
      return this.#parentTooltipWebComponent;
    }
    let parentTooltipWebComponent: JBTooltipWebComponent | null = null;
    while (parentTooltipWebComponent == null) {
      const parent = this.parentElement;
      if (parent && parent.tagName == "JB-TOOLTIP") {
        parentTooltipWebComponent = parent as JBTooltipWebComponent;
      } else if (!parent) {
        break;
      }
    }
    return parentTooltipWebComponent;
  }
  setYpos(yposition: TooltipYPosition) {
    if (yposition == "top") {
      this.#elements.componentWrapper.classList.add("--pos-top");
      this.#elements.componentWrapper.classList.remove("--pos-bottom");
      this.#elements.componentWrapper.classList.remove("--pos-y-center");
      this.#elements.arrow.classList.add("--arrow-down");
      this.#elements.arrow.classList.remove("--arrow-up");
      this.#elements.arrow.classList.remove("--arrow-y-center");
    }
    if (yposition == "bottom") {
      this.#elements.componentWrapper.classList.add("--pos-bottom");
      this.#elements.componentWrapper.classList.remove("--pos-top");
      this.#elements.componentWrapper.classList.remove("--pos-y-center");
      this.#elements.arrow.classList.add("--arrow-up");
      this.#elements.arrow.classList.remove("--arrow-down");
      this.#elements.arrow.classList.remove("--arrow-y-center");
    }
    if (yposition == "center") {
      this.#elements.componentWrapper.classList.add("--pos-y-center");
      this.#elements.componentWrapper.classList.remove("--pos-bottom");
      this.#elements.componentWrapper.classList.remove("--pos-top");
      this.#elements.arrow.classList.add("--arrow-y-center");
      this.#elements.arrow.classList.remove("--arrow-down");
      this.#elements.arrow.classList.remove("--arrow-top");
    }
  }
  setXpos(yposition: TooltipXPosition) {
    if (yposition == "left") {
      this.#elements.componentWrapper.classList.add("--pos-left");
      this.#elements.componentWrapper.classList.remove("--pos-right");
      this.#elements.componentWrapper.classList.remove("--pos-x-center");
      this.#elements.arrow.classList.add("--arrow-right");
      this.#elements.arrow.classList.remove("--arrow-left");
      this.#elements.arrow.classList.remove("--arrow-x-center");
    }
    if (yposition == "right") {
      this.#elements.componentWrapper.classList.remove("--pos-left");
      this.#elements.componentWrapper.classList.add("--pos-right");
      this.#elements.componentWrapper.classList.remove("--pos-x-center");
      this.#elements.arrow.classList.remove("--arrow-right");
      this.#elements.arrow.classList.add("--arrow-left");
      this.#elements.arrow.classList.remove("--arrow-x-center");
    }
    if (yposition == "center") {
      this.#elements.componentWrapper.classList.remove("--pos-left");
      this.#elements.componentWrapper.classList.remove("--pos-right");
      this.#elements.componentWrapper.classList.add("--pos-x-center");
      this.#elements.arrow.classList.remove("--arrow-right");
      this.#elements.arrow.classList.remove("--arrow-left");
      this.#elements.arrow.classList.add("--arrow-x-center");
    }
  }
  #initMessageBoxPosition() {
    const parentTooltip = this.#getParentTooltipWebComponent();
    if (parentTooltip) {
      const yposition = parentTooltip.displayYPosition;
      this.setYpos(yposition);
      parentTooltip.addEventListener("open", () => {
        const yposition = parentTooltip.displayYPosition;
        this.setYpos(yposition);
      });
    }
  }
  static get observedAttributes(): string[] {
    return [];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  private onAttributeChange(name: string, value: string) {
    // switch (name) {
    // }
  }
}
const myElementNotExists = !customElements.get("jb-tooltip-message");
if (myElementNotExists) {
  window.customElements.define(
    "jb-tooltip-message",
    JBTooltipMessageWebComponent
  );
}
