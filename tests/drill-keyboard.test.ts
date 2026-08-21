import assert from "node:assert/strict";
import test from "node:test";

import { getDrillKeyboardAction } from "../src/lib/drill-keyboard.ts";

test("maps number keys to visible choice indexes", () => {
  assert.deepEqual(getDrillKeyboardAction("1", false, false), { type: "select", index: 0 });
  assert.deepEqual(getDrillKeyboardAction("4", false, false), { type: "select", index: 3 });
  assert.equal(getDrillKeyboardAction("5", false, false), null);
});

test("uses Enter to submit then advance and slash to focus text", () => {
  assert.deepEqual(getDrillKeyboardAction("Enter", false, true), { type: "submit" });
  assert.deepEqual(getDrillKeyboardAction("Enter", true, true), { type: "next" });
  assert.deepEqual(getDrillKeyboardAction("/", false, false), { type: "focus" });
});
