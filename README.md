# jb-tooltip

Standards-based tooltip web component for the JB Design System. It uses the browser Popover API for top-layer display and CSS anchor positioning for placement and overflow fallback.

## Installation

```sh
npm install jb-tooltip
```

```js
import "jb-tooltip";
```

## Basic usage

The default slot is the trigger. For a short text tooltip, set the `content` attribute:

```html
<jb-tooltip content="Small content">
  <button type="button">Trigger</button>
</jb-tooltip>
```

Use a focusable trigger such as a button or link so the tooltip is available to keyboard users. The first element in the default slot is used as the trigger and positioning anchor.

The standard tooltip message uses a light surface by default. It follows the shared design-system surface, text, and border tokens when they are available.

## Rich content

Content assigned to the `content` slot takes priority over the `content` attribute. `jb-tooltip-message` supplies the standard tooltip presentation but is optional.

```html
<jb-tooltip>
  <button type="button">Trigger</button>
  <jb-tooltip-message slot="content">
    Rich tooltip content
  </jb-tooltip-message>
</jb-tooltip>
```

Provide a custom presentation by placing any element in the content slot:

```html
<jb-tooltip>
  <button type="button">Trigger</button>
  <div slot="content">Custom tooltip presentation</div>
</jb-tooltip>
```

The tooltip remains closed when neither the `content` attribute nor the `content` slot provides content.

## Placement

`position-area` and `position-try-fallbacks` mirror the corresponding CSS anchor-positioning properties:

```html
<jb-tooltip
  content="Shown below the trigger"
  position-area="bottom"
  position-try-fallbacks="flip-block, flip-inline"
>
  <button type="button">Trigger</button>
</jb-tooltip>
```

The defaults are `position-area="top"` and `position-try-fallbacks="flip-block, flip-inline"`.

The four common physical placements are:

```html
<jb-tooltip content="Above" position-area="top">
  <button type="button">Top</button>
</jb-tooltip>

<jb-tooltip content="To the right" position-area="right">
  <button type="button">Right</button>
</jb-tooltip>

<jb-tooltip content="Below" position-area="bottom">
  <button type="button">Bottom</button>
</jb-tooltip>

<jb-tooltip content="To the left" position-area="left">
  <button type="button">Left</button>
</jb-tooltip>
```

These names are writing-mode-aware when logical values such as `block-start`, `block-end`, `inline-start`, and `inline-end` are used. Any value supported by the native [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-area) property can be passed through.

The properties can also be changed from JavaScript:

```js
const tooltip = document.querySelector("jb-tooltip");
tooltip.positionArea = "right";
tooltip.positionTryFallbacks = "flip-inline";
```

The Storybook `Fallback Positions` story pins triggers to the top and left viewport edges. Its interaction test verifies native `flip-block` and `flip-inline` behavior, final geometry, and tail direction.

### Optional tail

Add the boolean `tail` attribute to render a triangular pointer:

```html
<jb-tooltip content="Saved automatically" position-area="top" tail>
  <button type="button">Draft status</button>
</jb-tooltip>
```

The tail follows the tooltip's actual rendered side, including when CSS anchor positioning selects a flipped fallback. For off-center placements, it is shifted toward the trigger while retaining safe edge padding.

The triangle is rendered by `jb-tooltip-message`, not by the popover shell. The internal fallback message receives `tail` automatically from `jb-tooltip`. For rich content, use the standard message component when a tail is required:

```html
<jb-tooltip tail>
  <button type="button">Trigger</button>
  <jb-tooltip-message slot="content">Message with a tail</jb-tooltip-message>
</jb-tooltip>
```

Fully custom content is responsible for its own pointer presentation.

## Public API

| Property | Type | Description |
| --- | --- | --- |
| `content` | `string` | Plain-text fallback used when the content slot is empty. |
| `positionArea` | `string` | Value applied to the native `position-area` property. |
| `positionTryFallbacks` | `string` | Value applied to the native `position-try-fallbacks` property. |
| `tail` | `boolean` | Reflects the optional `tail` attribute. |
| `open` | `boolean` (read-only) | Whether the internal popover is currently open. |

| Method | Description |
| --- | --- |
| `show()` | Opens the tooltip when it has a trigger and content. |
| `hide()` | Closes the tooltip. |
| `toggle()` | Toggles the tooltip and returns its resulting open state. |

