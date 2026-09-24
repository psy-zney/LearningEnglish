"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Volume1,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Play,
  Square,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Trash2,
  MessageSquare,
  Headphones,
  Award,
  Zap,
  ArrowRight,
  BookOpen,
  User,
  Bot,
  RefreshCw,
  Sliders,
} from "lucide-react";
import {
  shadowingSentences,
  shadowingDialogues,
  type ShadowingSentence,
  type ShadowingDialogue,
  type DialogueLine,
} from "@/data/shadowing-data";
import { evaluateSpokenText, type SpeechEvaluationResult } from "@/lib/speech-diff";

// Storage keys
const CUSTOM_DIALOGUES_KEY = "toeic_custom_dialogues_v1";
const SHADOWING_PROGRESS_KEY = "toeic_shadowing_history_v1";

type ActiveTab = "sentence" | "dialogue" | "builder";

export function ShadowingStudio() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("sentence");

  // ═════════════════════════════════════════════════════════════════
  // TAB 1: SENTENCE SHADOWING STATE
  // ═════════════════════════════════════════════════════════════════
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [isPlayingTTS, setIsPlayingTTS] = useState<"normal" | "slow" | null>(null);

  // Recording & Evaluation state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>("");
  const [evaluation, setEvaluation] = useState<SpeechEvaluationResult | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // ═════════════════════════════════════════════════════════════════
  // TAB 2: DIALOGUE ROLE-PLAY STATE
  // ═════════════════════════════════════════════════════════════════
  const [customDialogues, setCustomDialogues] = useState<ShadowingDialogue[]>([]);
  const allDialogues = [...shadowingDialogues, ...customDialogues];
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>(shadowingDialogues[0].id);
  const [userRole, setUserRole] = useState<"A" | "B">("B"); // Default play as speaker B
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [dialogueLineResults, setDialogueLineResults] = useState<Record<number, SpeechEvaluationResult>>({});
  const [autoAdvancePartner, setAutoAdvancePartner] = useState(true);
  const [isDialogueCompleted, setIsDialogueCompleted] = useState(false);

  // ═════════════════════════════════════════════════════════════════
  // TAB 3: DIALOGUE BUILDER STATE
  // ═════════════════════════════════════════════════════════════════
  const [isGeneratingAI, startGeneratingAITransition] = useTransition();
  const [aiTopicInput, setAiTopicInput] = useState("");
  const [builderTitleVi, setBuilderTitleVi] = useState("");
  const [builderTitleEn, setBuilderTitleEn] = useState("");
  const [builderScenario, setBuilderScenario] = useState("");
  const [builderSpeakerA, setBuilderSpeakerA] = useState({ name: "Alex", role: "Manager" });
  const [builderSpeakerB, setBuilderSpeakerB] = useState({ name: "Chris", role: "Associate" });
  const [builderLines, setBuilderLines] = useState<DialogueLine[]>([
    {
      speaker: "A",
      speakerName: "Alex",
      role: "Manager",
      en: "Good morning! How is the quarterly financial report coming along?",
      vi: "Chào buổi sáng! Báo cáo tài chính quý đang tiến triển thế nào rồi?",
      linkingTips: "Nối âm: 'Good morning' /ɡʊd ˈmɔːr.nɪŋ/, 'coming along' /kʌmɪŋ əlɑːŋ/.",
    },
    {
      speaker: "B",
      speakerName: "Chris",
      role: "Associate",
      en: "Good morning Alex. I have finalized all the expense tables, and I will share them by noon.",
      vi: "Chào buổi sáng Alex. Tôi đã hoàn tất tất cả bảng chi phí và sẽ chia sẻ trước buổi trưa.",
      linkingTips: "Nhấn âm các từ khóa: 'finalized', 'expense tables', 'noon'.",
    },
  ]);
  const [builderSuccessMessage, setBuilderSuccessMessage] = useState<string | null>(null);

  // Load custom dialogues from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CUSTOM_DIALOGUES_KEY);
        if (saved) {
          setCustomDialogues(JSON.parse(saved));
        }
      } catch {
        // ignore JSON parse error
      }
    }
  }, []);

  // Filtered sentences
  const topics = ["All", ...Array.from(new Set(shadowingSentences.map((s) => s.topic)))];
  const filteredSentences =
    selectedTopic === "All"
      ? shadowingSentences
      : shadowingSentences.filter((s) => s.topic === selectedTopic);

  const currentSentence = filteredSentences[sentenceIndex] || filteredSentences[0];

  // Reset sentence state when changing sentence
  useEffect(() => {
    stopAllAudio();
    setSpokenTranscript("");
    setEvaluation(null);
    setRecordedAudioUrl(null);
    setMicError(null);
  }, [sentenceIndex, selectedTopic]);

  // Clean up audio & speech on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  function stopAllAudio() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingTTS(null);
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      userAudioPlayerRef.current = null;
    }
    setIsPlayingUserAudio(false);
    stopRecording();
  }

  // ═════════════════════════════════════════════════════════════════
  // AUDIO & SPEECH SYNTHESIS (TTS)
  // ═════════════════════════════════════════════════════════════════
  function speakEnglish(text: string, rate: number = 1.0, onEndCallback?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ tính năng phát âm giọng nói (SpeechSynthesis).");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;

    // Pick best natural US voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.toLowerCase() === "en-us" && !v.name.includes("Google") === false) ||
      voices.find((v) => v.lang.toLowerCase() === "en-us") ||
      voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setIsPlayingTTS(null);
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      setIsPlayingTTS(null);
    };

    setIsPlayingTTS(rate < 0.9 ? "slow" : "normal");
    window.speechSynthesis.speak(utterance);
  }

  // ═════════════════════════════════════════════════════════════════
  // MICROPHONE RECORDING & SPEECH RECOGNITION
  // ═════════════════════════════════════════════════════════════════
  async function startRecording(targetSentence: string, onEvaluated?: (res: SpeechEvaluationResult) => void) {
    setMicError(null);
    setSpokenTranscript("");
    setEvaluation(null);
    setRecordedAudioUrl(null);

    // 1. Setup Web Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicError(
        "Trình duyệt này không hỗ trợ Speech Recognition. Bạn hãy sử dụng Google Chrome hoặc Edge để có trải nghiệm nhận diện giọng nói tốt nhất.",
      );
    }

    try {
      // 2. Setup Audio MediaRecorder (to capture learner's actual voice)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      // 3. Start speech recognition if supported
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = true;

        let finalTranscript = "";

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          finalTranscript = currentTranscript;
          setSpokenTranscript(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition notice:", event.error);
          if (event.error === "not-allowed") {
            setMicError("Microphone đã bị chặn. Vui lòng cho phép trình duyệt truy cập micro.");
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
          // Evaluate when user finishes speaking
          if (finalTranscript.trim()) {
            const evalResult = evaluateSpokenText(targetSentence, finalTranscript);
            setEvaluation(evalResult);
            if (onEvaluated) onEvaluated(evalResult);
          } else {
            const emptyResult = evaluateSpokenText(targetSentence, "");
            setEvaluation(emptyResult);
            if (onEvaluated) onEvaluated(emptyResult);
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      }

      setIsRecording(true);
    } catch (err: any) {
      console.error("Mic access error:", err);
      setMicError("Không thể kích hoạt micro. Vui lòng kiểm tra quyền micro trên trình duyệt.");
      setIsRecording(false);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // already stopped
      }
    }
    setIsRecording(false);
  }

  function playRecordedAudio() {
    if (!recordedAudioUrl) return;
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = () => setIsPlayingUserAudio(false);
    setIsPlayingUserAudio(true);
    audio.play();
  }

  // ═════════════════════════════════════════════════════════════════
  // TAB 2: DIALOGUE ROLE-PLAY LOGIC
  // ═════════════════════════════════════════════════════════════════
  const currentDialogue = allDialogues.find((d) => d.id === selectedDialogueId) || allDialogues[0];
  const activeLine = currentDialogue.lines[currentLineIndex];
  const isUserTurn = activeLine?.speaker === userRole;

  function selectDialogue(id: string) {
    stopAllAudio();
    setSelectedDialogueId(id);
    setCurrentLineIndex(0);
    setDialogueLineResults({});
    setIsDialogueCompleted(false);
  }

  function switchUserRole(role: "A" | "B") {
    stopAllAudio();
    setUserRole(role);
    setCurrentLineIndex(0);
    setDialogueLineResults({});
    setIsDialogueCompleted(false);
  }

  // Auto play partner speech when it is partner's turn
  useEffect(() => {
    if (activeTab !== "dialogue") return;
    if (isDialogueCompleted) return;

    if (!isUserTurn && activeLine && autoAdvancePartner) {
      const timer = setTimeout(() => {
        speakEnglish(activeLine.en, 1.0, () => {
          // Once partner has finished speaking, advance after a short pause if not the end
          if (currentLineIndex < currentDialogue.lines.length - 1) {
            setTimeout(() => {
              setCurrentLineIndex((prev) => prev + 1);
            }, 600);
          } else {
            setIsDialogueCompleted(true);
          }
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, isUserTurn, autoAdvancePartner, activeTab, selectedDialogueId]);

  function handleDialogueEvaluation(result: SpeechEvaluationResult) {
    setDialogueLineResults((prev) => ({
      ...prev,
      [currentLineIndex]: result,
    }));

    // If score is >= 60% or user made an earnest attempt, advance after 1.5s
    if (result.score >= 50) {
      setTimeout(() => {
        if (currentLineIndex < currentDialogue.lines.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
        } else {
          setIsDialogueCompleted(true);
        }
      }, 1200);
    }
  }

  function skipDialogueLine() {
    if (currentLineIndex < currentDialogue.lines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      setIsDialogueCompleted(true);
    }
  }

  // ═════════════════════════════════════════════════════════════════
  // TAB 3: DIALOGUE BUILDER ACTIONS
  // ═════════════════════════════════════════════════════════════════
  async function generateDialogueWithAI() {
    if (!aiTopicInput.trim()) return;
    setBuilderSuccessMessage(null);

    startGeneratingAITransition(async () => {
      try {
        const res = await fetch("/api/ai/dialogue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: aiTopicInput.trim() }),
        });

        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        const dlg: ShadowingDialogue = data.dialogue;

        if (dlg && dlg.lines) {
          setBuilderTitleVi(dlg.titleVi);
          setBuilderTitleEn(dlg.titleEn);
          setBuilderScenario(dlg.scenario);
          setBuilderSpeakerA(dlg.speakerA);
          setBuilderSpeakerB(dlg.speakerB);
          setBuilderLines(dlg.lines);
          setBuilderSuccessMessage(
            `Đã tạo thành công hội thoại với ${dlg.lines.length} lượt thoại! Bạn có thể chỉnh sửa bên dưới hoặc lưu lại để luyện tập.`,
          );
        }
      } catch (err) {
        console.error("Failed AI generation:", err);
        setBuilderSuccessMessage(
          "Không thể kết nối dịch vụ AI. Đã kích hoạt mẫu hội thoại thông minh để bạn chỉnh sửa.",
        );
      }
    });
  }

  function addBuilderLine() {
    const nextSpeaker = builderLines.length % 2 === 0 ? "A" : "B";
    const speakerInfo = nextSpeaker === "A" ? builderSpeakerA : builderSpeakerB;

    setBuilderLines((prev) => [
      ...prev,
      {
        speaker: nextSpeaker,
        speakerName: speakerInfo.name,
        role: speakerInfo.role,
        en: "Please type the English sentence here.",
        vi: "Vui lòng nhập nghĩa tiếng Việt ở đây.",
        linkingTips: "Gợi ý nối âm và trọng âm.",
      },
    ]);
  }

  function removeBuilderLine(index: number) {
    setBuilderLines((prev) => prev.filter((_, i) => i !== index));
  }

  function updateBuilderLine(index: number, field: keyof DialogueLine, value: string) {
    setBuilderLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line)),
    );
  }

  function saveCustomDialogue() {
    if (!builderTitleVi.trim() || !builderTitleEn.trim() || builderLines.length < 2) {
      alert("Vui lòng điền tiêu đề và ít nhất 2 câu thoại trước khi lưu.");
      return;
    }

    const newDialogue: ShadowingDialogue = {
      id: `custom-${Date.now()}`,
      titleVi: builderTitleVi.trim(),
      titleEn: builderTitleEn.trim(),
      scenario: builderScenario.trim() || "Tình huống giao tiếp do bạn tự khởi tạo.",
      speakerA: builderSpeakerA,
      speakerB: builderSpeakerB,
      lines: builderLines,
    };

    const updated = [...customDialogues, newDialogue];
    setCustomDialogues(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(CUSTOM_DIALOGUES_KEY, JSON.stringify(updated));
    }

    // Switch to dialogue tab and select the newly created dialogue!
    setSelectedDialogueId(newDialogue.id);
    setActiveTab("dialogue");
    setCurrentLineIndex(0);
    setDialogueLineResults({});
    setIsDialogueCompleted(false);
  }

  function deleteCustomDialogue(id: string) {
    const updated = customDialogues.filter((d) => d.id !== id);
    setCustomDialogues(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(CUSTOM_DIALOGUES_KEY, JSON.stringify(updated));
    }
    if (selectedDialogueId === id) {
      setSelectedDialogueId(shadowingDialogues[0].id);
    }
  }

  // ═════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-[var(--shadow-low)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--panel-soft)] text-[var(--muted)] border border-[var(--border)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              TOEIC Speaking & Listening Mastery
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              Phòng Luyện Shadowing & Hội Thoại
            </h1>
            <p className="text-sm md:text-base text-[var(--muted)] max-w-2xl">
              Luyện phát âm chuẩn IPA, làm chủ nối âm (linking), nhịp điệu bản xứ và thực hành
              nhập vai đối thoại công sở tương tác 2 chiều.
            </p>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex bg-[var(--panel-soft)] p-1.5 rounded-xl border border-[var(--border)] shrink-0 self-start md:self-auto">
            <button
              onClick={() => {
                stopAllAudio();
                setActiveTab("sentence");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "sentence"
                  ? "bg-[var(--panel)] text-[var(--foreground)] shadow-sm font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              Luyện từng câu
            </button>
            <button
              onClick={() => {
                stopAllAudio();
                setActiveTab("dialogue");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "dialogue"
                  ? "bg-[var(--panel)] text-[var(--foreground)] shadow-sm font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Hội thoại nhập vai
            </button>
            <button
              onClick={() => {
                stopAllAudio();
                setActiveTab("builder");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "builder"
                  ? "bg-[var(--panel)] text-[var(--foreground)] shadow-sm font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Plus className="w-4 h-4" />
              Tạo hội thoại
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: SENTENCE SHADOWING STUDIO                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "sentence" && (
        <div className="space-y-6">
          {/* Topic selection pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  setSentenceIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedTopic === topic
                    ? "bg-[var(--primary)] text-[var(--primary-ink)] border-[var(--primary)]"
                    : "bg-[var(--panel)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]"
                }`}
              >
                {topic === "All" ? "Tất cả chủ đề" : topic}
              </button>
            ))}
          </div>

          {/* Main Sentence Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 md:p-8 shadow-[var(--shadow-medium)] space-y-6">
            {/* Meta bar */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  {currentSentence.topic}
                </span>
                <span className="text-[var(--muted)]">•</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--panel-soft)] text-[var(--muted)] border border-[var(--border)] font-mono">
                  Câu {sentenceIndex + 1} / {filteredSentences.length}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-medium ${
                    currentSentence.difficulty === 1
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : currentSentence.difficulty === 2
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {currentSentence.difficulty === 1
                    ? "Cơ bản"
                    : currentSentence.difficulty === 2
                      ? "Trung cấp"
                      : "Nâng cao"}
                </span>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSentenceIndex((prev) => Math.max(0, prev - 1))}
                  disabled={sentenceIndex === 0}
                  className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-40 disabled:hover:text-[var(--muted)] transition-colors"
                  title="Câu trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setSentenceIndex((prev) => Math.min(filteredSentences.length - 1, prev + 1))
                  }
                  disabled={sentenceIndex === filteredSentences.length - 1}
                  className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-40 disabled:hover:text-[var(--muted)] transition-colors"
                  title="Câu sau"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Target English Sentence */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-bold text-[var(--muted)] tracking-wider">
                Mẫu chuẩn TOEIC:
              </div>
              <div className="text-xl md:text-2xl font-bold text-[var(--foreground)] leading-relaxed">
                {currentSentence.en}
              </div>

              {/* Phonetic IPA Guide */}
              {currentSentence.phoneticIpa && (
                <div className="text-sm font-mono text-amber-600 dark:text-amber-400 bg-amber-500/5 px-3 py-1.5 rounded-lg inline-block border border-amber-500/20">
                  {currentSentence.phoneticIpa}
                </div>
              )}

              {/* Vietnamese Translation */}
              <p className="text-sm md:text-base text-[var(--muted)] font-medium">
                👉 {currentSentence.vi}
              </p>
            </div>

            {/* Pronunciation & Linking Tip Box */}
            {currentSentence.linkingTips && (
              <div className="rounded-xl p-4 bg-[var(--surface)] border border-[var(--border)] flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase text-[var(--foreground)] tracking-wider">
                    Mẹo phát âm & Nối âm (Linking Sounds)
                  </div>
                  <p className="text-sm text-[var(--muted)]">{currentSentence.linkingTips}</p>
                </div>
              </div>
            )}

            {/* Controls Bar */}
            <div className="pt-2 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
              {/* Audio Listen Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakEnglish(currentSentence.en, 1.0)}
                  disabled={isPlayingTTS !== null || isRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isPlayingTTS === "normal"
                      ? "bg-emerald-600 text-white shadow-md animate-pulse"
                      : "bg-[var(--panel-soft)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--active)]"
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  Nghe chuẩn (1.0x)
                </button>
                <button
                  onClick={() => speakEnglish(currentSentence.en, 0.75)}
                  disabled={isPlayingTTS !== null || isRecording}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isPlayingTTS === "slow"
                      ? "bg-amber-600 text-white shadow-md animate-pulse"
                      : "bg-[var(--panel-soft)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--active)]"
                  }`}
                >
                  <Volume1 className="w-4 h-4 text-amber-500" />
                  Nghe chậm (0.75x)
                </button>
                {isPlayingTTS && (
                  <button
                    onClick={stopAllAudio}
                    className="p-2 rounded-xl text-[var(--muted)] hover:text-red-500 border border-[var(--border)] transition-colors"
                    title="Dừng phát"
                  >
                    <Square className="w-4 h-4 fill-current" />
                  </button>
                )}
              </div>

              {/* Main Record Button */}
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={() => startRecording(currentSentence.en)}
                    disabled={isPlayingTTS !== null}
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                  >
                    <Mic className="w-4 h-4" />
                    Bấm để nói (Record)
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-red-700 text-white font-semibold text-sm shadow-lg ring-4 ring-red-400/30 animate-pulse transition-all"
                  >
                    <MicOff className="w-4 h-4" />
                    Đang nghe... Bấm để dừng
                  </button>
                )}
              </div>
            </div>

            {/* Mic Error Notice */}
            {micError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{micError}</span>
              </div>
            )}

            {/* Realtime / Final Spoken Transcript & Evaluation Box */}
            {(isRecording || evaluation) && (
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase font-bold text-[var(--muted)] tracking-wider">
                    {isRecording ? "Đang nhận diện giọng nói của bạn:" : "Kết quả phát âm của bạn:"}
                  </div>

                  {/* Evaluation Score Badge */}
                  {evaluation && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[var(--muted)]">Độ chuẩn xác:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          evaluation.score >= 90
                            ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                            : evaluation.score >= 75
                              ? "bg-blue-500/15 text-blue-600 border border-blue-500/30"
                              : evaluation.score >= 50
                                ? "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                                : "bg-red-500/15 text-red-600 border border-red-500/30"
                        }`}
                      >
                        {evaluation.score}% ({evaluation.matchedCount}/{evaluation.totalCount} từ)
                      </span>
                    </div>
                  )}
                </div>

                {/* Spoken words highlight diff */}
                {evaluation ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-base md:text-lg font-medium p-3 rounded-lg bg-[var(--panel)] border border-[var(--border)]">
                      {evaluation.words.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded-md transition-colors ${
                            item.status === "matched"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-bold"
                              : item.status === "almost"
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                                : "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 line-through opacity-80"
                          }`}
                          title={
                            item.status === "matched"
                              ? "Phát âm chuẩn xác!"
                              : item.status === "almost"
                                ? `Gần đúng (bạn nói: "${item.spokenWord || ""}")`
                                : "Chưa nhận diện được từ này"
                          }
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>

                    {/* Feedback message */}
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--muted)] font-medium">
                      {evaluation.score >= 75 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      <span>{evaluation.feedbackVi}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-mono text-[var(--foreground)] italic">
                    {spokenTranscript || "Đang lắng nghe..."}
                  </p>
                )}

                {/* Listen back to learner's voice */}
                {recordedAudioUrl && (
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--border)]">
                    <button
                      onClick={playRecordedAudio}
                      disabled={isPlayingUserAudio}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isPlayingUserAudio
                          ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                          : "bg-[var(--panel)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--active)]"
                      }`}
                    >
                      <Headphones className="w-3.5 h-3.5 text-blue-500" />
                      {isPlayingUserAudio ? "Đang phát giọng bạn..." : "Nghe lại giọng của tôi"}
                    </button>

                    <button
                      onClick={() => speakEnglish(currentSentence.en, 1.0)}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--foreground)]"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                      Nghe lại mẫu chuẩn
                    </button>

                    <button
                      onClick={() =>
                        setSentenceIndex((prev) => Math.min(filteredSentences.length - 1, prev + 1))
                      }
                      className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[var(--primary)] text-[var(--primary-ink)] hover:opacity-90 transition-opacity"
                    >
                      Câu tiếp theo <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: DIALOGUE ROLE-PLAY STUDIO                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "dialogue" && (
        <div className="space-y-6">
          {/* Dialogue selector & Role switch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dialogue picker */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Chọn kịch bản hội thoại:
              </label>
              <div className="flex flex-wrap gap-2">
                {allDialogues.map((dlg) => (
                  <button
                    key={dlg.id}
                    onClick={() => selectDialogue(dlg.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      selectedDialogueId === dlg.id
                        ? "bg-[var(--primary)] text-[var(--primary-ink)] border-[var(--primary)] font-semibold shadow-sm"
                        : "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {dlg.titleEn}
                    {dlg.id.startsWith("custom-") && " ⚡"}
                  </button>
                ))}
              </div>
            </div>

            {/* Role switch */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Chọn vai đóng của bạn:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => switchUserRole("A")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    userRole === "A"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-bold"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <div className="text-xs uppercase text-emerald-600 dark:text-emerald-400">
                    Vai {currentDialogue.speakerA.name}
                  </div>
                  <div className="text-xs truncate">{currentDialogue.speakerA.role}</div>
                </button>

                <button
                  onClick={() => switchUserRole("B")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    userRole === "B"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-bold"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <div className="text-xs uppercase text-emerald-600 dark:text-emerald-400">
                    Vai {currentDialogue.speakerB.name}
                  </div>
                  <div className="text-xs truncate">{currentDialogue.speakerB.role}</div>
                </button>
              </div>
            </div>
          </div>

          {/* Scenario Context Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-bold text-[var(--foreground)]">
                  {currentDialogue.titleVi} ({currentDialogue.titleEn})
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--muted)]">
                  <input
                    type="checkbox"
                    checked={autoAdvancePartner}
                    onChange={(e) => setAutoAdvancePartner(e.target.checked)}
                    className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-0"
                  />
                  Tự phát tiếng đối tác
                </label>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[var(--muted)]">
              📌 <strong>Bối cảnh:</strong> {currentDialogue.scenario}
            </p>
          </div>

          {/* Turn-by-Turn Conversation View */}
          <div className="space-y-4">
            {currentDialogue.lines.map((line, idx) => {
              const isPartner = line.speaker !== userRole;
              const isCurrent = idx === currentLineIndex;
              const lineResult = dialogueLineResults[idx];

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? "border-emerald-500 bg-[var(--panel)] shadow-md ring-2 ring-emerald-500/20"
                      : idx < currentLineIndex
                        ? "border-[var(--border)] bg-[var(--panel)]/70 opacity-90"
                        : "border-[var(--border)] bg-[var(--surface)] opacity-50"
                  }`}
                >
                  {/* Speaker Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isPartner
                            ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {line.speaker}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--foreground)]">
                          {line.speakerName}{" "}
                          <span className="font-normal text-[var(--muted)]">({line.role})</span>
                        </span>
                        {!isPartner && (
                          <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                            VAI CỦA BẠN
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {lineResult && (
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            lineResult.score >= 70
                              ? "bg-emerald-500/15 text-emerald-600"
                              : "bg-amber-500/15 text-amber-600"
                          }`}
                        >
                          {lineResult.score}%
                        </span>
                      )}
                      <button
                        onClick={() => speakEnglish(line.en, 1.0)}
                        className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] transition-colors"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* English spoken text */}
                  <div className="text-base md:text-lg font-bold text-[var(--foreground)] leading-relaxed">
                    {line.en}
                  </div>

                  {/* Vietnamese translation */}
                  <div className="text-xs md:text-sm text-[var(--muted)] mt-1">{line.vi}</div>

                  {/* Linking tips */}
                  {line.linkingTips && (
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-mono">
                      💡 {line.linkingTips}
                    </div>
                  )}

                  {/* Active turn action bar for user */}
                  {isCurrent && !isPartner && !isDialogueCompleted && (
                    <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Mic className="w-4 h-4 animate-bounce" />
                        Đến lượt bạn nói! Hãy nhấn Micro và đọc to câu trên:
                      </div>

                      <div className="flex items-center gap-2">
                        {!isRecording ? (
                          <button
                            onClick={() => startRecording(line.en, handleDialogueEvaluation)}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            Đọc câu này
                          </button>
                        ) : (
                          <button
                            onClick={stopRecording}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-700 text-white font-bold text-xs shadow-lg animate-pulse"
                          >
                            <MicOff className="w-3.5 h-3.5" />
                            Đang nghe... Bấm khi nói xong
                          </button>
                        )}

                        <button
                          onClick={skipDialogueLine}
                          className="px-3 py-2 rounded-xl border border-[var(--border)] text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
                          title="Bỏ qua câu này và chuyển tiếp"
                        >
                          Bỏ qua
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active turn action bar for partner (if manual mode) */}
                  {isCurrent && isPartner && !isDialogueCompleted && !autoAdvancePartner && (
                    <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="text-xs text-[var(--muted)]">Lượt nói của đối tác:</span>
                      <button
                        onClick={() =>
                          speakEnglish(line.en, 1.0, () => {
                            if (currentLineIndex < currentDialogue.lines.length - 1) {
                              setCurrentLineIndex((prev) => prev + 1);
                            } else {
                              setIsDialogueCompleted(true);
                            }
                          })
                        }
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Phát tiếng đối tác
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dialogue Completed Celebration Card */}
          {isDialogueCompleted && (
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 p-6 md:p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <Award className="w-12 h-12 text-emerald-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  Chúc mừng! Bạn đã hoàn thành toàn bộ cuộc hội thoại!
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Bạn đã thực hành phản xạ giao tiếp tự nhiên và phát âm rõ ràng trong ngữ cảnh thực
                  tế.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentLineIndex(0);
                    setDialogueLineResults({});
                    setIsDialogueCompleted(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--panel)] border border-[var(--border)] font-semibold text-sm hover:bg-[var(--active)] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Luyện lại từ đầu
                </button>
                <button
                  onClick={() => {
                    switchUserRole(userRole === "A" ? "B" : "A");
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Đổi sang vai còn lại ({userRole === "A" ? "Vai B" : "Vai A"})
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 3: DIALOGUE BUILDER & AI CREATOR                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "builder" && (
        <div className="space-y-8">
          {/* AI Generator Box */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                Tạo nhanh kịch bản hội thoại bằng AI (Ollama Local / Template)
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[var(--muted)]">
              Nhập bất kỳ tình huống thực tế nào bạn muốn luyện tập (ví dụ: &quot;Phỏng vấn xin việc lương
              25 triệu&quot;, &quot;Khiếu nại chuyến bay bị trễ&quot;, &quot;Mua trà sữa và thanh toán thẻ&quot;...).
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Nhập tình huống hội thoại... (vd: Đặt phòng khách sạn view biển 3 đêm)"
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateDialogueWithAI()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button
                onClick={generateDialogueWithAI}
                disabled={isGeneratingAI || !aiTopicInput.trim()}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-ink)] font-bold text-sm shadow hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Đang tạo hội thoại...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    Khởi tạo với AI
                  </>
                )}
              </button>
            </div>

            {builderSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{builderSuccessMessage}</span>
              </div>
            )}
          </div>

          {/* Manual / Editable Dialogue Form */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Chi tiết kịch bản & Lời thoại 2 nhân vật
              </h3>
              <button
                onClick={saveCustomDialogue}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Lưu & Luyện tập ngay
              </button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--muted)]">Tiêu đề tiếng Việt:</label>
                <input
                  type="text"
                  value={builderTitleVi}
                  placeholder="Vd: Đặt phòng khách sạn cao cấp"
                  onChange={(e) => setBuilderTitleVi(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--muted)]">English Title:</label>
                <input
                  type="text"
                  value={builderTitleEn}
                  placeholder="Vd: Luxury Hotel Reservation"
                  onChange={(e) => setBuilderTitleEn(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
            </div>

            {/* Scenario */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--muted)]">Mô tả bối cảnh:</label>
              <input
                type="text"
                value={builderScenario}
                placeholder="Vd: Khách hàng gọi điện đặt phòng trước cho chuyến công tác..."
                onChange={(e) => setBuilderScenario(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Two Speakers Definition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              {/* Speaker A */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                  Nhân vật A:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Tên (vd: Sarah)"
                    value={builderSpeakerA.name}
                    onChange={(e) =>
                      setBuilderSpeakerA((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs text-[var(--foreground)]"
                  />
                  <input
                    type="text"
                    placeholder="Vai trò (vd: Receptionist)"
                    value={builderSpeakerA.role}
                    onChange={(e) =>
                      setBuilderSpeakerA((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs text-[var(--foreground)]"
                  />
                </div>
              </div>

              {/* Speaker B */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Nhân vật B:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Tên (vd: David)"
                    value={builderSpeakerB.name}
                    onChange={(e) =>
                      setBuilderSpeakerB((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs text-[var(--foreground)]"
                  />
                  <input
                    type="text"
                    placeholder="Vai trò (vd: Customer)"
                    value={builderSpeakerB.role}
                    onChange={(e) =>
                      setBuilderSpeakerB((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs text-[var(--foreground)]"
                  />
                </div>
              </div>
            </div>

            {/* Lines List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase text-[var(--muted)] tracking-wider">
                  Danh sách câu thoại ({builderLines.length} câu):
                </div>
                <button
                  onClick={addBuilderLine}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:bg-[var(--active)] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Thêm câu thoại
                </button>
              </div>

              <div className="space-y-3">
                {builderLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <select
                          value={line.speaker}
                          onChange={(e) => {
                            const spk = e.target.value as "A" | "B";
                            const info = spk === "A" ? builderSpeakerA : builderSpeakerB;
                            updateBuilderLine(idx, "speaker", spk);
                            updateBuilderLine(idx, "speakerName", info.name);
                            updateBuilderLine(idx, "role", info.role);
                          }}
                          className="px-2 py-1 rounded-md text-xs font-bold bg-[var(--panel)] border border-[var(--border)] text-[var(--foreground)]"
                        >
                          <option value="A">Nhân vật A ({builderSpeakerA.name})</option>
                          <option value="B">Nhân vật B ({builderSpeakerB.name})</option>
                        </select>
                        <span className="text-xs text-[var(--muted)] font-mono">#{idx + 1}</span>
                      </div>

                      <button
                        onClick={() => removeBuilderLine(idx)}
                        disabled={builderLines.length <= 2}
                        className="p-1 rounded text-[var(--muted)] hover:text-red-500 disabled:opacity-30 transition-colors"
                        title="Xóa câu này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={line.en}
                        placeholder="Câu nói tiếng Anh..."
                        onChange={(e) => updateBuilderLine(idx, "en", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-sm font-semibold text-[var(--foreground)]"
                      />
                      <input
                        type="text"
                        value={line.vi}
                        placeholder="Dịch nghĩa tiếng Việt..."
                        onChange={(e) => updateBuilderLine(idx, "vi", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs text-[var(--muted)]"
                      />
                      <input
                        type="text"
                        value={line.linkingTips || ""}
                        placeholder="Mẹo nối âm / phát âm (tùy chọn)..."
                        onChange={(e) => updateBuilderLine(idx, "linkingTips", e.target.value)}
                        className="w-full px-3 py-1 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs text-amber-600 dark:text-amber-400 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 border-t border-[var(--border)] flex justify-end">
              <button
                onClick={saveCustomDialogue}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Lưu và Bắt đầu Luyện tập
              </button>
            </div>
          </div>

          {/* User Saved Custom Dialogues Manager */}
          {customDialogues.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">
                Hội thoại do bạn đã tạo ({customDialogues.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {customDialogues.map((dlg) => (
                  <div
                    key={dlg.id}
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)] flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-bold text-[var(--foreground)]">
                        {dlg.titleEn}
                      </div>
                      <div className="text-xs text-[var(--muted)]">{dlg.titleVi}</div>
                      <div className="text-[10px] text-[var(--muted-2)] mt-1">
                        {dlg.lines.length} câu thoại • {dlg.speakerA.name} & {dlg.speakerB.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => selectDialogue(dlg.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-ink)]"
                      >
                        Luyện
                      </button>
                      <button
                        onClick={() => deleteCustomDialogue(dlg.id)}
                        className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-500 border border-[var(--border)]"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
