const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "src", "generated", "prisma");
const destination = path.join(__dirname, "..", "dist", "generated", "prisma");

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(path.dirname(destination), { recursive: true });

fs.cpSync(source, destination, { recursive: true });

console.log("Prisma generated client copied to dist/generated/prisma");