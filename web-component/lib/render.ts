export function renderHTML(): string {
  return /* html */ `
  <div class="jb-tooltip-web-component">
    <div class="tooltip-wrapper --pos-top" role="tooltip" aria-hidden="true">
        <slot name="tooltip-content" class="tooltip-content"></slot>
    </div>
    <div class="tooltip-trigger-wrapper">
        <slot name="tooltip-trigger"></slot>
    </div>
  </div>
  `;
}
