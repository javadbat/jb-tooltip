import type { JBTooltipMessageWebComponent, JBTooltipWebComponent, SizeVariants } from "@jbui/tooltip";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "jb-tooltip": JBTooltipType;
      "jb-tooltip-message": JBTooltipMessageType;
    }

    interface JBTooltipType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTooltipWebComponent>, JBTooltipWebComponent> {
      content?: string;
      "position-area"?: string;
      "position-try-fallbacks"?: string;
      tail?: boolean;
    }

    interface JBTooltipMessageType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTooltipMessageWebComponent>, JBTooltipMessageWebComponent> {
      size?: SizeVariants;
      tail?: boolean;
    }
  }
}
