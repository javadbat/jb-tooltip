# jb-tooltip

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-tooltip)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-tooltip/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-tooltip)](https://www.npmjs.com/package/jb-tooltip)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-tooltip)

`jb-tooltip` is an accessible, standards-based tooltip web component for the JB Design System. It uses the browser Popover API for top-layer display and CSS anchor positioning for placement and overflow fallback. See the [basic tooltip demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text).

- Opens on pointer hover and keyboard focus. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--hover-interaction)
- Closes on pointer leave, focus leave, Escape, light dismiss, or when another hint popover opens.
- Uses the default slot as the trigger, without requiring a slot attribute. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text)
- Accepts simple text through the `content` attribute. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text)
- Accepts rich or fully custom content through the `content` slot. [Rich demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--rich-content) · [Custom demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--custom-content)
- Supports native `position-area` values and `position-try-fallbacks`. [Positions demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions) · [Fallback demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions)
- Supports optional triangular tails that follow the resolved fallback placement. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--with-tail)
- Provides `xs`, `sm`, `md`, `lg`, and `xl` message sizes. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes)
- Uses a light design-system surface by default.
- Preserves authored accessible descriptions and supplies one when needed.
- Supports imperative `show()`, `hide()`, and `toggle()` methods. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--imperative-api)
- Exposes CSS variables, CSS parts, and an `open` custom state for styling. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-style--gallery)
- Includes TypeScript declarations and a Custom Elements Manifest.
- Works with plain JavaScript and frameworks that support custom elements.

## When to use

Use `jb-tooltip` for a short, non-interactive description that clarifies a button, icon, abbreviation, status, or compact control. The information should be helpful but should not be required to complete the task. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text)

Use a popover, menu, or dialog instead when the floating content contains links, buttons, form fields, or other interactions. Do not use a tooltip as the only place for essential instructions or error messages.

## Demo

