"use client";

import { useState, useEffect } from "react";
import { PenTool, CheckCircle2, Loader2, RefreshCw, Sparkles, BrainCircuit, Type, FileText } from "lucide-react";

type Word = {
  id: string;
  word: string;
  meaning: string;
  nextReviewDate?: string;
};

export default function PracticeArea() {
  const [words, setWords] = useState<Word[]>([]);
  const [mode, setMode] = useState<"focus" | "free">("focus");
  const [exerciseType, setExerciseType] = useState<"translation" | "cloze" | "flashcard">("translation");
  
  const [question, setQuestion] = useState<string | null>(null);
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [clozeAnswer, setClozeAnswer] = useState<string | null>(null);
  const [flashcardWord, setFlashcardWord] = useState<Word | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const res = await fetch("/api/words");
      const data = await res.json();
      setWords(data);
    } catch (error) {
      console.error("Failed to fetch words", error);
    }
  };

  const generateQuestion = async () => {
    setIsGenerating(true);
    setQuestion(null);
    setFeedback(null);
    setUserAnswer("");
    setClozeAnswer(null);
    setIsFlipped(false);
    
    try {
      if (exerciseType === "flashcard") {
        if (words.length > 0) {
          // In a real app, this should fetch words where nextReviewDate <= now
          const randomWord = words[Math.floor(Math.random() * words.length)];
          setFlashcardWord(randomWord);
          setQuestion("Flashcard");
        }
        setIsGenerating(false);
        return;
      }

      setFlashcardWord(null);
      const res = await fetch("/api/ai/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, words: mode === "focus" ? words : [], exerciseType }),
      });
      const data = await res.json();
      if (data.question) {
        setQuestion(data.question);
        setTargetWords(data.targetWords || []);
        if (data.clozeAnswer) setClozeAnswer(data.clozeAnswer);
      }
    } catch (error) {
      console.error("Error generating question", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const checkAnswer = async () => {
    if (!userAnswer.trim() || !question) return;
    
    if (exerciseType === "cloze" && clozeAnswer) {
      const isCorrect = userAnswer.trim().toLowerCase() === clozeAnswer.toLowerCase();
      setFeedback(isCorrect ? "✅ Chính xác! Tuyệt vời." : `❌ Sai rồi. Đáp án đúng là: ${clozeAnswer}`);
      return;
    }

    setIsChecking(true);
    try {
      const res = await fetch("/api/ai/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer: userAnswer }),
      });
      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error("Error checking answer", error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col gap-8">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Practice Area (Active Recall)</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">1. Select Exercise Type</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setExerciseType("translation")}
              className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-xl font-medium transition-all border ${
                exerciseType === "translation"
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-400"
              }`}
            >
              <FileText className="w-4 h-4" /> Translation
            </button>
            <button
              onClick={() => setExerciseType("cloze")}
              className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-xl font-medium transition-all border ${
                exerciseType === "cloze"
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-400"
              }`}
            >
              <Type className="w-4 h-4" /> Fill in the blank
            </button>
            <button
              onClick={() => setExerciseType("flashcard")}
              className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-xl font-medium transition-all border ${
                exerciseType === "flashcard"
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-400"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Flashcards
            </button>
          </div>
        </div>

        {exerciseType !== "flashcard" && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">2. Select Source</h3>
            <div className="flex gap-4 bg-gray-50 dark:bg-zinc-950 p-2 rounded-2xl border border-gray-200 dark:border-zinc-800">
              <button
                onClick={() => setMode("focus")}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  mode === "focus"
                    ? "bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                Focus Mode (Learned Words)
              </button>
              <button
                onClick={() => setMode("free")}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  mode === "free"
                    ? "bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                Free Mode (Random Topics)
              </button>
            </div>
          </div>
        )}

        <button
          onClick={generateQuestion}
          disabled={isGenerating || (mode === "focus" && words.length === 0)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          Generate Challenge
        </button>
        {mode === "focus" && words.length === 0 && (
          <p className="text-sm text-center mt-3 text-red-500">You need to add some vocabulary first!</p>
        )}
      </div>

      {question && exerciseType === "flashcard" && flashcardWord && (
        <div className="flex flex-col items-center gap-8 perspective-1000">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full max-w-md h-80 relative preserve-3d transition-transform duration-500 cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl shadow-lg flex items-center justify-center p-8 flex-col gap-4">
              <span className="text-sm uppercase tracking-wider text-gray-400 font-bold">What is the meaning?</span>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">{flashcardWord.word}</h2>
              <p className="text-sm text-indigo-500 mt-4 animate-pulse">Click to flip</p>
            </div>
            
            {/* Back */}
            <div 
              className="absolute w-full h-full backface-hidden bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 rounded-3xl shadow-lg flex items-center justify-center p-8 flex-col gap-4"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 text-center">{flashcardWord.meaning}</h2>
              {isFlipped && (
                <div className="flex gap-3 mt-8">
                  <button onClick={(e) => { e.stopPropagation(); generateQuestion(); }} className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold shadow-sm">Forgot</button>
                  <button onClick={(e) => { e.stopPropagation(); generateQuestion(); }} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-sm">Remembered</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {question && exerciseType !== "flashcard" && (
        <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-8 rounded-3xl border border-indigo-100 dark:border-zinc-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-500 mb-2">
              {exerciseType === "translation" ? "Translate to English:" : "Fill in the blank:"}
            </h3>
            <p className="text-2xl font-medium text-gray-800 dark:text-zinc-100">{question}</p>
            {targetWords.length > 0 && exerciseType === "translation" && (
              <p className="text-sm text-gray-500 mt-2">
                Try to use: <span className="font-medium text-indigo-600 dark:text-indigo-400">{targetWords.join(", ")}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={exerciseType === "translation" ? "Type your English translation here..." : "Type the missing word here..."}
              className={`w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${exerciseType === "cloze" ? "min-h-[60px]" : "resize-none min-h-[120px]"} text-lg`}
            />
            <button
              onClick={checkAnswer}
              disabled={isChecking || !userAnswer.trim()}
              className="self-end px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-sm disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Check Answer
            </button>
          </div>
        </div>
      )}

      {feedback && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-green-100 dark:border-green-900/30 shadow-sm">
          <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Feedback
          </h3>
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap font-medium">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
}
