import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { DatabaseSync, backup } from 'node:sqlite';
import { repairKnownLegacyWord, serializeLegacyWordContent } from '../src/lib/legacy-content.ts';
import { foundationExercises } from '../src/data/foundation-exercises.ts';
import { part5Exercises } from '../src/data/part5-exercises.ts';

const url = process.env.DATABASE_URL || 'file:dev.db';
if (!url.startsWith('file:')) throw new Error('This audited migration only supports a local SQLite database.');
const filename = path.resolve(url.slice(5));
if (!fs.existsSync(filename)) throw new Error('Database does not exist; refusing to create an empty replacement.');
const db = new DatabaseSync(filename);
db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
assert.equal(db.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
assert.equal(db.prepare('PRAGMA foreign_key_check').all().length, 0);
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
fs.mkdirSync('backups', { recursive: true });
const backupPath = path.resolve(`backups/content-audit-${stamp}.db`);
await backup(db, backupPath);
const saved = new DatabaseSync(backupPath, { readOnly: true });
assert.equal(saved.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
saved.close();
const protectedTables = ['Attempt', 'ReviewState', 'StudySession', 'DailyActivity'];
const snapshot = () => Object.fromEntries(protectedTables.map(t => [t, db.prepare(`SELECT * FROM ${t} ORDER BY id`).all()]));
const wordsState = () => db.prepare('SELECT id, word, meaning, createdAt, nextReviewDate, interval, repetition, easeFactor, tags FROM Word ORDER BY id').all();
const counts = () => Object.fromEntries(['Word','ContentItem','Exercise',...protectedTables].map(t=>[t, db.prepare(`SELECT count(*) n FROM ${t}`).get().n]));
const before = counts();
const changes = [];
db.exec('BEGIN IMMEDIATE');
try {
  const learnerState = snapshot(); const wordState = wordsState();
  for (const original of db.prepare('SELECT * FROM Word').all()) {
    const repaired = repairKnownLegacyWord(original);
    if (repaired === original) continue;
    db.prepare('UPDATE Word SET correctedWord=?, correctMeaning=?, explanation=? WHERE id=?')
      .run(repaired.correctedWord, repaired.correctMeaning, repaired.explanation, original.id);
    const content = serializeLegacyWordContent(repaired);
    db.prepare('UPDATE ContentItem SET title=?, meaningVi=?, contentJson=?, updatedAt=? WHERE sourceKey=?')
      .run(content.title, content.meaningVi, content.contentJson, new Date().toISOString(), `legacy-word:${original.id}`);
    changes.push({ word: original.word, before: original.correctMeaning, after: repaired.correctMeaning });
  }
  const upsert = db.prepare(`INSERT INTO Exercise (id,part,prompt,optionsJson,correctOptionId,explanationVi,errorCategory,focusContentIds,difficulty,status,sourceVersion,createdAt,updatedAt)
    VALUES (?,5,?,?,?,?,?,'',1,'approved','foundation-audit-2026-10-05',?,?)
    ON CONFLICT(id) DO UPDATE SET prompt=excluded.prompt, optionsJson=excluded.optionsJson,correctOptionId=excluded.correctOptionId,explanationVi=excluded.explanationVi,errorCategory=excluded.errorCategory,sourceVersion=excluded.sourceVersion,updatedAt=excluded.updatedAt`);
  for (const q of foundationExercises) upsert.run(q.id,q.prompt,JSON.stringify(q.options),q.correctOptionId,q.explanationVi,q.errorCategory,new Date().toISOString(),new Date().toISOString());
  const updateExisting = db.prepare('UPDATE Exercise SET optionsJson=?, explanationVi=?, updatedAt=? WHERE id=?');
  for (const q of part5Exercises) updateExisting.run(JSON.stringify(q.options),q.explanationVi,new Date().toISOString(),q.id);
  assert.deepEqual(snapshot(),learnerState,'Learner history changed');
  assert.deepEqual(wordsState(),wordState,'Original words or SRS changed');
  assert.equal(db.prepare('PRAGMA foreign_key_check').all().length,0);
  db.exec('COMMIT');
} catch(error) { db.exec('ROLLBACK'); throw error; }
const report = { runTime: new Date().toISOString(), database: filename, backupPath, before, after: counts(), changes, learnerStatePreserved: true };
fs.mkdirSync('artifacts/audit',{recursive:true});
fs.writeFileSync(`artifacts/audit/applied-${stamp}.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
db.close();