`beforetoggle` and `toggle` are exposed on `jb-tooltip` as `ToggleEvent` events. The tooltip also responds to pointer hover, keyboard focus, Escape, light dismiss, and competing hint popovers.

### Tooltip message sizes

`jb-tooltip-message` supports the design-system size scale. The default is `md`:

```html
<jb-tooltip-message size="xs">Extra small</jb-tooltip-message>
<jb-tooltip-message size="sm">Small</jb-tooltip-message>
<jb-tooltip-message size="md">Medium</jb-tooltip-message>
<jb-tooltip-message size="lg">Large</jb-tooltip-message>
<jb-tooltip-message size="xl">Extra large</jb-tooltip-message>
```

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls padding, font size, radius, and tail size. |
| `tail` | `boolean` | `false` | Shows the message-owned triangular pointer when placement data is provided by `jb-tooltip`. |

### Imperative example

```js
const tooltip = document.querySelector("jb-tooltip");

tooltip.show();
tooltip.hide();
tooltip.toggle();
```

## Slots

| Slot | Description |
| --- | --- |
| default | Trigger and positioning anchor. The first assigned element is used. |
| `content` | Optional rich or custom tooltip content. |

## CSS parts and variables

| Part | Description |
| --- | --- |
| `tooltip` | Native popover surface. |
| `content` | Wrapper around the resolved tooltip content. |
| `message` | Standard fallback message surface. |
| `tail` | Triangle owned and exported by the standard `jb-tooltip-message`. |

| CSS variable | Default | Description |
| --- | --- | --- |
| `--jb-tooltip-max-width` | `min(100vw - 2rem, 20rem)` | Maximum tooltip width. |
| `--jb-tooltip-gap` | `0.5rem` | Space between the trigger and tooltip. |
| `--jb-tooltip-padding` | `0.5rem 0.75rem` | Standard message padding. |
| `--jb-tooltip-font-size` | `0.875rem` | Standard message font size. |
| `--jb-tooltip-border-radius` | `--jb-radius-sm` | Standard message corner radius. |
| `--jb-tooltip-bg-color` | `--jb-surface` or white | Standard light message background. |
| `--jb-tooltip-text-color` | `--jb-text-primary` | Standard message text color. |
| `--jb-tooltip-border` | Shared border token | Standard message border. |
| `--jb-tooltip-box-shadow` | Light elevation shadow | Standard message shadow. |
| `--jb-tooltip-tail-size` | `0.375rem` | Height of the optional triangle. |
| `--jb-tooltip-tail-bg-color` | `--jb-tooltip-bg-color` | Triangle fill color. |
| `--jb-tooltip-tail-border-color` | Shared border color | Triangle outline color. |
| `--jb-tooltip-tail-border-width` | `1px` | Triangle outline width. |

Each size-sensitive token also accepts an `-xs`, `-sm`, `-md`, `-lg`, or `-xl` suffix. For example, `--jb-tooltip-padding-sm`, `--jb-tooltip-font-size-lg`, `--jb-tooltip-border-radius-xl`, and `--jb-tooltip-tail-size-xs` customize individual message sizes. The unsuffixed variable overrides every size.

```css
jb-tooltip {
  --jb-tooltip-max-width: 24rem;
  --jb-tooltip-bg-color: #172033;
  --jb-tooltip-text-color: #fff;
  --jb-tooltip-tail-border-color: #40506b;
}

jb-tooltip::part(message) {
  border: 1px solid #40506b;
  box-shadow: 0 0.75rem 1.5rem rgb(15 23 42 / 20%);
}

jb-tooltip::part(tail) {
  filter: drop-shadow(0 1px 0 #40506b);
}
```

Prefer variables for standard colors and dimensions. Use `::part(message)` for presentation details such as borders, shadows, gradients, typography, and backdrop effects. The Storybook styling page contains Carbon, Aurora, Forest, Sunset, Porcelain, Candy, Terminal, Material, Fluent, Bootstrap, Cupertino, and Ant Design recipes.

## Accessibility

- The popover surface has `role="tooltip"`.
- Focusable triggers open the tooltip on keyboard focus.
- An existing authored `aria-describedby` or `aria-description` is preserved. Otherwise, the component supplies an `aria-description` from its content.
- Tooltip content should be descriptive and non-interactive. Use a popover or dialog component for interactive controls.

## Storybook examples and tests

The component stories cover plain text, rich content, fully custom content, all four common placements, hover and keyboard interactions, Escape dismissal, and the imperative API. Their `play` functions also serve as browser interaction tests.
