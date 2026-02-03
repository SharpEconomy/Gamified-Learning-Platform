import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  console.log("Standalone output not found. Skipping postbuild copy.");
  process.exit(0);
}

const standaloneNextDir = path.join(standaloneDir, ".next");
const nextStaticDir = path.join(projectRoot, ".next", "static");
const publicDir = path.join(projectRoot, "public");

await fs.mkdir(standaloneNextDir, { recursive: true });

if (existsSync(nextStaticDir)) {
  await fs.cp(nextStaticDir, path.join(standaloneNextDir, "static"), {
    recursive: true,
    force: true,
  });
}

if (existsSync(publicDir)) {
  await fs.cp(publicDir, path.join(standaloneDir, "public"), {
    recursive: true,
    force: true,
  });
}