- [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) for plain text and keyboard behavior.
- [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--rich-content) for rich slotted content.
- [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions) for native fallback positioning.
- [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-style--gallery) for styling recipes.
- [GitHub Pages](https://javadbat.github.io/jb-tooltip/) for the standalone component site.

## Using with JavaScript frameworks

Import `jb-tooltip` once in the browser entry point, then render it like any other custom element.

Framework integration guidance: <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#react" target="_blank" rel="noopener noreferrer">React</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#angular" target="_blank" rel="noopener noreferrer">Angular</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#vue" target="_blank" rel="noopener noreferrer">Vue</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nuxt" target="_blank" rel="noopener noreferrer">Nuxt</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#svelte" target="_blank" rel="noopener noreferrer">Svelte</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#sveltekit" target="_blank" rel="noopener noreferrer">SvelteKit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#solidjs" target="_blank" rel="noopener noreferrer">SolidJS</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#lit" target="_blank" rel="noopener noreferrer">Lit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nextjs" target="_blank" rel="noopener noreferrer">Next.js</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#astro" target="_blank" rel="noopener noreferrer">Astro</a>

The package also includes a typed React wrapper. See [`react/README.md`](./react/README.md) and the [React demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text).

For React, use the included wrapper:

```tsx
import { JBTooltip, JBTooltipMessage } from '@jbui/tooltip/react';

<JBTooltip content="Save the current draft" positionArea="top" tail>
  <button type="button">Save</button>
</JBTooltip>
```

See the [React wrapper README](./react/README.md) for rich content, event callbacks, and the imperative ref API.

## Installation

```sh
npm install @jbui/tooltip
```

```js
import '@jbui/tooltip';
```

### CDN

The UMD build registers both `<jb-tooltip>` and `<jb-tooltip-message>`:

```html
<script src="https://unpkg.com/jb-core/dist/index.umd.js"></script>
<script src="https://unpkg.com/jb-core/theme/dist/index.umd.js"></script>
<script src="https://unpkg.com/jb-tooltip/web-component/dist/jb-tooltip.umd.js"></script>
```

## Basic usage

See the [basic text demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) for keyboard focus, hover, and accessible description behavior.

The default slot is the trigger. For a short text tooltip, set the `content` attribute:

```html
<jb-tooltip content="Small content">
  <button type="button">Trigger</button>
</jb-tooltip>
```

Use a natively focusable trigger such as a button or link so keyboard users can reach it. The first element in the default slot becomes both the interaction target and the CSS positioning anchor.

The component host and its trigger wrappers use `display: contents`, so `jb-tooltip` does not add a layout box around the trigger.

The tooltip remains closed when no trigger exists or when neither the `content` attribute nor the `content` slot provides content.

## Rich and custom content

Use the [rich content demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--rich-content) for `jb-tooltip-message` and the [custom content demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--custom-content) for a fully authored surface.

Content assigned to the `content` slot takes priority over the `content` attribute. Use `jb-tooltip-message` for the standard design-system presentation:

```html
<jb-tooltip>
  <button type="button">Save</button>

  <jb-tooltip-message slot="content">
    <strong>Save changes</strong>
    <span>Stores the current draft.</span>
  </jb-tooltip-message>
</jb-tooltip>
```

`jb-tooltip-message` is optional. Assign any element when the product needs a completely custom surface:

```html
<jb-tooltip position-area="bottom">
  <button type="button">Build status</button>

  <div slot="content" class="build-status-tooltip">
    <span aria-hidden="true">●</span>
    All checks passed
  </div>
</jb-tooltip>
```

Slotted content must have an element root. Plain text should use the `content` attribute or be wrapped by `jb-tooltip-message`.

## Interaction behavior

The [hover interaction demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--hover-interaction) shows pointer dismissal, while the [lifecycle demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--event-lifecycle) covers `beforetoggle` and `toggle`.

`jb-tooltip` opens when its trigger receives pointer hover or keyboard focus. A short close delay lets the pointer move from the trigger into the tooltip without immediately dismissing it.

The internal popover uses `popover="hint"`, so it participates in native top-layer behavior:

- Escape and light dismiss close the tooltip.
- Opening another hint popover dismisses the previous hint.
- The tooltip is not clipped by ordinary ancestor overflow.
- The `beforetoggle` and `toggle` lifecycle is exposed on `jb-tooltip`.

Keep tooltip content non-interactive even though the component keeps the surface open while it is hovered or focused.

## Placement and fallback positioning

See the [positions demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions) for the four common sides and the [fallback demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions) for viewport-edge resolution.

`position-area` and `position-try-fallbacks` pass native CSS anchor-positioning values to the tooltip surface.

```html
<jb-tooltip
  content="Shown below the trigger"
  position-area="bottom"
  position-try-fallbacks="flip-block, flip-inline"
>
  <button type="button">Trigger</button>
</jb-tooltip>
```

The defaults are:

| attribute | default |
| --- | --- |
| `position-area` | `top` |
| `position-try-fallbacks` | `flip-block, flip-inline` |

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

Native logical values such as `block-start`, `block-end`, `inline-start`, and `inline-end` follow the document writing mode. Any value supported by [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-area) can be passed through.

Change placement at runtime with the camel-case properties:

```js
const tooltip = document.querySelector('jb-tooltip');

tooltip.positionArea = 'right';
tooltip.positionTryFallbacks = 'flip-inline';
```

Set `position-try-fallbacks="none"` when the requested placement must remain fixed. Otherwise, the browser chooses a fallback when the preferred side does not fit.

## Optional tail

The [tail demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--with-tail) shows the message-owned triangle following the resolved placement.

Add `tail` when the tooltip should point visually to its trigger:

```html
<jb-tooltip content="Saved automatically" position-area="top" tail>
  <button type="button">Draft status</button>
</jb-tooltip>
```

The triangle belongs to `jb-tooltip-message`, not to the popover shell. It follows the tooltip's actual rendered side after native fallback positioning and moves toward off-center triggers while retaining safe edge spacing.

The internal message used by the `content` attribute receives the tail automatically. Rich content should use `jb-tooltip-message` when a tail is required:

```html
<jb-tooltip tail>
  <button type="button">Trigger</button>
  <jb-tooltip-message slot="content">Message with a tail</jb-tooltip-message>
</jb-tooltip>
```

Fully custom slotted content is responsible for its own pointer presentation.

## Message sizes

Use the [message size demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes) to compare `xs` through `xl`.

`jb-tooltip-message` supports the design-system size scale. The default is `md`.

```html
<jb-tooltip>
  <button type="button">Details</button>
  <jb-tooltip-message slot="content" size="lg">
    A larger tooltip message
  </jb-tooltip-message>
</jb-tooltip>
```

| value | intended scale |
| --- | --- |
| `xs` | Extra-small padding, type, radius, and tail. |
| `sm` | Small padding, type, radius, and tail. |
| `md` | Default message size. |
| `lg` | Large padding, type, radius, and tail. |
| `xl` | Extra-large padding, type, radius, and tail. |

The size attribute belongs to `jb-tooltip-message`. For a simple `content` attribute tooltip, use the unsuffixed CSS variables to customize its standard internal message.

## API reference

### `jb-tooltip` attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `content` | `string` | `""` | Plain-text content used when the `content` slot is empty. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) |
| `position-area` | `string` | `top` | Preferred native CSS anchor placement. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions) |
| `position-try-fallbacks` | `string` | `flip-block, flip-inline` | Native fallback strategy used when the preferred placement does not fit. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions) |
| `tail` | `boolean` | `false` | Shows the message-owned triangular tail. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--with-tail) |

