# jb-tooltip React wrapper

React components for the `jb-tooltip` web component. See the [basic React demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text).

## Installation

```sh
npm install @jbui/tooltip
```

```tsx
import { JBTooltip, JBTooltipMessage } from "@jbui/tooltip/react";
```

## Basic usage

```tsx
<JBTooltip content="Save the current draft" positionArea="top" tail>
  <button type="button">Save</button>
</JBTooltip>
```

The first child is the trigger and should be focusable. Use `content` for plain text. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text)

## Rich content

```tsx
<JBTooltip positionArea="bottom">
  <button type="button">Details</button>
  <JBTooltipMessage slot="content" size="lg">
    <strong>More information</strong>
  </JBTooltipMessage>
</JBTooltip>
```

Use any element with `slot="content"` for a fully custom tooltip surface. [Rich demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--rich-content) Â· [Custom demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--custom-content)

## When to use

Use `JBTooltip` for concise, non-interactive clarification. Prefer a popover, menu, or dialog when the content contains controls or essential instructions. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text)

## Placement and message sizes

Use `positionArea` and `positionTryFallbacks` for native placement and overflow handling. Use `tail` for the standard pointer and `JBTooltipMessage` for size variants. [Positions demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions) Â· [Fallback demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions) Â· [Sizes demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes)

## Events and imperative API

```tsx
import { useRef } from "react";
import type { JBTooltipWebComponent } from "@jbui/tooltip";
import { JBTooltip } from "@jbui/tooltip/react";

const tooltipRef = useRef<JBTooltipWebComponent>(null);

<JBTooltip
  ref={tooltipRef}
  content="Controlled tooltip"
  onToggle={event => console.log(event.newState)}
>
  <button type="button" onClick={() => tooltipRef.current?.toggle()}>
    Toggle
  </button>
</JBTooltip>;
```

The forwarded ref exposes `open()`, `close()`, `toggle()`, and the read-only `open` property. `onBeforeToggle` and `onToggle` expose the native popover lifecycle. [Imperative demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--imperative-api) Â· [Lifecycle demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--event-lifecycle)

## Props

| prop | type | description |
| --- | --- | --- |
| `content` | `string` | Plain-text tooltip content. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text) |
| `positionArea` | `string` | Native CSS `position-area` value. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--positions) |
| `positionTryFallbacks` | `string` | Native CSS `position-try-fallbacks` value. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--fallback-positions) |
| `tail` | `boolean` | Shows the standard message tail. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--with-tail) |
| `onBeforeToggle` | `(event) => void` | Runs before the popover changes state. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--event-lifecycle) |
| `onToggle` | `(event) => void` | Runs after the popover changes state. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--event-lifecycle) |

`JBTooltipMessage` accepts `size` (`xs`, `sm`, `md`, `lg`, or `xl`) and `tail`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-message--sizes)

## Accessibility

Use a focusable first child as the trigger. The underlying web component exposes tooltip semantics and preserves authored descriptions. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip--basic-text)

For slots, methods, accessibility, browser requirements, CSS parts, and variables, see the [web-component README](../README.md). The React wrapper shares the same [style gallery](https://javadbat.github.io/design-system/?path=/story/components-jbtooltip-style--gallery).
