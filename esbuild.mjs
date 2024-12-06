import { build } from "esbuild";

(async () => {
  await build({
    entryPoints: ["./src/server/index.ts"],
    outfile: "./dist/server.js",
    bundle: true,
    minify: true,
    platform: "node",
    target: "esnext",
    logLevel: "info",
    plugins: [],
  });
})();
