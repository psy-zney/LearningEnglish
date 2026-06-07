"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Loader2,
  Pencil,
  Plus,
  RotateCw,
  Sparkles,
  Trash2,
  Volume2,
  X,
} from "lucide-react";

type Word = {
  id: string;
  word: string;
  meaning: string;
  correctedWord?: string | null;
  correctMeaning?: string | null;
  explanation?: string | null;
  status?: string | null;
  synonyms?: string | null;
  createdAt: string;
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "correct":
      return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50";
    case "partially_correct":
      return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50";
    case "incorrect":
      return "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "correct":
      return "Dung nghia";
    case "partially_correct":
      return "Gan dung";
    case "incorrect":
      return "Sai nghia";
    default:
      return "Chua kiem tra";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "correct":
      return <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
    case "partially_correct":
      return <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
    case "incorrect":
      return <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />;
    default:
      return <HelpCircle className="w-3 h-3 text-gray-500 dark:text-gray-400" />;
  }
};

const normalizeEnglishInput = (value: string) => {
  return value
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z\s'-]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
};

const toneMarks: Record<string, Record<string, string>> = {
  s: { a: "\u00e1", e: "\u00e9", i: "\u00ed", o: "\u00f3", u: "\u00fa", y: "\u00fd", "\u0103": "\u1eaf", "\u00e2": "\u1ea5", "\u00ea": "\u1ebf", "\u00f4": "\u1ed1", "\u01a1": "\u1edb", "\u01b0": "\u1ee9" },
  f: { a: "\u00e0", e: "\u00e8", i: "\u00ec", o: "\u00f2", u: "\u00f9", y: "\u1ef3", "\u0103": "\u1eb1", "\u00e2": "\u1ea7", "\u00ea": "\u1ec1", "\u00f4": "\u1ed3", "\u01a1": "\u1edd", "\u01b0": "\u1eeb" },
  r: { a: "\u1ea3", e: "\u1ebb", i: "\u1ec9", o: "\u1ecf", u: "\u1ee7", y: "\u1ef7", "\u0103": "\u1eb3", "\u00e2": "\u1ea9", "\u00ea": "\u1ec3", "\u00f4": "\u1ed5", "\u01a1": "\u1edf", "\u01b0": "\u1eed" },
  x: { a: "\u00e3", e: "\u1ebd", i: "\u0129", o: "\u00f5", u: "\u0169", y: "\u1ef9", "\u0103": "\u1eb5", "\u00e2": "\u1eab", "\u00ea": "\u1ec5", "\u00f4": "\u1ed7", "\u01a1": "\u1ee1", "\u01b0": "\u1eef" },
  j: { a: "\u1ea1", e: "\u1eb9", i: "\u1ecb", o: "\u1ecd", u: "\u1ee5", y: "\u1ef5", "\u0103": "\u1eb7", "\u00e2": "\u1ead", "\u00ea": "\u1ec7", "\u00f4": "\u1ed9", "\u01a1": "\u1ee3", "\u01b0": "\u1ef1" },
};

const toneByCombiningMark: Record<string, string> = {
  "\u0301": "s",
  "\u0300": "f",
  "\u0309": "r",
  "\u0303": "x",
  "\u0323": "j",
};

const toneCombiningMarks = /[\u0300\u0301\u0303\u0309\u0323]/g;
const vowelPriority = ["\u0103", "\u00e2", "\u00ea", "\u00f4", "\u01a1", "\u01b0", "a", "e", "o", "i", "u", "y"];

const stripToneMarks = (value: string) => value.normalize("NFD").replace(toneCombiningMarks, "").normalize("NFC");

const getExistingToneKey = (value: string) => {
  for (const char of value.normalize("NFD")) {
    const toneKey = toneByCombiningMark[char];
    if (toneKey) return toneKey;
  }

  return "";
};

const telexToneKeys = new Set(["s", "f", "r", "x", "j"]);
const telexVowels = new Set(["a", "e", "i", "o", "u", "y", "\u0103", "\u00e2", "\u00ea", "\u00f4", "\u01a1", "\u01b0"]);

