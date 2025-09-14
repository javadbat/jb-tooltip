import CSS from './jb-tooltip.css';
import { renderHTML } from './render';
import { Elements, TooltipXPosition, TooltipYPosition } from "./types";
export * from './jb-tooltip-message/jb-tooltip-message';
export class JBTooltipWebComponent extends HTMLElement {

  elements!: Elements;
  #isOpen = false;
  get isOpen() {
    return this.#isOpen;
  }
  set isOpen(value: boolean) {
    this.#isOpen = value;
    this.#handleForOverflow();
    if (value) {
      this.elements.tooltipWrapper.classList.add('--show');
    } else {
      this.elements.tooltipWrapper.classList.remove('--show');
      this.#displayYPosition = this.yPosition;
      //remove immediate class becuase they are temporary classes
      this.elements.tooltipWrapper.classList.remove('--pos-bottom-immediate');
      this.elements.tooltipWrapper.classList.remove('--pos-top-immediate');
      this.elements.tooltipWrapper.classList.remove('--pos-left-immediate');
      this.elements.tooltipWrapper.classList.remove('--pos-right-immediate');
    }
  }
  #yPosition: TooltipYPosition = 'top';
  set yPosition(value: TooltipYPosition) {
    this.elements.tooltipWrapper.classList.remove('--pos-top');
    this.elements.tooltipWrapper.classList.remove('--pos-bottom');
    this.elements.tooltipWrapper.classList.remove('--pos-y-center');
    switch (value) {
      case 'top':
        this.elements.tooltipWrapper.classList.add('--pos-top');
        break;
      case 'bottom':
        this.elements.tooltipWrapper.classList.add('--pos-bottom');
        break;
      case 'center':
        this.elements.tooltipWrapper.classList.add('--pos-y-center');
        break;
    }
    this.#yPosition = value;
    this.displayYPosition = value;
  }
  get yPosition() {
    return this.#yPosition;
  }
  #displayYPosition: TooltipYPosition = 'top';
  get displayYPosition() {
    return this.#displayYPosition;
  }
  set displayYPosition(value: TooltipYPosition) {
    this.elements.tooltipWrapper.classList.remove('--pos-top-immediate');
    this.elements.tooltipWrapper.classList.remove('--pos-bottom-immediate');
    this.elements.tooltipWrapper.classList.remove('--pos-x-center');
    switch (value) {
      case 'top':
        this.elements.tooltipWrapper.classList.add('--pos-top-immediate');
        break;
      case 'bottom':
        this.elements.tooltipWrapper.classList.add('--pos-bottom-immediate');
        break;
      case 'center':
        this.elements.tooltipWrapper.classList.add('--pos-x-center');
        break;
    }
    this.#displayYPosition = value;
  }
  #xPosition: TooltipXPosition = 'center';
  get xPosition(): TooltipXPosition {
    return this.#xPosition;
  }
  set xPosition(value: TooltipXPosition) {
    this.elements.tooltipWrapper.classList.remove('--pos-left');
    this.elements.tooltipWrapper.classList.remove('--pos-right');
    this.elements.tooltipWrapper.classList.remove('--pos-x-center');
    switch (value) {
      case 'left':
        this.elements.tooltipWrapper.classList.add('--pos-left');
        break;
      case 'right':
        this.elements.tooltipWrapper.classList.add('--pos-right');
        break;
      case 'center':
        this.elements.tooltipWrapper.classList.add('--pos-x-center');
        break;
    }
    this.#xPosition = value;
  }
  #displayXPosition: TooltipXPosition = 'center';
  get displayXPosition() {
    return this.#displayXPosition;
  }
  set displayXPosition(value: TooltipXPosition) {
    this.elements.tooltipWrapper.classList.remove('--pos-left-immediate');
    this.elements.tooltipWrapper.classList.remove('--pos-right-immediate');
    this.elements.tooltipWrapper.classList.remove('--pos-center');
    switch (value) {
      case 'left':
        this.elements.tooltipWrapper.classList.add('--pos-left-immediate');
        break;
      case 'right':
        this.elements.tooltipWrapper.classList.add('--pos-right-immediate');
        break;
      case 'center':
        this.elements.tooltipWrapper.classList.add('--pos-center');
        break;
    }
    this.#displayXPosition = value;
  }

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
    const event = new CustomEvent('load', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  private callOnInitEvent() {
    const event = new CustomEvent('init', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  private initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const html = `<style>${CSS}</style>` + '\n' + renderHTML();
    const element = document.createElement('template');
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.elements = {
      tooltipWrapper: shadowRoot.querySelector('.tooltip-wrapper')! as HTMLDivElement,
      tooltipTriggerWrapper: shadowRoot.querySelector('.tooltip-trigger-wrapper')! as HTMLDivElement,
    };

  }
  private registerEventListener() {
    //this.elements.qrcodeWrapper.addEventListener('click', this.toggleisOpen.bind(this));
    this.elements.tooltipTriggerWrapper.addEventListener("mouseover", this.openTooltip.bind(this));
    this.elements.tooltipTriggerWrapper.addEventListener("mouseout", this.closeTooltip.bind(this));
  }
  public openTooltip() {
    this.isOpen = true;
    this.#triggerOpenEvent();
  }
  public closeTooltip() {
    this.isOpen = false;
  }
  public toggleisOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.#triggerOpenEvent();
    }
  }
  #triggerOpenEvent() {
    const event = new CustomEvent('open', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  private initProp() {
    this.registerEventListener();
    this.yPosition = this.getAttribute('y-position') as TooltipYPosition || 'top';
    this.xPosition = this.getAttribute('x-position') as TooltipXPosition || 'center';

  }
  static get observedAttributes() {
    return ['y-position', 'x-position'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  private onAttributeChange(name: string, value: string) {
    switch (name) {
      case 'y-position':
        this.yPosition = value as TooltipYPosition;
        break;
      case 'x-position':
        this.xPosition = value as TooltipXPosition;
        break;
    }

  }
  #handleForOverflow() {
    const elem = this.elements.tooltipWrapper;
    const isOut = this.#isOutOfViewport(elem);

    if (this.yPosition == "top" && isOut.top) {
      this.displayYPosition = "bottom";
    }

    if (isOut.left) {
      // Left side is out of viewoprt
      this.displayXPosition = "right";
    }

    if (isOut.bottom) {
      // Bottom is out of viewport
      this.displayYPosition = "top";
    }

    if (isOut.right) {
      // Right side is out of viewport
      this.displayXPosition = "left";
    }
  }
  #isOutOfViewport(elem: HTMLElement) {

    // Get element's bounding
    const bounding = elem.getBoundingClientRect();

    // Check if it's out of the viewport on each side
    const out = { top: false, left: false, bottom: false, right: false, any: false, all: false };
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;

    return out;
  }
}
const myElementNotExists = !customElements.get('jb-tooltip');
if (myElementNotExists) {
  window.customElements.define('jb-tooltip', JBTooltipWebComponent);
}
