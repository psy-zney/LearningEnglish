export const ALLOWED_IMPORT_LICENSES = [
  "CC0 1.0",
  "CC BY 2.0",
  "CC BY 2.0 FR",
  "CC BY 3.0",
  "CC BY 4.0",
  "Princeton WordNet License",
] as const;

export type AllowedImportLicense = (typeof ALLOWED_IMPORT_LICENSES)[number];

export type ImportManifestIssueCode =
  | "INVALID_MANIFEST"
  | "REQUIRED"
  | "INVALID_URL"
  | "INVALID_ID"
  | "UNSUPPORTED_LICENSE"
  | "RIGHTS_NOT_CONFIRMED"
  | "TARGET_NOT_FOUND"
  | "DUPLICATE_ITEM_ID"
  | "DUPLICATE_SOURCE"
  | "DUPLICATE_TEXT";

export interface ImportManifestIssue {
  code: ImportManifestIssueCode;
  path: string;
  message: string;
}

export interface ImportItemSource {
  externalId: string;
  sourceUrl: string;
  license: AllowedImportLicense;
  licenseUrl: string;
  attribution: string;
}

export interface ImportManifestItem {
  id: string;
  text: string;
  translation: string;
  target: string;
  source: ImportItemSource;
}

export interface ImportManifest {
  datasetId: string;
  version: string;
  sourceUrl: string;
  license: AllowedImportLicense;
  licenseUrl: string;
  attribution: string;
  rightsConfirmed: true;
  items: ImportManifestItem[];
}

export class ImportManifestValidationError extends Error {
  readonly issues: ImportManifestIssue[];

  constructor(issues: ImportManifestIssue[]) {
    super(`Import manifest is invalid (${issues.length} issue${issues.length === 1 ? "" : "s"}).`);
    this.name = "ImportManifestValidationError";
    this.issues = issues;
  }
}

const allowedLicenseSet = new Set<string>(ALLOWED_IMPORT_LICENSES);
const stableIdPattern = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function addIssue(
  issues: ImportManifestIssue[],
  code: ImportManifestIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function readRequiredString(
  record: Record<string, unknown>,
  field: string,
  path: string,
  issues: ImportManifestIssue[],
): string {
  const value = record[field];
  if (typeof value !== "string" || value.trim().length === 0) {
    addIssue(issues, "REQUIRED", path, `${path} must be a non-empty string.`);
    return "";
  }

  return value.trim();
}

function readStableId(
  record: Record<string, unknown>,
  field: string,
  path: string,
  issues: ImportManifestIssue[],
): string {
  const value = readRequiredString(record, field, path, issues);
  if (value && !stableIdPattern.test(value)) {
    addIssue(
      issues,
      "INVALID_ID",
      path,
      `${path} must contain only letters, numbers, dots, underscores, or hyphens.`,
    );
  }
  return value;
}

function readHttpsUrl(
  record: Record<string, unknown>,
  field: string,
  path: string,
  issues: ImportManifestIssue[],
): string {
  const value = readRequiredString(record, field, path, issues);
  if (!value) return value;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !url.hostname) throw new Error("HTTPS is required");
  } catch {
    addIssue(issues, "INVALID_URL", path, `${path} must be an absolute HTTPS URL.`);
  }

  return value;
}

function readLicense(
  record: Record<string, unknown>,
  field: string,
  path: string,
  issues: ImportManifestIssue[],
): AllowedImportLicense {
  const value = readRequiredString(record, field, path, issues);
  if (value && !allowedLicenseSet.has(value)) {
    addIssue(
      issues,
      "UNSUPPORTED_LICENSE",
      path,
      `${path} must use an explicitly allowlisted license.`,
    );
  }

  return value as AllowedImportLicense;
}

function normalizeForDuplicateCheck(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

function parseItem(
  value: unknown,
  index: number,
  issues: ImportManifestIssue[],
): ImportManifestItem | null {
  const basePath = `items[${index}]`;
  if (!isRecord(value)) {
    addIssue(issues, "REQUIRED", basePath, `${basePath} must be an object.`);
    return null;
  }

  const id = readStableId(value, "id", `${basePath}.id`, issues);
  const text = readRequiredString(value, "text", `${basePath}.text`, issues);
  const translation = readRequiredString(value, "translation", `${basePath}.translation`, issues);
  const target = readRequiredString(value, "target", `${basePath}.target`, issues);

  const sourceValue = value.source;
  if (!isRecord(sourceValue)) {
    addIssue(issues, "REQUIRED", `${basePath}.source`, `${basePath}.source must be an object.`);
    return null;
  }

  const source: ImportItemSource = {
    externalId: readRequiredString(
      sourceValue,
      "externalId",
      `${basePath}.source.externalId`,
      issues,
    ),
    sourceUrl: readHttpsUrl(sourceValue, "sourceUrl", `${basePath}.source.sourceUrl`, issues),
    license: readLicense(sourceValue, "license", `${basePath}.source.license`, issues),
    licenseUrl: readHttpsUrl(sourceValue, "licenseUrl", `${basePath}.source.licenseUrl`, issues),
    attribution: readRequiredString(
      sourceValue,
      "attribution",
      `${basePath}.source.attribution`,
      issues,
    ),
  };

  if (text && target && !normalizeForDuplicateCheck(text).includes(normalizeForDuplicateCheck(target))) {
    addIssue(
      issues,
      "TARGET_NOT_FOUND",
      `${basePath}.target`,
      `${basePath}.target must occur in the English source text.`,
    );
  }

  return { id, text, translation, target, source };
}

function addDuplicateIssues(items: ImportManifestItem[], issues: ImportManifestIssue[]): void {
  const itemIds = new Set<string>();
  const sourceRecords = new Set<string>();
  const texts = new Set<string>();

  for (const [index, item] of items.entries()) {
    const normalizedId = item.id.toLocaleLowerCase("en-US");
    if (itemIds.has(normalizedId)) {
      addIssue(
        issues,
        "DUPLICATE_ITEM_ID",
        `items[${index}].id`,
        `Item ID ${item.id} is duplicated in this manifest.`,
      );
    }
    itemIds.add(normalizedId);

    const sourceKey = `${item.source.sourceUrl.toLocaleLowerCase("en-US")}#${item.source.externalId.toLocaleLowerCase("en-US")}`;
    if (sourceRecords.has(sourceKey)) {
      addIssue(
        issues,
        "DUPLICATE_SOURCE",
        `items[${index}].source.externalId`,
        "The same source record appears more than once in this manifest.",
      );
    }
    sourceRecords.add(sourceKey);

    const normalizedText = normalizeForDuplicateCheck(item.text);
    if (texts.has(normalizedText)) {
      addIssue(
        issues,
        "DUPLICATE_TEXT",
        `items[${index}].text`,
        "The same normalized English text appears more than once in this manifest.",
      );
    }
    texts.add(normalizedText);
  }
}

export function validateImportManifest(input: unknown): ImportManifest {
  const issues: ImportManifestIssue[] = [];
  if (!isRecord(input)) {
    throw new ImportManifestValidationError([{
      code: "INVALID_MANIFEST",
      path: "manifest",
      message: "The import manifest must be a JSON object.",
    }]);
  }

  const datasetId = readStableId(input, "datasetId", "datasetId", issues);
  const version = readRequiredString(input, "version", "version", issues);
  const sourceUrl = readHttpsUrl(input, "sourceUrl", "sourceUrl", issues);
  const license = readLicense(input, "license", "license", issues);
  const licenseUrl = readHttpsUrl(input, "licenseUrl", "licenseUrl", issues);
  const attribution = readRequiredString(input, "attribution", "attribution", issues);

  if (input.rightsConfirmed !== true) {
    addIssue(
      issues,
      "RIGHTS_NOT_CONFIRMED",
      "rightsConfirmed",
      "rightsConfirmed must be the boolean value true.",
    );
  }

  const items: ImportManifestItem[] = [];
  if (!Array.isArray(input.items) || input.items.length === 0) {
    addIssue(issues, "REQUIRED", "items", "items must contain at least one import item.");
  } else {
    for (const [index, value] of input.items.entries()) {
      const item = parseItem(value, index, issues);
      if (item) items.push(item);
    }
    addDuplicateIssues(items, issues);
  }

  if (issues.length > 0) throw new ImportManifestValidationError(issues);

  return {
    datasetId,
    version,
    sourceUrl,
    license,
    licenseUrl,
    attribution,
    rightsConfirmed: true,
    items,
  };
}
