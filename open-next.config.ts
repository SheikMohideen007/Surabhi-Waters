import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

export default {
  ...config,
  // Must call Next directly. `opennextjs-cloudflare build` otherwise runs
  // `npm run build`, which would recurse if that script is the OpenNext build.
  buildCommand: "npx next build",
};
