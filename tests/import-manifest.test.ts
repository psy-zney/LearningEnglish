import assert from "node:assert/strict";
import test from "node:test";

import {
  ImportManifestValidationError,
  validateImportManifest,
} from "../src/lib/import-manifest.ts";

const validManifest = {
  datasetId: "learning-english-tatoeba-v1",
  version: "2026-08-21",
  sourceUrl: "https://tatoeba.org/eng/downloads",
  license: "CC BY 2.0 FR",
  licenseUrl: "https://creativecommons.org/licenses/by/2.0/fr/",
  attribution: "Tatoeba contributors",
  rightsConfirmed: true,
  items: [
    {
      id: "tatoeba-eng-1234",
      text: "The committee approved the revised schedule.",
      translation: "Ủy ban đã phê duyệt lịch trình sửa đổi.",
      target: "approved",
      source: {
        externalId: "1234",
        sourceUrl: "https://tatoeba.org/en/sentences/show/1234",
        license: "CC BY 2.0 FR",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/fr/",
        attribution: "ExampleUser via Tatoeba",
      },
    },
  ],
};

function cloneManifest(): Record<string, unknown> {
  return structuredClone(validManifest);
}

function assertInvalid(
  input: unknown,
  expectedCode: string,
  expectedPath?: string,
): void {
  assert.throws(
    () => validateImportManifest(input),
    (error: unknown) => error instanceof ImportManifestValidationError
      && error.issues.some((issue) => issue.code === expectedCode
        && (expectedPath === undefined || issue.path === expectedPath)),
  );
}

test("accepts a complete manifest and trims user-provided strings", () => {
  const input = cloneManifest();
  input.datasetId = "  learning-english-tatoeba-v1  ";
  const firstItem = (input.items as Array<Record<string, unknown>>)[0];
  firstItem.text = "  The committee approved the revised schedule.  ";

  const result = validateImportManifest(input);

  assert.equal(result.datasetId, "learning-english-tatoeba-v1");
  assert.equal(result.items[0].text, "The committee approved the revised schedule.");
  assert.equal(result.items[0].source.externalId, "1234");
});

test("requires complete dataset rights metadata", () => {
  for (const field of [
    "datasetId",
    "version",
    "sourceUrl",
    "license",
    "licenseUrl",
    "attribution",
  ]) {
    const input = cloneManifest();
    delete input[field];
    assertInvalid(input, "REQUIRED", field);
  }

  const unconfirmed = cloneManifest();
  unconfirmed.rightsConfirmed = false;
  assertInvalid(unconfirmed, "RIGHTS_NOT_CONFIRMED", "rightsConfirmed");

  const ambiguous = cloneManifest();
  ambiguous.rightsConfirmed = "yes";
  assertInvalid(ambiguous, "RIGHTS_NOT_CONFIRMED", "rightsConfirmed");
});

test("only permits HTTPS source and license URLs", () => {
  for (const [field, value] of [
    ["sourceUrl", "http://example.com/data"],
    ["licenseUrl", "javascript:alert(1)"],
  ] as const) {
    const input = cloneManifest();
    input[field] = value;
    assertInvalid(input, "INVALID_URL", field);
  }

  const input = cloneManifest();
  const firstItem = (input.items as Array<Record<string, unknown>>)[0];
  (firstItem.source as Record<string, unknown>).sourceUrl = "file:///tmp/corpus.json";
  assertInvalid(input, "INVALID_URL", "items[0].source.sourceUrl");
});

test("allows only explicit CC0, CC BY, or Princeton WordNet licenses", () => {
  for (const license of [
    "CC0 1.0",
    "CC BY 2.0",
    "CC BY 2.0 FR",
    "CC BY 3.0",
    "CC BY 4.0",
    "Princeton WordNet License",
  ]) {
    const input = cloneManifest();
    input.license = license;
    const firstItem = (input.items as Array<Record<string, unknown>>)[0];
    (firstItem.source as Record<string, unknown>).license = license;
    assert.equal(validateImportManifest(input).license, license);
  }

  for (const license of ["open", "public domain", "CC BY-NC 4.0", "unknown"] ) {
    const input = cloneManifest();
    input.license = license;
    assertInvalid(input, "UNSUPPORTED_LICENSE", "license");
  }
});

test("requires stable item content and complete per-item source metadata", () => {
  const requiredItemFields = ["id", "text", "translation", "target"];
  for (const field of requiredItemFields) {
    const input = cloneManifest();
    const firstItem = (input.items as Array<Record<string, unknown>>)[0];
    delete firstItem[field];
    assertInvalid(input, "REQUIRED", `items[0].${field}`);
  }

  for (const field of ["externalId", "sourceUrl", "license", "licenseUrl", "attribution"]) {
    const input = cloneManifest();
    const firstItem = (input.items as Array<Record<string, unknown>>)[0];
    delete (firstItem.source as Record<string, unknown>)[field];
    assertInvalid(input, "REQUIRED", `items[0].source.${field}`);
  }

  const unstableId = cloneManifest();
  (unstableId.items as Array<Record<string, unknown>>)[0].id = "Sentence 1234";
  assertInvalid(unstableId, "INVALID_ID", "items[0].id");

  const ambiguousNamespace = cloneManifest();
  ambiguousNamespace.datasetId = "dataset:part";
  assertInvalid(ambiguousNamespace, "INVALID_ID", "datasetId");
});

test("requires the target to occur in the English source text", () => {
  const input = cloneManifest();
  (input.items as Array<Record<string, unknown>>)[0].target = "postponed";
  assertInvalid(input, "TARGET_NOT_FOUND", "items[0].target");
});

test("rejects duplicate item IDs, source records, and normalized texts", () => {
  const duplicateId = cloneManifest();
  const first = (duplicateId.items as Array<Record<string, unknown>>)[0];
  (duplicateId.items as Array<Record<string, unknown>>).push({
    ...structuredClone(first),
    text: "The board approved the annual budget.",
  });
  assertInvalid(duplicateId, "DUPLICATE_ITEM_ID", "items[1].id");

  const duplicateSource = cloneManifest();
  const sourceItem = (duplicateSource.items as Array<Record<string, unknown>>)[0];
  (duplicateSource.items as Array<Record<string, unknown>>).push({
    ...structuredClone(sourceItem),
    id: "tatoeba-eng-5678",
    text: "The board approved the annual budget.",
  });
  assertInvalid(duplicateSource, "DUPLICATE_SOURCE", "items[1].source.externalId");

  const duplicateText = cloneManifest();
  const textItem = (duplicateText.items as Array<Record<string, unknown>>)[0];
  const second = structuredClone(textItem);
  second.id = "tatoeba-eng-5678";
  second.text = "  the committee APPROVED the revised schedule.  ";
  const secondSource = second.source as Record<string, unknown>;
  secondSource.externalId = "5678";
  secondSource.sourceUrl = "https://tatoeba.org/en/sentences/show/5678";
  (duplicateText.items as Array<Record<string, unknown>>).push(second);
  assertInvalid(duplicateText, "DUPLICATE_TEXT", "items[1].text");
});

test("rejects empty manifests and non-object input", () => {
  const empty = cloneManifest();
  empty.items = [];
  assertInvalid(empty, "REQUIRED", "items");

  assertInvalid(null, "INVALID_MANIFEST", "manifest");
  assertInvalid([], "INVALID_MANIFEST", "manifest");
});
