import "./styles.css";
import "../../../docs/styles/ant-design.css";
import "../../../docs/styles/aurora.css";
import "../../../docs/styles/bootstrap.css";
import "../../../docs/styles/candy.css";
import "../../../docs/styles/carbon.css";
import "../../../docs/styles/cupertino.css";
import "../../../docs/styles/fluent.css";
import "../../../docs/styles/forest.css";
import "../../../docs/styles/material.css";
import "../../../docs/styles/porcelain.css";
import "../../../docs/styles/sunset.css";
import "../../../docs/styles/terminal.css";
import "./styles/style-ant-design.css";
import "./styles/style-aurora.css";
import "./styles/style-bootstrap.css";
import "./styles/style-candy.css";
import "./styles/style-carbon.css";
import "./styles/style-cupertino.css";
import "./styles/style-fluent.css";
import "./styles/style-forest.css";
import "./styles/style-material.css";
import "./styles/style-porcelain.css";
import "./styles/style-sunset.css";
import "./styles/style-terminal.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@jbui/tooltip";
import type { JBTooltipWebComponent } from "@jbui/tooltip";
import { createElement, type HTMLAttributes } from "react";
import { expect, waitFor } from "storybook/test";

type TooltipAttributes = HTMLAttributes<HTMLElement> & {
  content: string;
  "position-area": string;
  tail: "true";
};

type TooltipStyleSampleProps = {
  name: string;
  themeClassName: string;
};

const styleSamples: TooltipStyleSampleProps[] = [
  { name: "Carbon", themeClassName: "carbon-style" },
  { name: "Aurora", themeClassName: "aurora-style" },
  { name: "Forest", themeClassName: "forest-style" },
  { name: "Sunset", themeClassName: "sunset-style" },
  { name: "Porcelain", themeClassName: "porcelain-style" },
  { name: "Candy", themeClassName: "candy-style" },
  { name: "Terminal", themeClassName: "terminal-style" },
  { name: "Material", themeClassName: "material-style" },
  { name: "Fluent", themeClassName: "fluent-style" },
  { name: "Bootstrap", themeClassName: "bootstrap-style" },
  { name: "Cupertino", themeClassName: "cupertino-style" },
  { name: "Ant Design", themeClassName: "ant-design-style" },
];

function TooltipStyleSample({ name, themeClassName }: TooltipStyleSampleProps) {
  const attributes: TooltipAttributes = {
    className: themeClassName,
    content: `${name} tooltip styling`,
    "position-area": "top",
    tail: "true",
  };

  return (
    <div className={`${themeClassName} tooltip-style-sample`}>
      {createElement(
        "jb-tooltip",
        attributes,
        <button className="tooltip-style-trigger" type="button">
          Hover or focus
        </button>,
      )}
    </div>
  );
}

async function openStyleTooltip({ canvasElement }: { canvasElement: HTMLElement }) {
  const tooltip = canvasElement.querySelector<JBTooltipWebComponent>("jb-tooltip");
  const trigger = tooltip?.querySelector<HTMLButtonElement>("button");
  const message = tooltip?.shadowRoot?.querySelector<HTMLElement>(".default-message")?.shadowRoot?.querySelector<HTMLElement>("[part='message']");

  expect(tooltip).toBeTruthy();
  expect(trigger).toBeTruthy();
  expect(message).toBeTruthy();

  trigger!.focus();
  await waitFor(() => expect(tooltip!.open).toBe(true));
  await waitFor(() => expect(tooltip!.shadowRoot?.querySelector<HTMLElement>(".tooltip")?.dataset.placement).toBe("top"));
  expect(getComputedStyle(message!).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
}

const meta = {
  title: "Components/JBTooltip/Style",
  component: TooltipStyleSample,
  parameters: {
    layout: "centered",
  },
  args: styleSamples[0],
} satisfies Meta<typeof TooltipStyleSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <div className="tooltip-style-gallery">
      {styleSamples.map(sample => (
        <section className={`${sample.themeClassName} tooltip-style-card`} key={sample.themeClassName}>
          <strong className="tooltip-style-name">{sample.name}</strong>
          <TooltipStyleSample {...sample} />
        </section>
      ))}
    </div>
  ),
};

export const Default: Story = {
  args: { name: "Default", themeClassName: "default-tooltip-style" },
  play: openStyleTooltip,
};

export const Carbon: Story = { args: styleSamples[0], play: openStyleTooltip };
export const Aurora: Story = { args: styleSamples[1], play: openStyleTooltip };
export const Forest: Story = { args: styleSamples[2], play: openStyleTooltip };
export const Sunset: Story = { args: styleSamples[3], play: openStyleTooltip };
export const Porcelain: Story = { args: styleSamples[4], play: openStyleTooltip };
export const Candy: Story = { args: styleSamples[5], play: openStyleTooltip };
export const Terminal: Story = { args: styleSamples[6], play: openStyleTooltip };
export const Material: Story = { args: styleSamples[7], play: openStyleTooltip };
export const Fluent: Story = { args: styleSamples[8], play: openStyleTooltip };
export const Bootstrap: Story = { args: styleSamples[9], play: openStyleTooltip };
export const Cupertino: Story = { args: styleSamples[10], play: openStyleTooltip };
export const AntDesign: Story = { name: "Ant Design", args: styleSamples[11], play: openStyleTooltip };
