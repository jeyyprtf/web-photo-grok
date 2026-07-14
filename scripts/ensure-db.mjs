import { execSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
const envExample = path.join(root, ".env.example");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit", env: process.env });
}

if (!existsSync(envPath)) {
  if (!existsSync(envExample)) {
    console.error("Missing .env and .env.example");
    process.exit(1);
  }
  copyFileSync(envExample, envPath);
  console.log("Created .env from .env.example");
}

// Create / sync tables (idempotent, does not wipe data)
run("npx prisma db push");

// Seed only when empty (first run after clone)
try {
  const out = execSync(
    `npx tsx -e "import { PrismaClient } from '@prisma/client'; const p=new PrismaClient(); p.user.count().then(c=>{console.log(c); return p.\\$disconnect()}).catch(async e=>{console.error(e); await p.\\$disconnect(); process.exit(1)})"`,
    { cwd: root, encoding: "utf8", env: process.env },
  );
  const count = parseInt(String(out).trim().split("\n").pop() || "0", 10);
  if (!count) {
    console.log("Database is empty — seeding demo content…");
    run("npx tsx prisma/seed.ts");
  } else {
    console.log(`Database ready (${count} user(s)).`);
  }
} catch (e) {
  console.error(e);
  process.exit(1);
}
