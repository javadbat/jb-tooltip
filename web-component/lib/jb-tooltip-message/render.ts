export function renderHTML(): string {
  return /* html */ `
    <div class="jb-tooltip-message-web-component" part="message">
      <slot></slot>
      <span class="tooltip-tail" part="tail" aria-hidden="true"></span>
    </div>
  `;
}
