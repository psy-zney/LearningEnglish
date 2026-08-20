# TOEIC 650 Study Cabin

A local-first, single-learner TOEIC Listening & Reading study system. The core loop is deterministic and works without Ollama:

`Today → Learn patterns → Review due items → TOEIC Part 5 → Progress`

The product treats phrases, verb patterns, and tense decisions as learning units. AI remains optional enrichment for the legacy vocabulary tools; it never determines TOEIC answers or review scheduling.

## Requirements

- Node.js 20.9 or newer
- npm
- SQLite (used through Prisma/libSQL; no separate SQLite CLI required)
- Optional: Ollama with `qwen2.5:3b` for legacy vocabulary enrichment

## Local setup

```powershell
Copy-Item .env.example .env
npm ci
$env:DATABASE_URL = 'file:dev.db'
npx prisma db push
npm run data:seed
npm run dev
```

Open <http://localhost:1002>.

The recommended mode is local-only and single-user. Learning, review, Part 5 grading, and progress do not require login or Ollama. `/login` remains only for editing legacy vocabulary records.

## Production split

The production deployment uses one codebase with two runtime roles:

- `https://study.zney295.id.vn` runs on Vercel in `frontend` mode. Pages call the backend over HTTP and Vercel does not serve `/api`.
- `https://learning.zney295.id.vn` points through Cloudflare Tunnel to the Windows host in `backend` mode. Prisma, SQLite, Ollama, SRS, attempts, and progress stay on that host.

Vercel Production and Preview variable:

```text
NEXT_PUBLIC_API_URL=https://learning.zney295.id.vn
```

Do not set `APP_DEPLOYMENT_MODE=backend` on Vercel. When the variable is omitted,
the proxy fails closed and Vercel returns `404` for `/api/*`.

Windows backend variables:

```text
APP_DEPLOYMENT_MODE=backend
NEXT_PUBLIC_API_URL=http://127.0.0.1:1002
DATABASE_URL=file:dev.db
ALLOWED_ORIGINS=https://study.zney295.id.vn,http://localhost:1002,http://localhost:3000
OLLAMA_MODEL=qwen3.5:4b
OLLAMA_BASE_URL=http://127.0.0.1:11434
```

`NEXT_PUBLIC_API_URL` must not end with `/`. Never expose `DATABASE_URL`, admin credentials, tokens, or the Ollama URL through a `NEXT_PUBLIC_*` variable.

## Data commands

```powershell
npm run data:validate
npm run data:seed
```

The canonical starter pack is [src/data/toeic650-source-data.ts](src/data/toeic650-source-data.ts): 40 core verbs, 12 tense families, and 51 workplace phrases. The first-sprint Part 5 pack contains 30 original deterministic questions with option rationales.

Seeding is idempotent:

- source items are upserted by stable `sourceKey`;
- a source update never overwrites `ReviewState` or `Attempt`;
- removed pack items are archived, not deleted;
- old `Word` records are imported as `legacy_word` content with their SRS state preserved.

## Quality checks

```powershell
npm run data:validate
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:coverage
npm run verify:frontend-boundary
```

For a frontend-boundary production build in PowerShell:

```powershell
$env:APP_DEPLOYMENT_MODE = 'frontend'
$env:NEXT_PUBLIC_API_URL = 'https://learning.zney295.id.vn'
npm run build
npm run verify:frontend-boundary
```

## Backup and restore

Stop the dev server before copying the database.

```powershell
New-Item -ItemType Directory -Path backups -Force
Copy-Item dev.db backups/dev-$(Get-Date -Format yyyyMMdd-HHmmss).db
```

To restore, stop the app, copy the chosen backup to a temporary filename, verify its size, and only then replace `dev.db`. Backups and the runtime database are ignored by Git; the currently tracked historical `dev.db` should be untracked in a dedicated repository-maintenance commit after confirming the backup.

## Optional Ollama

```powershell
ollama pull qwen2.5:3b
ollama serve
```

If Ollama is offline, only legacy AI enrichment reports an error. Today, Learn, Review, deterministic practice, and Progress continue to work.

## Product limits

- The 103-item starter core is not a complete TOEIC 650 syllabus.
- The app does not estimate a TOEIC score from flashcards or a short Part 5 drill.
- Listening Parts 2–4, Part 6/7 passages, diagnostics, and fixed-blueprint mock tests remain later phases.
