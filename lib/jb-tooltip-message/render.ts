export function renderHTML(): string {
  return /* html */ `
  <div class="jb-tooltip-message-web-component">
    <div class="text-content">
        <slot></slot>
    </div>
    <div class="arrow"></div>
</div>
  `;
}