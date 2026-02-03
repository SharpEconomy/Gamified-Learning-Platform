import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const standaloneServer = path.join(projectRoot, ".next", "standalone", "server.js");

const baseEnv = Object.fromEntries(
  Object.entries(process.env).filter(([, value]) => typeof value === "string"),
);

const run = (cmd, args, extraEnv = {}) => {
  try {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      env: { ...baseEnv, NODE_ENV: "production", ...extraEnv },
      windowsHide: true,
    });
    return { child, error: null };
  } catch (error) {
    return { child: null, error };
  }
};

if (existsSync(standaloneServer)) {
  const bunCmd = process.env.BUN || (process.platform === "win32" ? "bun.exe" : "bun");
  const nodeCmd = process.platform === "win32" ? "node.exe" : "node";

  const { child } = run(bunCmd, [standaloneServer]);
  if (!child) {
    run(nodeCmd, [standaloneServer]);
  } else {
    child.on("error", () => {
      run(nodeCmd, [standaloneServer]);
    });
  }
} else {
  const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
  const { child, error } = run(process.execPath, [nextCli, "start"]);
  if (error) {
    throw error;
  }
  child.on("exit", (code) => {
    process.exit(code ?? 1);
  });
}