const findExplicitToneKey = (word: string) => {
  const lowerWord = stripToneMarks(word).toLowerCase();

  for (let index = lowerWord.length - 1; index >= 0; index -= 1) {
    const char = lowerWord[index];
    if (!telexToneKeys.has(char)) continue;

    const before = lowerWord.slice(0, index);
    const after = lowerWord.slice(index + 1);
    const hasVowelBefore = [...before].some((item) => telexVowels.has(item));
    const onlyVowelsAfter = [...after].every((item) => telexVowels.has(item));

    if (hasVowelBefore && onlyVowelsAfter) {
      return { index, toneKey: char };
    }
  }

  return { index: -1, toneKey: "" };
};

const applyTelexToWord = (word: string) => {
  const explicitTone = findExplicitToneKey(word);
  const explicitToneKey = explicitTone.toneKey;
  const existingToneKey = getExistingToneKey(word);
  const toneKey = explicitToneKey || existingToneKey;
  const rawWord = explicitToneKey
    ? `${word.slice(0, explicitTone.index)}${word.slice(explicitTone.index + 1)}`
    : word;
  const baseWord = stripToneMarks(rawWord);
  const withoutToneKey = baseWord
    .replace(/dd/gi, "\u0111")
    .replace(/uow/gi, "\u01b0\u01a1")
    .replace(/uw/gi, "\u01b0")
    .replace(/ow/gi, "\u01a1")
    .replace(/aw/gi, "\u0103")
    .replace(/aa/gi, "\u00e2")
    .replace(/ee/gi, "\u00ea")
    .replace(/oo/gi, "\u00f4");
  if (!toneKey) return withoutToneKey;

  const lowerWord = withoutToneKey.toLowerCase();
  const targetVowel = lowerWord.includes("ia")
    ? "i"
    : vowelPriority.find((vowel) => lowerWord.includes(vowel));
  if (!targetVowel) return withoutToneKey;

  const index = lowerWord.lastIndexOf(targetVowel);
  const markedVowel = toneMarks[toneKey]?.[targetVowel];
  if (!markedVowel) return withoutToneKey;

  return `${withoutToneKey.slice(0, index)}${markedVowel}${withoutToneKey.slice(index + targetVowel.length)}`;
};

