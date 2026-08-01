export function renderHTML(): string {
  return /* html */ `
    <div class="jb-tooltip-web-component">
      <div class="tooltip" popover="hint" role="tooltip" part="tooltip">
        <div class="tooltip-content" part="content">
          <slot name="content">
            <jb-tooltip-message class="default-message" exportparts="message, tail">
              <span class="fallback-content"></span>
            </jb-tooltip-message>
          </slot>
        </div>
      </div>
      <div class="tooltip-trigger-wrapper">
        <slot></slot>
      </div>
    </div>
  `;
}
