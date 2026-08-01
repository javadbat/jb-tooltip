import "./styles.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "jb-tooltip";
import type { JBTooltipWebComponent, SizeVariants } from "jb-tooltip";
import { createElement, type HTMLAttributes } from "react";
import { expect, waitFor } from "storybook/test";

type TooltipAttributes = HTMLAttributes<HTMLElement> & {
  "position-area": string;
  tail?: "true";
};

type MessageAttributes = HTMLAttributes<HTMLElement> & {
  size: SizeVariants;
};

type TooltipMessageSampleProps = {
  size: SizeVariants;
  tail: boolean;
};

const sizes: SizeVariants[] = ["xs", "sm", "md", "lg", "xl"];

function TooltipMessageSample({ size, tail }: TooltipMessageSampleProps) {
  const tooltipAttributes: TooltipAttributes = {
    "position-area": "top",
    tail: tail ? "true" : undefined,
  };
  const messageAttributes: MessageAttributes = {
    size,
    slot: "content",
  };

  return createElement(
    "jb-tooltip",
    tooltipAttributes,
    <button className="tooltip-trigger" type="button">
      {size.toUpperCase()} message
    </button>,
    createElement("jb-tooltip-message", messageAttributes, `${size.toUpperCase()} tooltip message`),
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
