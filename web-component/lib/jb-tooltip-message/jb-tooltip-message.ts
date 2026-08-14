import { registerDefaultVariables } from "jb-core/theme";
import { JBBaseComponent, parseBooleanAttribute } from "jb-core";
import CSS from "./jb-tooltip-message.css";
import { renderHTML } from "./render.js";
import type { SizeVariants, TooltipMessageElementsObject } from "./types.js";
import VariablesCSS from "./variables.css";
export * from "./types.js";

const sizes: SizeVariants[] = ["xs", "sm", "md", "lg", "xl"];

export class JBTooltipMessageWebComponent extends JBBaseComponent {
  elements!: TooltipMessageElementsObject;

  get size(): SizeVariants {
    const value = this.getAttribute("size") as SizeVariants | null;
    return value && sizes.includes(value) ? value : "md";
  }

  set size(value: SizeVariants) {
    if (sizes.includes(value)) {
      this.setAttribute("size", value);
    } else {
      this.removeAttribute("size");
    }
  }

  get tail(): boolean {
    return parseBooleanAttribute(this.getAttribute("tail"));
  }

  set tail(value: boolean) {
    this.toggleAttribute("tail", value);
  }

  constructor() {
    super();
    this.#initWebComponent();
  }

  #initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      clonable: true,
      serializable: true,
    });
    registerDefaultVariables();
    const template = document.createElement("template");
    template.innerHTML = `<style>${VariablesCSS} ${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.elements = {
      componentWrapper: shadowRoot.querySelector(".jb-tooltip-message-web-component")!,
      tooltipTail: shadowRoot.querySelector(".tooltip-tail")!,
    };
  }
}

if (globalThis.customElements && !globalThis.customElements.get("jb-tooltip-message")) {
  globalThis.customElements.define("jb-tooltip-message", JBTooltipMessageWebComponent);
}
