import { spawn } from "node:child_process";
import process from "node:process";

const env = { ...process.env, NEXT_STANDALONE: "true" };
const pnpmCmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const child = spawn(pnpmCmd, ["run", "build"], {
  stdio: "inherit",
  env,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
