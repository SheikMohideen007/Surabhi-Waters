#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const name = process.argv[2];
if (!name) {
  process.exit(1);
}

const binDir = path.join(__dirname, "..", "node_modules", ".bin");
const candidates =
  process.platform === "win32"
    ? [path.join(binDir, `${name}.cmd`), path.join(binDir, name)]
    : [path.join(binDir, name)];

for (const candidate of candidates) {
  if (fs.existsSync(candidate)) {
    process.stdout.write(`${candidate}\n`);
    process.exit(0);
  }
}

process.exit(1);
