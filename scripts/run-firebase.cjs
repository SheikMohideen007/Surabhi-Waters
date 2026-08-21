const { spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const binDir = path.join(root, "node_modules", ".bin");
process.env.PATH = [__dirname, binDir, process.env.PATH].join(path.delimiter);

const args = process.argv.slice(2);
const firebaseBin =
  process.platform === "win32"
    ? path.join(binDir, "firebase.cmd")
    : path.join(binDir, "firebase");

const result = spawnSync(firebaseBin, args, {
  stdio: "inherit",
  cwd: root,
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
