import test from 'node:test';
import assert from 'node:assert/strict';
import { foundationExercises } from '../src/data/foundation-exercises.ts';
import { foundationTypes } from '../src/domain/foundation.ts';
import { rotateExerciseBank } from '../src/lib/exercise-bank.ts';
import { buildDailyDrills, gradeDailyDrill } from '../src/lib/drill-builder.ts';
import { lessonRound } from '../src/lib/lesson-round.ts';
import { getLessonsByStage, countExercises } from '../src/services/lesson-service.ts';
import { repairKnownLegacyWord } from '../src/lib/legacy-content.ts';
import { stage1VocabLessons } from '../src/data/stage1-vocab-data.ts';
import { verifiedWord } from '../src/data/verified-vocabulary.ts';

test('12 foundation banks have 20 unique questions, detailed options and four disjoint five-question rounds', () => {
  assert.equal(foundationExercises.length, 240);
  assert.equal(new Set(foundationExercises.map(q => q.id)).size, 240);
  assert.equal(new Set(foundationExercises.map(q => q.prompt)).size, 240);
  for (const type of Object.keys(foundationTypes)) {
    const bank = foundationExercises.filter(q => q.errorCategory === type);
    assert.equal(bank.length, 20);
    const rounds = Array.from({length:4}, (_, r) => rotateExerciseBank(bank, '2026-10-05', 5, r));
    assert.ok(rounds.every(r => r.length === 5));
    assert.equal(new Set(rounds.flat().map(q => q.id)).size,20);
    for (const q of bank) {
      assert.equal(new Set(q.options.map(o=>o.text)).size,4, q.id);
      assert.equal(q.options.filter(o=>o.id===q.correctOptionId).length,1);
      assert.ok(q.options.every(o=>o.rationaleVi.length>20), q.id);
      assert.match(q.explanationVi,/Ví dụ hoàn chỉnh:.*Nghĩa:/);
    }
  }
});

test('round 11 and 1000 grade with the same option order and reject other rounds', () => {
  const content = Array.from({length:25}, (_, i) => ({id:`word-${i}`,kind:'verb',title:`word${i}`,meaningVi:`nghĩa ${i}`,topic:'test',detail:{}}));
  for(const round of [0,1,11,1000]) {
    const drills=buildDailyDrills(content,{dateKey:'2026-10-05',modes:['meaning'],limitPerMode:5,round});
    for(const drill of drills) {
      const option = drill.options!.find(o=>o.text === content.find(c=>c.id===drill.contentId)!.meaningVi)!;
      const input={dateKey:'2026-10-05',modes:['meaning'] as const,limitPerMode:5,round,drillId:drill.id,answer:option.id};
      const grade=gradeDailyDrill(content,input);
      assert.equal(grade.status,'graded');
      if(grade.status==='graded') { assert.equal(grade.isCorrect,true); assert.match(grade.explanation!,/Đáp án:/); }
      assert.equal(gradeDailyDrill(content,{...input,round:round+1}).status,'invalid');
    }
  }
});

test('every curriculum session has exactly five questions including reading passages', () => {
  for(const lesson of [...getLessonsByStage('foundation'),...getLessonsByStage('intermediate')]) {
    for(const round of [0,1,10]) assert.equal(countExercises(lessonRound(lesson,round)),5,lesson.id);
  }
});

test('dictionary repairs preserve learner input and SRS; compatible is an adjective', () => {
  assert.equal(verifiedWord('constructor'), undefined);
  const input={id:'dark-test',word:'dark',meaning:'bóng tối',correctMeaning:'đông đặc',interval:45,repetition:6};
  const repaired=repairKnownLegacyWord(input);
  assert.equal(repaired.meaning,input.meaning);
  assert.equal(repaired.interval,45);
  assert.equal(repaired.repetition,6);
  assert.match(repaired.correctMeaning,/tối/);
  assert.doesNotMatch(repaired.correctMeaning,/đông đặc/);
  assert.strictEqual(repairKnownLegacyWord(repaired),repaired);
  assert.equal(stage1VocabLessons.flatMap(l=>l.words).find(w=>w.word==='compatible')?.pos,'adjective');
});

test('curriculum feedback carries authored evidence and identifies every distractor', () => {
  for(const lesson of [...getLessonsByStage('foundation'),...getLessonsByStage('intermediate')]) {
    for(const exercise of lesson.exercises) {
      const questions='questions' in exercise ? exercise.questions : [exercise];
      for(const q of questions) {
        const answer=q.options.find(o=>o.id===q.correctOptionId)!;
        assert.ok(q.explanationVi.includes(answer.text));
        for(const option of q.options as Array<{id:string;text:string;rationaleVi?:string}>) {
          assert.ok(option.rationaleVi && option.rationaleVi.length>15);
        }
      }
    }
  }
});
