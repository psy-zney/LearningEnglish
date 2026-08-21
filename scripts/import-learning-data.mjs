import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import {
  ImportManifestValidationError,
  validateImportManifest,
} from "../src/lib/import-manifest.ts";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const inputArg = args.find((arg) => !arg.startsWith("--"));
if (!inputArg) {
  console.error("Usage: npm run data:import -- data/import/<manifest>.json [--apply]");
  process.exit(1);
}

const importRoot = path.resolve(process.cwd(), "data", "import");
const inputPath = path.resolve(process.cwd(), inputArg);
if (inputPath !== importRoot && !inputPath.startsWith(`${importRoot}${path.sep}`)) {
  console.error("Import manifests must be inside data/import/.");
  process.exit(1);
}

let manifest;
try {
  manifest = validateImportManifest(JSON.parse(await readFile(inputPath, "utf8")));
} catch (error) {
  if (error instanceof ImportManifestValidationError) {
    for (const issue of error.issues) console.error(`${issue.path}: ${issue.message}`);
  } else {
    console.error(error instanceof Error ? error.message : error);
  }
  process.exit(1);
}

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

function normalize(value) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US");
}

function targetTerms(item) {
  let detail = {};
  try { detail = JSON.parse(item.contentJson); } catch {}
  const forms = detail && typeof detail.forms === "object" && detail.forms
    ? Object.values(detail.forms).filter((value) => typeof value === "string")
    : [];
  return [item.title, ...forms].map(normalize);
}

try {
  const core = await prisma.contentItem.findMany({
    where: { archivedAt: null, status: "approved", kind: { in: ["verb", "phrase"] } },
  });
  const coreByTarget = new Map();
  for (const item of core) {
    for (const term of targetTerms(item)) if (!coreByTarget.has(term)) coreByTarget.set(term, item);
  }

  const prepared = manifest.items.map((item) => {
    const focus = coreByTarget.get(normalize(item.target));
    if (!focus) throw new Error(`No approved core item matches target: ${item.target}`);
    const sourceKey = `import:${manifest.datasetId}:${encodeURIComponent(manifest.version)}:${item.id}`;
    return {
      where: { sourceKey },
      data: {
        sourceKey,
        kind: "imported_example",
        title: focus.title,
        meaningVi: focus.meaningVi,
        contentJson: JSON.stringify({
          example: { en: item.text, vi: item.translation, target: item.target },
          focusSourceKey: focus.sourceKey,
          provenance: {
            dataset: {
              id: manifest.datasetId,
              version: manifest.version,
              sourceUrl: manifest.sourceUrl,
              license: manifest.license,
              licenseUrl: manifest.licenseUrl,
              attribution: manifest.attribution,
              rightsConfirmed: manifest.rightsConfirmed,
            },
            license: item.source.license,
            licenseUrl: item.source.licenseUrl,
            attribution: item.source.attribution,
            externalId: item.source.externalId,
            sourceUrl: item.source.sourceUrl,
          },
        }),
        topic: focus.topic,
        toeicParts: focus.toeicParts,
        cefr: focus.cefr,
        priority: focus.priority,
        status: "approved",
        sourceVersion: `import:${manifest.datasetId}:${manifest.version}`,
        archivedAt: null,
      },
    };
  });

  console.log(JSON.stringify({
    mode: apply ? "apply" : "dry-run",
    datasetId: manifest.datasetId,
    version: manifest.version,
    items: prepared.length,
    targets: [...new Set(prepared.map((entry) => entry.data.title))],
  }, null, 2));

  if (apply) {
    for (const entry of prepared) {
      const update = { ...entry.data };
      delete update.sourceKey;
      await prisma.contentItem.upsert({ where: entry.where, create: entry.data, update });
    }
    console.log(`Applied ${prepared.length} licensed examples idempotently.`);
  } else {
    console.log("Dry-run only. Add --apply after reviewing the report and source rights.");
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
