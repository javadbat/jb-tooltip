import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-tooltip",
    path: "./web-component/lib/jb-tooltip.ts",
    outputPath: "./web-component/dist/jb-tooltip.js",
    tsConfigPath: "./web-component/tsconfig.json",
    umdName: "JBTooltip",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [];
