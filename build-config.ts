import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-tooltip",
    path: "./web-component/lib/jb-tooltip.ts",
    outputPath: "./web-component/dist/jb-tooltip.js",
    tsConfigPath: "./web-component/tsconfig.json",
    external: ["jb-core", "jb-core/theme"],
    globals: {
      "jb-core": "JBCore",
      "jb-core/theme": "JBCoreTheme",
    },
    umdName: "JBTooltip",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-tooltip-react",
    path: "./react/lib/JBTooltip.tsx",
    outputPath: "./react/dist/JBTooltip.js",
    external: ["react", "@jbui/tooltip", "jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "@jbui/tooltip": "JBTooltip",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
    },
    umdName: "JBTooltipReact",
    dir: "./react",
  },
];
