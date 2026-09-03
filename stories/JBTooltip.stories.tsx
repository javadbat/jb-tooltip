import "./styles.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JBTooltipToggleEvent, JBTooltipWebComponent } from "@jbui/tooltip";
import { JBTooltip, JBTooltipMessage } from "@jbui/tooltip/react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

type PositionArea = "top" | "right" | "bottom" | "left";

type TooltipStoryArgs = {
  content: string;
  positionArea: PositionArea;
  positionTryFallbacks: string;
  tail: boolean;
  triggerLabel: string;
  onBeforeToggle?: (event: JBTooltipToggleEvent) => void;
  onToggle?: (event: JBTooltipToggleEvent) => void;
};

const positions: PositionArea[] = ["top", "right", "bottom", "left"];

function TooltipExample({ content, onBeforeToggle, onToggle, positionArea, positionTryFallbacks, tail, triggerLabel }: TooltipStoryArgs) {
  return (
    <JBTooltip content={content} onBeforeToggle={onBeforeToggle} onToggle={onToggle} positionArea={positionArea} positionTryFallbacks={positionTryFallbacks} tail={tail}>
      <button className="tooltip-trigger" type="button">
        {triggerLabel}
      </button>
    </JBTooltip>
  );
}

function getTooltip(canvasElement: HTMLElement, selector = "jb-tooltip") {
  const tooltip = canvasElement.querySelector<JBTooltipWebComponent>(selector);
  expect(tooltip).toBeTruthy();
  return tooltip!;
}

function getTrigger(tooltip: JBTooltipWebComponent) {
  const trigger = tooltip.querySelector<HTMLButtonElement>("button");
  expect(trigger).toBeTruthy();
  return trigger!;
}

function getSurface(tooltip: JBTooltipWebComponent) {
  const surface = tooltip.shadowRoot?.querySelector<HTMLElement>(".tooltip");
  expect(surface).toBeTruthy();
  return surface!;
}

async function expectOpen(tooltip: JBTooltipWebComponent) {
  await waitFor(() => {
    expect(tooltip.isOpen).toBe(true);
    expect(getSurface(tooltip).matches(":popover-open")).toBe(true);
  });
}

async function expectClosed(tooltip: JBTooltipWebComponent) {
  await waitFor(() => {
    expect(tooltip.isOpen).toBe(false);
    expect(getSurface(tooltip).matches(":popover-open")).toBe(false);
  });
}

async function expectPosition(tooltip: JBTooltipWebComponent, position: PositionArea) {
  const trigger = getTrigger(tooltip);
  trigger.focus();
  await expectOpen(tooltip);
  await waitFor(() => expect(getSurface(tooltip).dataset.placement).toBe(position));

  const triggerRect = trigger.getBoundingClientRect();
  const surfaceRect = getSurface(tooltip).getBoundingClientRect();

  if (position === "top") {
    expect(surfaceRect.bottom).toBeLessThanOrEqual(triggerRect.top);
  } else if (position === "right") {
    expect(surfaceRect.left).toBeGreaterThanOrEqual(triggerRect.right);
  } else if (position === "bottom") {
    expect(surfaceRect.top).toBeGreaterThanOrEqual(triggerRect.bottom);
  } else {
    expect(surfaceRect.right).toBeLessThanOrEqual(triggerRect.left);
  }

  tooltip.close();
  trigger.blur();
  await expectClosed(tooltip);
}

const meta = {
  title: "Components/JBTooltip",
  component: TooltipExample,
  parameters: {
    layout: "centered",
  },
  args: {
    content: "A concise explanation for this control.",
    positionArea: "top",
    positionTryFallbacks: "flip-block, flip-inline",
    tail: false,
    triggerLabel: "Focus or hover me",
  },
  argTypes: {
    content: { control: "text" },
    positionArea: {
      control: "select",
      options: positions,
    },
    positionTryFallbacks: { control: "text" },
    tail: { control: "boolean" },
    triggerLabel: { control: "text" },
  },
} satisfies Meta<typeof TooltipExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicText: Story = {
  play: async ({ canvasElement }) => {
    const tooltip = getTooltip(canvasElement);
    const trigger = getTrigger(tooltip);

    trigger.focus();
    await expectOpen(tooltip);
    expect(trigger).toHaveAttribute("aria-description", "A concise explanation for this control.");

    await userEvent.keyboard("{Escape}");
    await expectClosed(tooltip);
  },
};

export const HoverInteraction: Story = {
  args: {
    content: "The tooltip remains available to pointer users.",
    triggerLabel: "Hover me",
  },
  play: async ({ canvasElement }) => {
    const tooltip = getTooltip(canvasElement);
    const trigger = getTrigger(tooltip);

    await userEvent.hover(trigger);
    await expectOpen(tooltip);

    await userEvent.unhover(trigger);
    await expectClosed(tooltip);
  },
};

