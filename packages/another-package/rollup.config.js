import typescript from "@rollup/plugin-typescript";
import path from "path";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: path.dirname(pkg.exports["."].import),
        format: "esm",
        entryFileNames: "[name].mjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: path.dirname(pkg.exports["."].require),
        format: "cjs",
        entryFileNames: "[name].cjs",
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    external: Object.keys({
      ...pkg.dependencies,
      ...pkg.peerDependencies,
    }),
  },
];
