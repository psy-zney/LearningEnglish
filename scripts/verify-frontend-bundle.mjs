import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const pageTraces = [
  ["/", ".next/server/app/page.js.nft.json"],
  ["/learn", ".next/server/app/learn/page.js.nft.json"],
  ["/review", ".next/server/app/review/page.js.nft.json"],
  ["/library", ".next/server/app/library/page.js.nft.json"],
  ["/practice", ".next/server/app/practice/page.js.nft.json"],
  ["/progress", ".next/server/app/progress/page.js.nft.json"],
];

const forbidden = /(?:^|[\\/])(?:@prisma|\.prisma|@libsql)(?:[\\/]|$)|dev\.db$/i;
const violations = [];

for (const [route, relativeTrace] of pageTraces) {
  const tracePath = resolve(relativeTrace);
  if (!existsSync(tracePath)) {
    violations.push(`${route}: missing build trace ${relativeTrace}`);
    continue;
  }

  const trace = JSON.parse(readFileSync(tracePath, "utf8"));
  const matches = (trace.files ?? []).filter((file) => forbidden.test(String(file)));
  if (matches.length > 0) {
    violations.push(`${route}: ${matches.slice(0, 8).join(", ")}${matches.length > 8 ? ` (+${matches.length - 8} more)` : ""}`);
  }
}

if (violations.length > 0) {
  console.error("Frontend page bundles still contain local backend dependencies:");
  console.error(violations.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Verified frontend page bundles contain no Prisma, libSQL, or dev.db dependencies.");
