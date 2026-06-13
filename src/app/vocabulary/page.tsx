"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { useSoftReveal } from "@/lib/use-soft-reveal";

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
      return "text-[var(--success)] border-[var(--success)] bg-[rgba(94,106,67,0.15)]";
    case "partially_correct":
      return "text-[var(--warning)] border-[var(--warning)] bg-[rgba(217,161,79,0.15)]";
    case "incorrect":
      return "text-[var(--danger)] border-[var(--danger)] bg-[rgba(181,90,75,0.15)]";
    default:
      return "text-[var(--muted-2)] border-[var(--border)] bg-[var(--surface)]";
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
      return <CheckCircle className="w-3 h-3" />;
    case "partially_correct":
      return <AlertCircle className="w-3 h-3" />;
    case "incorrect":
      return <AlertCircle className="w-3 h-3" />;
    default:
      return <HelpCircle className="w-3 h-3" />;
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

export default function Home() {
  const pageRef = useSoftReveal<HTMLDivElement>();
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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

    const trimmedWord = normalizeEnglishInput(newWord).trim();
    const trimmedMeaning = newMeaning.trim();
    if (!trimmedWord || !trimmedMeaning) return;
    const submittedWord = trimmedWord;
    const submittedMeaning = trimmedMeaning;

    setNewWord("");
    setNewMeaning("");
    setFormError(null);

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tempWord: Word = {
      id: tempId,
      word: submittedWord,
      meaning: submittedMeaning,
      status: "unverified",
      explanation: "Đang chờ AI kiểm tra...",
      createdAt: new Date().toISOString()
    };

    setWords((prev) => [tempWord, ...prev]);
    setRecheckingWordId(tempId);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = getAdminToken();
      if (!token) {
        setWords((prev) => prev.filter(w => w.id !== tempId));
        return;
      }

      const res = await fetch(`${apiUrl}/api/words`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ word: submittedWord, meaning: submittedMeaning }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data) {
        setWords((prev) => prev.map((w) => (w.id === tempId ? data : w)));
        setAuthError(null);
      } else if (res.status === 401) {
        setWords((prev) => prev.filter(w => w.id !== tempId));
        handleUnauthorized();
      } else if (res.status === 409) {
        setFormError(data?.error || "This word already exists.");
        setWords((prev) => prev.filter(w => w.id !== tempId));
      } else {
        setFormError(data?.error || "Failed to add word.");
        setWords((prev) => prev.filter(w => w.id !== tempId));
      }
    } catch (error) {
      console.error("Failed to add word", error);
      setFormError("Could not add word.");
      setWords((prev) => prev.filter(w => w.id !== tempId));
    } finally {
      setRecheckingWordId((current) => current === tempId ? null : current);
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
    <div ref={pageRef} className="study-page flex flex-col gap-8">
      <section data-reveal className="study-panel p-5 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Vocabulary</h2>
          {!isAdmin && (
            <Link href="/login" className="text-sm font-bold text-[var(--primary)] hover:text-[var(--primary-hover)]">Đăng nhập để thêm từ</Link>
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
            className="study-input flex-1"
          />
          <input
            type="text"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            lang="vi"
            placeholder="Vietnamese meaning"
            value={newMeaning}
            onChange={(e) => setNewMeaning(e.target.value)}
            className="study-input flex-1"
          />
          <button
            type="submit"
            disabled={hasMounted ? (!newWord.trim() || !newMeaning.trim()) : undefined}
            className="btn-primary disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            Add Word
          </button>
        </form>
        {formError && <p className="mt-3 text-sm text-[var(--danger)]">{formError}</p>}
      </section>

      <div data-reveal className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Vocabulary ({words.length})</h2>
        {isAdmin && selectedWords.size > 0 && (
          <button
            onClick={handleGenerateSentences}
            disabled={aiLoading}
            className="btn-primary"
          >
            {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Sentences ({selectedWords.size})
          </button>
        )}
      </div>
      {authError && <p className="text-sm font-bold text-[var(--danger)]">{authError}</p>}

      {aiResponse && (
        <section data-reveal className="study-panel p-5 md:p-6 border-[var(--primary)]">
          <h3 className="text-lg font-bold text-[var(--primary-hover)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Generated Examples
          </h3>
          <div className="prose prose-invert max-w-none whitespace-pre-wrap">{aiResponse}</div>
        </section>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
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
                data-reveal
                className={`group relative p-5 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "study-card border-[var(--primary)] bg-[rgba(176,106,74,0.1)] ring-1 ring-[var(--primary)] shadow-md"
                    : "study-card hover:border-[var(--primary-hover)] hover:shadow-md"
                }`}
                onClick={() => toggleWordSelection(word.id)}
              >
                {isAdmin && (
                <div className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--danger)] transition-colors opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleDeleteWord(word.id);
                    }}
                    className="p-2 bg-[var(--surface)] rounded-lg hover:bg-[rgba(181,90,75,0.15)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                )}

                <div>
                  <div className="flex items-start justify-between mb-3 pr-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--foreground)]" : "border-[var(--border)] text-transparent"}`}>
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">{word.word}</h3>
                      <span className={`status-pill ${getStatusBadgeStyle(word.status || "unverified")}`}>
                        {getStatusIcon(word.status || "unverified")}
                        {getStatusLabel(word.status || "unverified")}
                      </span>
                    </div>
                  </div>

                  <div className="ml-8 mb-4 space-y-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-0.5">Your meaning</p>
                      <p className="text-lg font-medium leading-tight text-[var(--foreground)]">{word.meaning}</p>
                    </div>

                    {!!word.synonyms && !isEditing && (
                      <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-0.5">English synonyms</p>
                      <p className="text-sm text-[var(--muted)]">{word.synonyms}</p>
                    </div>
                  )}
                  </div>
                </div>

                <div>
                  {isExpanded && (
                    <div
                      className="mt-2 mb-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-sm flex flex-col gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {word.correctedWord && word.correctedWord.toLowerCase() !== word.word.toLowerCase() && !isEditing && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-1">Correct spelling</p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[var(--success)] font-bold text-base">{word.correctedWord}</p>
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
                          <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-1">Suggested correct meaning</p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[var(--primary)] font-bold text-base">{word.correctMeaning}</p>
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
                            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-1">AI explanation</p>
                            <p className="text-[var(--muted)] whitespace-pre-wrap leading-relaxed font-normal">
                              {word.explanation || "No AI explanation yet."}
                            </p>
                          </div>

                          {isAdmin && shouldSuggestEdit && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => startEditing(word)}
                                className="btn-quiet text-xs py-1.5 px-3"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit meaning
                              </button>
                              <button
                                onClick={() => void handleRecheckWord(word)}
                                disabled={isBusy}
                                className="btn-quiet text-xs py-1.5 px-3 disabled:opacity-60"
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
                            <label className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-1 block">
                              Edit meaning
                            </label>
                            <input
                              value={editMeaning}
                              onChange={(e) => setEditMeaning(e.target.value)}
                              className="study-input"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)] mb-1 block">
                              English synonyms
                            </label>
                            <input
                              value={editSynonyms}
                              onChange={(e) => setEditSynonyms(e.target.value)}
                              placeholder="leave, quit, give up"
                              className="study-input"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => void handleSaveEdit(word.id)}
                              disabled={!editMeaning.trim() || isBusy}
                              className="btn-primary text-xs py-1.5 px-3"
                            >
                              {savingWordId === word.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              Save and recheck
                            </button>
                            <button
                              onClick={stopEditing}
                              disabled={isBusy}
                              className="btn-quiet text-xs py-1.5 px-3"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border)]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedWordId(isExpanded ? null : word.id);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[var(--muted)] hover:text-[var(--primary)] rounded-lg hover:bg-[var(--panel-soft)] transition-all"
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
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-[var(--foreground)] bg-[rgba(176,106,74,0.18)] rounded-lg hover:bg-[rgba(176,106,74,0.3)] transition-colors"
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