export const WithTail: Story = {
  args: {
    content: "The triangle follows the resolved placement.",
    tail: true,
    triggerLabel: "Tooltip with tail",
  },
  play: async ({ canvasElement }) => {
    const tooltip = getTooltip(canvasElement);
    const trigger = getTrigger(tooltip);
    const message = tooltip.shadowRoot?.querySelector<HTMLElement>(".default-message");
    const tail = message?.shadowRoot?.querySelector<HTMLElement>(".tooltip-tail");

    trigger.focus();
    await expectOpen(tooltip);
    await waitFor(() => expect(getSurface(tooltip).dataset.placement).toBe("top"));
    expect(message?.dataset.placement).toBe("top");
    expect(tail).toBeTruthy();
    expect(getComputedStyle(tail!).display).toBe("block");
  },
};

export const RichContent: Story = {
  render: () => (
    <JBTooltip>
      <button className="tooltip-trigger" type="button">
        Save
      </button>
      <JBTooltipMessage slot="content">
        <strong>Save changes</strong> <span className="rich-content-detail">Stores the current draft.</span>
      </JBTooltipMessage>
    </JBTooltip>
  ),
  play: async ({ canvasElement }) => {
    const tooltip = getTooltip(canvasElement);
    const trigger = getTrigger(tooltip);

    trigger.focus();
    await expectOpen(tooltip);
    expect(trigger).toHaveAttribute("aria-description", "Save changes Stores the current draft.");
    expect(tooltip.querySelector("jb-tooltip-message")).toBeTruthy();
  },
};

export const CustomContent: Story = {
  render: () => (
    <JBTooltip positionArea="bottom">
      <button className="tooltip-trigger" type="button">
        Build status
      </button>
      <div className="custom-tooltip-content" slot="content">
        <span className="custom-tooltip-dot" />
        All checks passed
      </div>
    </JBTooltip>
  ),
};

export const Positions: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="tooltip-position-gallery">
      {positions.map(position => (
        <div className="tooltip-position-example" key={position}>
          <span className="tooltip-position-label">{position}</span>
          <JBTooltip content={`Tooltip placed at the ${position}`} positionArea={position} positionTryFallbacks="none" tail>
            <button className="tooltip-trigger" type="button">
              {position}
            </button>
          </JBTooltip>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(CSS.supports("position-area", "top")).toBe(true);

    for (const position of positions) {
      const tooltip = getTooltip(canvasElement, `jb-tooltip[position-area="${position}"]`);
      await expectPosition(tooltip, position);
    }
  },
};

export const FallbackPositions: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="tooltip-fallback-stage">
      <div className="tooltip-fallback-case tooltip-fallback-block">
        <span>Requested top â†’ resolved bottom</span>
        <JBTooltip content="Flipped away from the top viewport edge" positionArea="top" tail>
          <button className="tooltip-trigger" type="button">
            Top edge
          </button>
        </JBTooltip>
      </div>
      <div className="tooltip-fallback-case tooltip-fallback-inline">
        <span>Requested left â†’ resolved right</span>
        <JBTooltip content="Flipped away from the left viewport edge" positionArea="left" tail>
          <button className="tooltip-trigger" type="button">
            Left edge
          </button>
        </JBTooltip>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(CSS.supports("position-try-fallbacks", "flip-block, flip-inline")).toBe(true);

    const blockFallback = getTooltip(canvasElement, 'jb-tooltip[position-area="top"]');
    await expectPosition(blockFallback, "bottom");
    expect(blockFallback.shadowRoot?.querySelector<HTMLElement>(".default-message")?.dataset.placement).toBe("bottom");

    const inlineFallback = getTooltip(canvasElement, 'jb-tooltip[position-area="left"]');
    await expectPosition(inlineFallback, "right");
    expect(inlineFallback.shadowRoot?.querySelector<HTMLElement>(".default-message")?.dataset.placement).toBe("right");
  },
};

export const ImperativeApi: Story = {
  args: {
    content: "Controlled with open(), close(), and toggle().",
    triggerLabel: "Imperative tooltip",
  },
  play: async ({ canvasElement }) => {
    const tooltip = getTooltip(canvasElement);

    tooltip.isOpen;
    await expectOpen(tooltip);

    tooltip.close();
    await expectClosed(tooltip);

    expect(tooltip.toggle()).toBe(true);
    await expectOpen(tooltip);
    expect(tooltip.toggle()).toBe(false);
    await expectClosed(tooltip);
  },
};

export const EventLifecycle: Story = {
  args: {
    content: "Lifecycle events are exposed by the tooltip.",
    onBeforeToggle: fn(),
    onToggle: fn(),
    triggerLabel: "Observe lifecycle",
  },
  play: async ({ args, canvasElement }) => {
    const tooltip = getTooltip(canvasElement);
    const trigger = getTrigger(tooltip);

    trigger.focus();
    await expectOpen(tooltip);
    await waitFor(() => {
      expect(args.onBeforeToggle).toHaveBeenCalledWith(expect.objectContaining({ newState: "open" }));
      expect(args.onToggle).toHaveBeenCalledWith(expect.objectContaining({ newState: "open" }));
    });

    await userEvent.keyboard("{Escape}");
    await expectClosed(tooltip);
    await waitFor(() => {
      expect(args.onBeforeToggle).toHaveBeenCalledWith(expect.objectContaining({ newState: "closed" }));
      expect(args.onToggle).toHaveBeenCalledWith(expect.objectContaining({ newState: "closed" }));
    });
  },
};
