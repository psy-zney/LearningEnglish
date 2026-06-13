"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, RefreshCw, Sparkles, BrainCircuit, Type, FileText } from "lucide-react";
import { useSoftReveal } from "@/lib/use-soft-reveal";
import gsap from "gsap";

type Word = {
  id: string;
  word: string;
  meaning: string;
  nextReviewDate?: string;
};

export default function PracticeArea() {
  const pageRef = useSoftReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
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

  const handleMouseEnterCard = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.03,
      rotateX: 4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveCard = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      rotateX: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const fetchWords = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/LearningEnglish";
      const res = await fetch(`${apiUrl}/api/words`);
      const data = await res.json();
      setWords(data);
    } catch (error) {
      console.error("Failed to fetch words", error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    if (isFlipped) {
      gsap.to(cardRef.current, {
        rotateY: 180,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
    } else {
      gsap.to(cardRef.current, {
        rotateY: 0,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
    }
  }, [isFlipped]);

  useEffect(() => {
    if (!feedback || !feedbackRef.current) return;
    
    // Clear any previous animations
    gsap.killTweensOf(feedbackRef.current);
    
    const isCorrect = feedback.includes("✅") || feedback.includes("Chính xác") || feedback.includes("correct") || !feedback.includes("❌");
    
    if (isCorrect) {
      gsap.fromTo(feedbackRef.current, 
        { autoAlpha: 0, y: 20, scale: 0.98 },
        { 
          autoAlpha: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.3)",
          onComplete: () => {
            gsap.to(feedbackRef.current, {
              boxShadow: "0 0 16px rgba(16, 185, 129, 0.35)",
              borderColor: "var(--success)",
              yoyo: true,
              repeat: 1,
              duration: 0.35,
            });
          }
        }
      );
    } else {
      gsap.fromTo(feedbackRef.current, 
        { autoAlpha: 0, y: 20 },
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.35, 
          ease: "power2.out",
          onComplete: () => {
            const tl = gsap.timeline();
            tl.to(feedbackRef.current, { x: -6, duration: 0.05, ease: "none" })
              .to(feedbackRef.current, { x: 6, duration: 0.05, ease: "none" })
              .to(feedbackRef.current, { x: -4, duration: 0.05, ease: "none" })
              .to(feedbackRef.current, { x: 4, duration: 0.05, ease: "none" })
              .to(feedbackRef.current, { x: 0, duration: 0.05, ease: "none" });
          }
        }
      );
    }
  }, [feedback]);

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/LearningEnglish";
      const token = localStorage.getItem("admin_token") || "";
      const res = await fetch(`${apiUrl}/api/ai/practice`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/LearningEnglish";
      const token = localStorage.getItem("admin_token") || "";
      const res = await fetch(`${apiUrl}/api/ai/check`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
    <div ref={pageRef} className="study-page flex flex-col gap-5">
      <section data-reveal>
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--primary-hover)]">Practice</p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight">Train recall</h1>
        <p className="muted mt-2 max-w-2xl">Choose one exercise, generate a prompt, answer, then move on.</p>
      </section>

      <div data-reveal className="study-panel p-5 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="grid size-11 place-items-center rounded-xl bg-[rgba(99,102,241,0.12)] text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Daily exercise</h2>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--muted-2)]">Exercise type</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setExerciseType("translation")}
              className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-xl font-medium transition-all border ${
                exerciseType === "translation"
                  ? "border-[var(--primary)] bg-[rgba(99,102,241,0.12)] text-[var(--foreground)] ring-1 ring-[var(--primary)]/30"
                  : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--panel-soft)]"
              }`}
            >
              <FileText className="w-4 h-4" /> Translation
            </button>
            <button
              onClick={() => setExerciseType("cloze")}
              className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-xl font-medium transition-all border ${
                exerciseType === "cloze"
                  ? "border-[var(--primary)] bg-[rgba(99,102,241,0.12)] text-[var(--foreground)] ring-1 ring-[var(--primary)]/30"
                  : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--panel-soft)]"
              }`}
            >
              <Type className="w-4 h-4" /> Fill in the blank
            </button>
            <button
              onClick={() => setExerciseType("flashcard")}
              className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-xl font-medium transition-all border ${
                exerciseType === "flashcard"
                  ? "border-[var(--primary)] bg-[rgba(99,102,241,0.12)] text-[var(--foreground)] ring-1 ring-[var(--primary)]/30"
                  : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--panel-soft)]"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Flashcards
            </button>
          </div>
        </div>

        {exerciseType !== "flashcard" && (
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--muted-2)]">Source</h3>
            <div className="flex gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2">
              <button
                onClick={() => setMode("focus")}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  mode === "focus"
                    ? "bg-[var(--panel-soft)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Focus Mode (Learned Words)
              </button>
              <button
                onClick={() => setMode("free")}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  mode === "free"
                    ? "bg-[var(--panel-soft)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
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
          className="btn-primary w-full py-4 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          Generate Challenge
        </button>
        {mode === "focus" && words.length === 0 && (
          <p className="mt-3 text-center text-sm text-[var(--danger)]">Add vocabulary first.</p>
        )}
      </div>

      {question && exerciseType === "flashcard" && flashcardWord && (
        <div data-reveal className="flex flex-col items-center gap-8 perspective-1000">
          <div 
            ref={cardRef}
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseEnter={handleMouseEnterCard}
            onMouseLeave={handleMouseLeaveCard}
            className="relative h-80 w-full max-w-md cursor-pointer preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="study-panel absolute flex h-full w-full backface-hidden flex-col items-center justify-center gap-4 p-8">
              <span className="text-sm font-bold uppercase tracking-wide text-[var(--muted-2)]">Meaning?</span>
              <h2 className="text-center text-4xl font-extrabold text-[var(--foreground)]">{flashcardWord.word}</h2>
              <p className="mt-4 text-sm text-[var(--primary)] animate-pulse">Click to flip</p>
            </div>
            
            {/* Back */}
            <div 
              className="study-panel absolute flex h-full w-full backface-hidden flex-col items-center justify-center gap-4 border-[var(--primary)] p-8"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <h2 className="text-center text-3xl font-extrabold text-[var(--foreground)]">{flashcardWord.meaning}</h2>
              {isFlipped && (
                <div className="flex gap-3 mt-8">
                  <button onClick={(e) => { e.stopPropagation(); generateQuestion(); }} className="btn-quiet">Forgot</button>
                  <button onClick={(e) => { e.stopPropagation(); generateQuestion(); }} className="btn-primary">Remembered</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {question && exerciseType !== "flashcard" && (
        <div data-reveal className="study-panel p-5 md:p-6">
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--primary)]">
              {exerciseType === "translation" ? "Translate to English:" : "Fill in the blank:"}
            </h3>
            <p className="text-2xl font-semibold leading-snug">{question}</p>
            {targetWords.length > 0 && exerciseType === "translation" && (
              <p className="text-sm text-gray-500 mt-2">
                Try to use: <span className="font-semibold text-[var(--primary)]">{targetWords.join(", ")}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={exerciseType === "translation" ? "Type your English translation here..." : "Type the missing word here..."}
              className={`study-input ${exerciseType === "cloze" ? "min-h-[60px]" : "min-h-[120px] resize-none"} text-lg`}
            />
            <button
              onClick={checkAnswer}
              disabled={isChecking || !userAnswer.trim()}
              className="btn-primary self-end disabled:opacity-50"
            >
              {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Check Answer
            </button>
          </div>
        </div>
      )}

      {feedback && (
        <div ref={feedbackRef} data-reveal className="study-panel p-5 md:p-6 border border-[var(--border)]">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--success)]">
            <Sparkles className="w-5 h-5" />
            AI Feedback
          </h3>
          <div className="max-w-none whitespace-pre-wrap font-medium leading-relaxed text-[var(--foreground)]">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
}