const normalizeVietnameseInput = (value: string) => {
  return value.replace(/[A-Za-z\u00c0-\u1ef9\u0110\u0111]+/g, applyTelexToWord);
};

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const [editingWordId, setEditingWordId] = useState<string | null>(null);
  const [editMeaning, setEditMeaning] = useState("");
  const [editSynonyms, setEditSynonyms] = useState("");
  const [savingWordId, setSavingWordId] = useState<string | null>(null);
  const [recheckingWordId, setRecheckingWordId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);

    if (typeof window !== 'undefined') {
      setIsAdmin(!!localStorage.getItem("admin_token"));
    }
  }, []);

  async function fetchWords() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/api/words`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setWords(data);
      } else {
        console.error("Failed to fetch words:", data.error || data);
        setWords([]);
      }
    } catch (error) {
      console.error("Failed to fetch words", error);
      setWords([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchWords();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const replaceWord = (updatedWord: Word) => {
    setWords((prev) => prev.map((word) => (word.id === updatedWord.id ? updatedWord : word)));
  };

  const getAdminToken = () => {
    const token = localStorage.getItem("admin_token") || "";
    if (!token) {
      setIsAdmin(false);
      setAuthError("Dang nhap de su dung tinh nang quan tri.");
    }
    return token;
  };

  const handleUnauthorized = () => {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
    setAuthError("Phien dang nhap da het han. Vui long dang nhap lai.");
  };

  const startEditing = (word: Word) => {
    setEditingWordId(word.id);
    setExpandedWordId(word.id);
    setEditMeaning(word.correctMeaning || word.meaning);
    setEditSynonyms(word.synonyms || "");
  };

  const stopEditing = () => {
    setEditingWordId(null);
    setEditMeaning("");
    setEditSynonyms("");
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedWord = normalizeEnglishInput(newWord).trim();
    const trimmedMeaning = newMeaning.trim();
    if (!trimmedWord || !trimmedMeaning) return;
    const submittedWord = trimmedWord;
    const submittedMeaning = trimmedMeaning;

    try {
      setIsSubmitting(true);
      setFormError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/words`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ word: submittedWord, meaning: submittedMeaning }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setNewWord((current) => (current.trim() === submittedWord ? "" : current));
        setNewMeaning((current) => (current.trim() === submittedMeaning ? "" : current));
        setAuthError(null);
        await fetchWords();
      } else if (res.status === 401) {
        handleUnauthorized();
      } else if (res.status === 409) {
        setFormError(data?.error || "This word already exists.");
        setNewWord((current) => (current.trim() === submittedWord ? "" : current));
        setNewMeaning((current) => (current.trim() === submittedMeaning ? "" : current));
      } else {
        setFormError(data?.error || "Failed to add word.");
      }
    } catch (error) {
      console.error("Failed to add word", error);
      setFormError("Could not add word.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWord = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/words/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setWords((prev) => prev.filter((word) => word.id !== id));
        setSelectedWords((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setAuthError(null);

        if (expandedWordId === id) setExpandedWordId(null);
        if (editingWordId === id) stopEditing();
      } else if (res.status === 401) {
        handleUnauthorized();
      }
    } catch (error) {
      console.error("Failed to delete word", error);
    }
  };

  const playPronunciation = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const toggleWordSelection = (id: string) => {
    setSelectedWords((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleGenerateSentences = async () => {
    if (selectedWords.size === 0) return;
    setAiLoading(true);
    setAiResponse(null);

    const selectedWordObjects = words.filter((word) => selectedWords.has(word.id));

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/ai/generate-sentences`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ words: selectedWordObjects }),
      });
      const data = await res.json();
      if (data.result) {
        setAiResponse(data.result);
        setAuthError(null);
      } else if (res.status === 401) {
        handleUnauthorized();
        setAiResponse(null);
      } else {
        setAiResponse("Failed to generate sentences.");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Error connecting to AI.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleRecheckWord = async (word: Word) => {
    try {
      setRecheckingWordId(word.id);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/words/${word.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ recheck: true }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data) {
        replaceWord(data);
        setAuthError(null);
      } else if (res.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Failed to recheck word", data?.error || res.statusText);
      }
    } catch (error) {
      console.error("Failed to recheck word", error);
    } finally {
      setRecheckingWordId(null);
    }
  };

  const handleApplyCorrectedWord = async (word: Word) => {
    const correctedWord = word.correctedWord?.trim();
    if (!correctedWord || correctedWord.toLowerCase() === word.word.toLowerCase()) return;

    try {
      setSavingWordId(word.id);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/words/${word.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          word: correctedWord,
          recheck: true,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data) {
        replaceWord(data);
        setAuthError(null);
      } else if (res.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Failed to apply corrected spelling", data?.error || res.statusText);
      }
    } catch (error) {
      console.error("Failed to apply corrected spelling", error);
    } finally {
      setSavingWordId(null);
    }
  };

  const handleSaveEdit = async (wordId: string) => {
    const trimmedMeaning = editMeaning.trim();
    const trimmedSynonyms = editSynonyms.trim();
    if (!trimmedMeaning) return;

    try {
      setSavingWordId(wordId);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/words/${wordId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          meaning: trimmedMeaning,
          synonyms: trimmedSynonyms,
          recheck: true,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data) {
        replaceWord(data);
        stopEditing();
        setAuthError(null);
      } else if (res.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Failed to save word", data?.error || res.statusText);
      }
    } catch (error) {
      console.error("Failed to save word", error);
    } finally {
      setSavingWordId(null);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col gap-8">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Add New Vocabulary</h2>
          {!isAdmin && (
            <a href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Đăng nhập để thêm từ</a>
          )}
        </div>
        <form onSubmit={handleAddWord} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            lang="en"
            placeholder="English word (e.g. abandon)"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onBlur={() => setNewWord((current) => normalizeEnglishInput(current).trim())}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            lang="vi"
            placeholder="Vietnamese meaning"
            value={newMeaning}
            onChange={(e) => setNewMeaning(normalizeVietnameseInput(e.target.value))}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={hasMounted ? (!newWord.trim() || !newMeaning.trim() || isSubmitting) : undefined}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {isSubmitting ? "Checking with AI..." : "Add Word"}
          </button>
        </form>
        {formError && <p className="mt-3 text-sm text-rose-500">{formError}</p>}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Your Vocabulary ({words.length})</h2>
        {isAdmin && selectedWords.size > 0 && (
          <button
            onClick={handleGenerateSentences}
            disabled={aiLoading}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-md transition-all flex items-center gap-2"
          >
            {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Sentences ({selectedWords.size})
          </button>
        )}
      </div>
      {authError && <p className="text-sm font-medium text-rose-500">{authError}</p>}

      {aiResponse && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Generated Examples
          </h3>
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">{aiResponse}</div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {words.map((word) => {
            const isSelected = selectedWords.has(word.id);
            const isExpanded = expandedWordId === word.id;
            const isEditing = editingWordId === word.id;
            const isBusy = savingWordId === word.id || recheckingWordId === word.id;
            const shouldSuggestEdit = word.status === "incorrect" || word.status === "partially_correct" || word.status === "unverified" || !word.explanation;

            return (
              <div
                key={word.id}
                className={`group relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-md ring-1 ring-indigo-500"
                    : "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800"
                }`}
                onClick={() => toggleWordSelection(word.id)}
              >
                {isAdmin && (
                <div className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleDeleteWord(word.id);
                    }}
                    className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                )}

                <div>
                  <div className="flex items-start justify-between mb-3 pr-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300 dark:border-zinc-700 text-transparent"}`}>
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100">{word.word}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(word.status || "unverified")}`}>
                        {getStatusIcon(word.status || "unverified")}
                        {getStatusLabel(word.status || "unverified")}
                      </span>
                    </div>
                  </div>

                  <div className="ml-8 mb-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Your meaning</p>
                      <p className="text-gray-700 dark:text-zinc-300 text-lg font-medium leading-tight">{word.meaning}</p>
                    </div>

                    {!!word.synonyms && !isEditing && (
                      <div>
                      <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">English synonyms</p>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">{word.synonyms}</p>
                    </div>
                  )}
                  </div>
                </div>

                <div>
                  {isExpanded && (
                    <div
                      className="mt-2 mb-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40 text-sm flex flex-col gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {word.correctedWord && word.correctedWord.toLowerCase() !== word.word.toLowerCase() && !isEditing && (
                        <div>
                          <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Correct spelling</p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-emerald-600 dark:text-emerald-400 font-bold text-base">{word.correctedWord}</p>
                            {isAdmin && (
                              <button
                                onClick={() => void handleApplyCorrectedWord(word)}
                                disabled={isBusy}
                                className="px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 disabled:opacity-60"
                              >
                                Use this
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {word.correctMeaning && word.correctMeaning !== word.meaning && !isEditing && (
                        <div>
                          <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Suggested correct meaning</p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-indigo-600 dark:text-indigo-400 font-bold text-base">{word.correctMeaning}</p>
                            {isAdmin && (
                              <button
                                onClick={() => startEditing({ ...word, meaning: word.correctMeaning || word.meaning })}
                                className="px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                              >
                                Use this
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {!isEditing ? (
                        <>
                          <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">AI explanation</p>
                            <p className="text-gray-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed font-normal">
                              {word.explanation || "No AI explanation yet."}
                            </p>
                          </div>

                          {isAdmin && shouldSuggestEdit && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => startEditing(word)}
                                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/50"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit meaning
                              </button>
                              <button
                                onClick={() => void handleRecheckWord(word)}
                                disabled={isBusy}
                                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950/50 disabled:opacity-60"
                              >
                                {recheckingWordId === word.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCw className="w-4 h-4" />}
                                Recheck by AI
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <div>
                            <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1 block">
                              Edit meaning
                            </label>
                            <input
                              value={editMeaning}
                              onChange={(e) => setEditMeaning(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1 block">
                              English synonyms
                            </label>
                            <input
                              value={editSynonyms}
                              onChange={(e) => setEditSynonyms(e.target.value)}
                              placeholder="leave, quit, give up"
                              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => void handleSaveEdit(word.id)}
                              disabled={!editMeaning.trim() || isBusy}
                              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
                            >
                              {savingWordId === word.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              Save and recheck
                            </button>
                            <button
                              onClick={stopEditing}
                              disabled={isBusy}
                              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-zinc-800/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedWordId(isExpanded ? null : word.id);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide AI
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          AI details
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playPronunciation(word.word);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      Pronounce
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
