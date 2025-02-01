import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-tooltip",
    path: "./lib/jb-tooltip.ts",
    outputPath: "./dist/jb-tooltip.js",
    umdName: "JBTooltip",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [];