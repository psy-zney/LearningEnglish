# Licensed learning-content imports

Copy `learning-content.template.json` when preparing vocabulary, meaning, translation, or fill-in-the-blank content for review. The template is deliberately invalid until every placeholder is replaced and `rightsConfirmed` is changed to `true` after a human rights review. The validator is intentionally offline: it checks the manifest you provide and never fetches a website at runtime.

## Required dataset fields

- `datasetId`: stable letters/numbers ID; dots, underscores, and hyphens are allowed.
- `version`: immutable source version or acquisition date.
- `sourceUrl`: absolute HTTPS page for the dataset or official download.
- `license` and `licenseUrl`: exact license name and its HTTPS legal text.
- `attribution`: attribution that must accompany reuse.
- `rightsConfirmed`: must be the JSON boolean `true`, never a string.
- `items`: at least one learning item.

Every item requires a stable `id`, English `text`, Vietnamese `translation`, a `target` occurring in the English text, and a `source` object. Item source metadata must include `externalId`, `sourceUrl`, `license`, `licenseUrl`, and `attribution` so attribution remains traceable after import.

## Accepted licenses

- `CC0 1.0`
- `CC BY 2.0`
- `CC BY 2.0 FR`
- `CC BY 3.0`
- `CC BY 4.0`
- `Princeton WordNet License`

The validator rejects vague labels such as `open` or `public domain`, licenses with non-commercial restrictions, missing rights confirmation, non-HTTPS sources, duplicate IDs, duplicate source records, and duplicate normalized English text.

Do not put ETS/TOEIC questions, film clips, or scraped commercial-dictionary content in this directory unless you have explicit written redistribution rights. Keep the original source URL, author attribution, and license on every imported item. A passing manifest validation confirms that metadata is complete; it does not replace a human review of ownership, language accuracy, or teaching quality.

## Dry-run and apply

Place the reviewed manifest inside `data/import/`, then run:

```powershell
npm.cmd run data:import -- data/import/my-dataset.json
npm.cmd run data:import -- data/import/my-dataset.json --apply
```

Dry-run is the default. `--apply` performs additive, idempotent upserts only. It never deletes, archives, resets, or migrates data. Each dataset version receives its own source key, so a new immutable acquisition does not overwrite an older import. Each target must match an approved verb or phrase, including a known verb form. Imported examples keep both dataset-level and item-level source/license metadata in `contentJson`.