### `jb-tooltip` properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `content` | `string` | no | Plain-text fallback content. Reflects the `content` attribute. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) |
| `positionArea` | `string` | no | Preferred native CSS anchor placement. Reflects `position-area`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions) |
| `positionTryFallbacks` | `string` | no | Native fallback strategy. Reflects `position-try-fallbacks`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions) |
| `tail` | `boolean` | no | Enables or disables the message-owned tail. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--with-tail) |
| `open` | `boolean` | yes | Whether the internal native popover is currently open. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) |
| `elements` | `ElementsObject` | no | Internal element references for advanced integrations. Prefer the public methods and styling API. |

### `jb-tooltip` methods

| name | returns | description |
| --- | --- | --- |
| `show()` | `void` | Opens the tooltip when it is connected and has a trigger and content. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--imperative-api) |
| `hide()` | `void` | Closes the tooltip. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--imperative-api) |
| `toggle()` | `boolean` | Toggles the tooltip and returns its resulting open state. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--imperative-api) |

```js
const tooltip = document.querySelector('jb-tooltip');

tooltip.show();
tooltip.hide();
const isOpen = tooltip.toggle();
```

### `jb-tooltip` events

| event | type | description |
| --- | --- | --- |
| `beforetoggle` | `ToggleEvent` | Fired before the native popover changes state. Canceling a cancelable opening event prevents it. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--event-lifecycle) |
| `toggle` | `ToggleEvent` | Fired after the native popover changes state. Read `oldState` and `newState`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--event-lifecycle) |

Both events bubble and cross the shadow boundary from `jb-tooltip`.

```js
const tooltip = document.querySelector('jb-tooltip');

tooltip.addEventListener('toggle', event => {
  console.log(event.oldState, event.newState);
});
```

### `jb-tooltip-message` attributes and properties

| name | type | default | description |
| --- | --- | --- | --- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` | Controls message padding, font size, radius, and tail size. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes) |
| `tail` | `boolean` | `false` | Shows the message-owned tail. A parent `<jb-tooltip tail>` also enables it. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes) |

## Slots

See the [rich content demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--rich-content) and [custom content demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--custom-content) for slot usage.

### `jb-tooltip`

| slot | description |
| --- | --- |
| default | Trigger and positioning anchor. The first assigned element is used. |
| `content` | Optional rich or custom tooltip content. An element root is required. |

### `jb-tooltip-message`

| slot | description |
| --- | --- |
| default | Message content. |

## CSS parts, custom states, and variables

For live examples and copyable style recipes, see the [styling guide](https://javadbat.github.io/design-system/?path=/docs/components-jbtooltip-styling--docs) and [style gallery](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-style--gallery).

### Parts

| component | part | description |
| --- | --- | --- |
| `jb-tooltip` | `tooltip` | Native top-layer popover surface. |
| `jb-tooltip` | `content` | Wrapper around the resolved tooltip content. |
| `jb-tooltip` | `message` | Exported standard fallback message used by the `content` attribute. |
| `jb-tooltip` | `tail` | Exported tail of the fallback message. |
| `jb-tooltip-message` | `message` | Styled message surface. |
| `jb-tooltip-message` | `tail` | Message-owned triangular tail. |

The `message` and `tail` parts on `jb-tooltip` refer only to its internal fallback message. Style a slotted message directly with `jb-tooltip-message::part(message)` and `jb-tooltip-message::part(tail)`.

### Custom states

| component | state | description |
| --- | --- | --- |
| `jb-tooltip` | `open` | Applied while the native tooltip popover is open. |

```css
jb-tooltip:state(open)::part(message) {
  animation: tooltip-enter 120ms ease-out;
}
```

### Variables

| CSS variable | default | description |
| --- | --- | --- |
| `--jb-tooltip-max-width` | `min(100vw - 2rem, 20rem)` | Maximum tooltip width. |
| `--jb-tooltip-gap` | `0.5rem` | Space between the trigger and tooltip. |
| `--jb-tooltip-padding` | `0.5rem 0.75rem` at `md` | Message padding override for every size. |
| `--jb-tooltip-font-size` | `0.875rem` at `md` | Message font-size override for every size. |
| `--jb-tooltip-border-radius` | `--jb-radius-sm` at `md` | Message radius override for every size. |
| `--jb-tooltip-bg-color` | `--jb-surface` or white | Light message background. |
| `--jb-tooltip-text-color` | `--jb-text-primary` or dark gray | Message text color. |
| `--jb-tooltip-border` | Shared border token | Message border shorthand. |
| `--jb-tooltip-box-shadow` | Light elevation shadow | Message shadow. |
| `--jb-tooltip-tail-size` | `0.375rem` at `md` | Tail size override for every size. |
| `--jb-tooltip-tail-bg-color` | Message background | Tail fill color. |
| `--jb-tooltip-tail-border-color` | Shared border color | Tail outline color. |
| `--jb-tooltip-tail-border-width` | `1px` | Tail outline width. |

Each size-sensitive variable also accepts an `-xs`, `-sm`, `-md`, `-lg`, or `-xl` suffix:

| variable pattern | example |
| --- | --- |
| `--jb-tooltip-padding-{size}` | `--jb-tooltip-padding-sm` |
| `--jb-tooltip-font-size-{size}` | `--jb-tooltip-font-size-lg` |
| `--jb-tooltip-border-radius-{size}` | `--jb-tooltip-border-radius-xl` |
| `--jb-tooltip-tail-size-{size}` | `--jb-tooltip-tail-size-xs` |

The unsuffixed variable overrides every size.

```css
jb-tooltip.brand-tooltip {
  --jb-tooltip-max-width: 24rem;
  --jb-tooltip-bg-color: #172033;
  --jb-tooltip-text-color: #fff;
  --jb-tooltip-border: 1px solid #40506b;
  --jb-tooltip-border-radius: 0.5rem;
  --jb-tooltip-tail-bg-color: #172033;
  --jb-tooltip-tail-border-color: #40506b;
  --jb-tooltip-tail-border-width: 1px;
}

