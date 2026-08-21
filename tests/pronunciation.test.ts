import assert from "node:assert/strict";
import test from "node:test";

import {
  buildYouglishUrl,
  extractDictionaryPronunciation,
  isDictionaryHeadword,
} from "../src/lib/pronunciation.ts";

test("limits dictionary lookups to safe single English headwords", () => {
  assert.equal(isDictionaryHeadword("participate"), true);
  assert.equal(isDictionaryHeadword("follow-up"), true);
  assert.equal(isDictionaryHeadword("don't"), true);
  assert.equal(isDictionaryHeadword("follow up on"), false);
  assert.equal(isDictionaryHeadword("../../secret"), false);
  assert.equal(isDictionaryHeadword("a".repeat(65)), false);
});

test("extracts IPA and an HTTPS recording from Dictionary API payloads", () => {
  assert.deepEqual(extractDictionaryPronunciation([{
    phonetic: "/pɑːrˈtɪsɪpeɪt/",
    phonetics: [
      { text: "/pɑːrˈtɪsɪpeɪt/" },
      { audio: "//ssl.gstatic.com/dictionary/static/sounds/participate.mp3" },
    ],
  }]), {
    phonetic: "/pɑːrˈtɪsɪpeɪt/",
    audioUrl: "https://ssl.gstatic.com/dictionary/static/sounds/participate.mp3",
  });
});

test("does not expose non-HTTPS recording URLs", () => {
  assert.deepEqual(extractDictionaryPronunciation([{
    phonetics: [{ text: "həˈləʊ", audio: "javascript:alert(1)" }],
  }]), { phonetic: "həˈləʊ", audioUrl: null });
  assert.deepEqual(extractDictionaryPronunciation({ error: "not found" }), {
    phonetic: null,
    audioUrl: null,
  });
});

test("does not expose an HTTPS recording from an untrusted host", () => {
  assert.deepEqual(extractDictionaryPronunciation([{
    phonetics: [{ text: "test", audio: "https://evil.example/tracker.mp3" }],
  }]), { phonetic: "test", audioUrl: null });
});

test("builds an encoded direct YouGlish search for real-world US English", () => {
  assert.equal(
    buildYouglishUrl("follow up on"),
    "https://youglish.com/pronounce/follow%20up%20on/english/us",
  );
});
