"use client";

import { useState, useEffect } from "react";
import { Volume2, Trash2, Plus, Sparkles, Loader2, CheckSquare, ChevronDown, ChevronUp, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

type Word = {
  id: string;
  word: string;
  meaning: string;
  correctMeaning?: string | null;
  explanation?: string | null;
  status?: string | null;
  createdAt: string;
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'correct':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50';
    case 'partially_correct':
      return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50';
    case 'incorrect':
      return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'correct':
      return 'Đúng nghĩa';
    case 'partially_correct':
      return 'Nghĩa gần đúng';
    case 'incorrect':
      return 'Sai nghĩa';
    default:
      return 'Chưa kiểm tra';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'correct':
      return <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
    case 'partially_correct':
      return <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
    case 'incorrect':
      return <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />;
    default:
      return <HelpCircle className="w-3 h-3 text-gray-500 dark:text-gray-400" />;
  }
};

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);

  // AI states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const res = await fetch("/api/words");
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
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) return;

    try {
      const res = await fetch("/api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: newWord, meaning: newMeaning }),
      });
      if (res.ok) {
        setNewWord("");
        setNewMeaning("");
        fetchWords();
      }
    } catch (error) {
      console.error("Failed to add word", error);
    }
  };

  const handleDeleteWord = async (id: string) => {
    try {
      const res = await fetch(`/api/words/${id}`, { method: "DELETE" });
      if (res.ok) {
        setWords((prev) => prev.filter((w) => w.id !== id));
        setSelectedWords((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Failed to delete word", error);
    }
  };

  const playPronunciation = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const toggleWordSelection = (id: string) => {
    setSelectedWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleGenerateSentences = async () => {
    if (selectedWords.size === 0) return;
    setAiLoading(true);
    setAiResponse(null);

    const selectedWordObjects = words.filter((w) => selectedWords.has(w.id));
    
    try {
      const res = await fetch("/api/ai/generate-sentences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: selectedWordObjects }),
      });
      const data = await res.json();
      if (data.result) {
        setAiResponse(data.result);
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

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header & Form */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-zinc-100">Add New Vocabulary</h2>
        <form onSubmit={handleAddWord} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="English word (e.g. abandon)"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Vietnamese meaning"
            value={newMeaning}
            onChange={(e) => setNewMeaning(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!newWord || !newMeaning}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Word
          </button>
        </form>
      </div>

      {/* AI Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
          Your Vocabulary ({words.length})
        </h2>
        {selectedWords.size > 0 && (
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

      {/* AI Response Area */}
      {aiResponse && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Generated Examples
          </h3>
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
            {aiResponse}
          </div>
        </div>
      )}

      {/* Words Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {words.map((word) => {
            const isSelected = selectedWords.has(word.id);
            const isExpanded = expandedWordId === word.id;
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
                <div className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWord(word.id);
                    }}
                    className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-3 pr-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-zinc-700 text-transparent'}`}>
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                        {word.word}
                      </h3>
                      {word.status && (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(word.status)}`}>
                          {getStatusIcon(word.status)}
                          {getStatusLabel(word.status)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-8 mb-4">
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Nghĩa của bạn:</p>
                    <p className="text-gray-700 dark:text-zinc-300 text-lg font-medium leading-tight">
                      {word.meaning}
                    </p>
                  </div>
                </div>

                <div>
                  {isExpanded && (
                    <div 
                      className="mt-2 mb-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40 text-sm flex flex-col gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {word.correctMeaning && word.correctMeaning !== word.meaning && (
                        <div>
                          <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Nghĩa chuẩn AI đề xuất:</p>
                          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-base">
                            {word.correctMeaning}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Giải thích chi tiết & Ví dụ:</p>
                        <p className="text-gray-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed font-normal">
                          {word.explanation || "Không có giải thích nào."}
                        </p>
                      </div>
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
                          Ẩn phân tích
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Phân tích AI
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playPronunciation(word.word);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors animate-pulse"
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