jb-tooltip.brand-tooltip::part(message) {
  box-shadow: 0 0.75rem 1.5rem rgb(15 23 42 / 20%);
}
```

Prefer variables for colors and dimensions. Use parts for presentation details such as gradients, typography, borders, shadows, and animations.

## Accessibility notes

Review the [basic text demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) to see keyboard focus and generated `aria-description` behavior.

- The internal popover surface has `role="tooltip"`.
- Pointer hover and keyboard focus both reveal the same content.
- The first trigger element should be natively focusable. If it is not, the application must provide correct keyboard semantics.
- If the trigger already has `aria-describedby` or an authored `aria-description`, the component preserves it.
- Otherwise, the component creates an `aria-description` from the plain-text or slotted content and removes only the description it manages.
- Escape and native light dismiss close the tooltip.
- Tooltip content should remain concise and non-interactive.
- Do not place essential instructions exclusively inside a tooltip because touch, assistive technology, and discoverability needs vary.

## Browser requirements

This component intentionally uses native platform behavior and does not include a positioning polyfill. The target browser must support:

- The [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API), including `showPopover()` and `hidePopover()`.
- CSS anchor positioning, including [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-area) and [`position-try-fallbacks`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks).
- Custom elements, shadow DOM, `ElementInternals`, and custom states.

Check the deployment browser matrix before adopting the component in an application that supports older browsers.

## Examples and tests

The interactive stories cover:

- Plain text and rich content. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--rich-content)
- Fully custom content. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--custom-content)
- Hover, keyboard focus, and Escape dismissal. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--hover-interaction)
- All four common placements. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions)
- Block-axis and inline-axis fallback positioning at viewport edges. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions)
- Tail placement after native fallback resolution. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--with-tail)
- All five message sizes. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes)
- Imperative methods. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--imperative-api)
- Multiple design-system styling recipes.

Story `play` functions also act as browser interaction tests for open state, accessible descriptions, positioning geometry, fallback direction, and tail visibility.

## Related docs

- Read the [Popover API guide](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using) for native top-layer and light-dismiss behavior.
- Read the [CSS anchor positioning guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) for placement concepts and fallback strategies.
- See [all JB Design System components](https://javadbat.github.io/design-system/).
- Use the [contribution guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) when contributing to this component.

## AI agent notes

- Import `jb-tooltip` once before rendering either custom element.
- Put the trigger in the default slot; do not add `slot="trigger"`.
- The first element in the default slot is the trigger and positioning anchor.
- Use `content="..."` for simple text.
- Use an element with `slot="content"` for rich content.
- Use `jb-tooltip-message` only when the standard message presentation, sizes, or tail are needed.
- Put `size` on `jb-tooltip-message`, not on `jb-tooltip`.
- Put `tail` on `jb-tooltip` to enable the active standard message tail. Fully custom content must implement its own tail.
- Use native CSS values for `position-area` and `position-try-fallbacks`; do not calculate coordinates in application code.
- Read the `open` property or listen for `toggle` instead of inspecting private shadow DOM.
- Prefer CSS variables and public parts; do not target private class names.
- The `message` and `tail` parts exported by `jb-tooltip` style only the internal message used by the `content` attribute.
- This package includes [`web-component/custom-elements.json`](./web-component/custom-elements.json) and references it through the package.json `customElements` field.
- In the manifest, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps tag names to their component classes.
