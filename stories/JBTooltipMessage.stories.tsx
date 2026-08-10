import "./styles.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JBTooltipWebComponent, SizeVariants } from "@jbui/tooltip";
import { JBTooltip, JBTooltipMessage } from "@jbui/tooltip/react";
import { expect, waitFor } from "storybook/test";

type TooltipMessageSampleProps = {
  size: SizeVariants;
  tail: boolean;
};

const sizes: SizeVariants[] = ["xs", "sm", "md", "lg", "xl"];

function TooltipMessageSample({ size, tail }: TooltipMessageSampleProps) {
  return (
    <JBTooltip positionArea="top" tail={tail}>
      <button className="tooltip-trigger" type="button">
        {size.toUpperCase()} message
      </button>
      <JBTooltipMessage size={size} slot="content">
        {size.toUpperCase()} tooltip message
      </JBTooltipMessage>
    </JBTooltip>
  );
}

async function openMessage({ canvasElement }: { canvasElement: HTMLElement }) {
  const tooltip = canvasElement.querySelector<JBTooltipWebComponent>("jb-tooltip");
  const trigger = tooltip?.querySelector<HTMLButtonElement>("button");
  const message = tooltip?.querySelector<HTMLElement>("jb-tooltip-message");
  const tail = message?.shadowRoot?.querySelector<HTMLElement>(".tooltip-tail");

  expect(tooltip).toBeTruthy();
  expect(trigger).toBeTruthy();
  expect(message).toBeTruthy();

  trigger!.focus();
  await waitFor(() => expect(tooltip!.open).toBe(true));
  await waitFor(() => expect(message!.dataset.placement).toBe("top"));
  expect(getComputedStyle(tail!).display).toBe("block");
}

const meta = {
  title: "Components/JBTooltip/Message",
  component: TooltipMessageSample,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    tail: true,
  },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    tail: { control: "boolean" },
  },
} satisfies Meta<typeof TooltipMessageSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: args => (
    <div className="tooltip-message-size-gallery">
      {sizes.map(size => (
        <TooltipMessageSample key={size} size={size} tail={args.tail} />
      ))}
    </div>
  ),
};

export const ExtraSmall: Story = { args: { size: "xs" }, play: openMessage };
export const Small: Story = { args: { size: "sm" }, play: openMessage };
export const Medium: Story = { args: { size: "md" }, play: openMessage };
export const Large: Story = { args: { size: "lg" }, play: openMessage };
export const ExtraLarge: Story = { args: { size: "xl" }, play: openMessage };
