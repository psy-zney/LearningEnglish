"use client";

import { ExternalLink, Volume1, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import {
  buildYouglishUrl,
  isDictionaryHeadword,
  type PronunciationData,
} from "@/lib/pronunciation";

type PlaybackMode = "slow" | "normal" | null;

function displayPhonetic(value: string) {
  return value.startsWith("/") || value.startsWith("[") ? value : `/${value}/`;
}

function preferredEnglishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang.toLowerCase() === "en-us")
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));
}

export function PronunciationControls({ text, compact = false }: { text: string; compact?: boolean }) {
  const [pronunciation, setPronunciation] = useState<PronunciationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playing, setPlaying] = useState<PlaybackMode>(null);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setPronunciation(null);
    setAudioUnavailable(false);

    if (!isDictionaryHeadword(text)) return () => controller.abort();

    setIsLoading(true);
    apiRequest<PronunciationData>(`/api/pronunciation?text=${encodeURIComponent(text)}`, {
      signal: controller.signal,
      timeoutMs: 6_000,
    })
      .then(setPronunciation)
      .catch(() => {
        if (!controller.signal.aborted) setPronunciation({ phonetic: null, audioUrl: null });
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [text]);

  useEffect(() => () => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
  }, []);

  function stopCurrentAudio() {
    audioRef.current?.pause();
    audioRef.current = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function speakWithBrowser(rate: number, mode: Exclude<PlaybackMode, null>) {
    if (!("speechSynthesis" in window)) {
      setAudioUnavailable(true);
      setPlaying(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.voice = preferredEnglishVoice() ?? null;
    utterance.onend = () => setPlaying(null);
    utterance.onerror = () => {
      setAudioUnavailable(true);
      setPlaying(null);
    };
    setPlaying(mode);
    window.speechSynthesis.speak(utterance);
  }

  async function play(rate: number, mode: Exclude<PlaybackMode, null>) {
    stopCurrentAudio();
    setAudioUnavailable(false);
    setPlaying(mode);

    if (pronunciation?.audioUrl) {
      const audio = new Audio(pronunciation.audioUrl);
      audio.playbackRate = rate;
      audio.preservesPitch = true;
      audio.onended = () => setPlaying(null);
      audioRef.current = audio;
      try {
        await audio.play();
        return;
      } catch {
        audioRef.current = null;
      }
    }

    speakWithBrowser(rate, mode);
  }

  return (
    <div className={compact ? "mt-3" : "mt-5"}>
      <div className="flex min-h-6 items-center gap-2 text-sm">
        <span className="font-mono text-[var(--primary)]" aria-live="polite">
          {pronunciation?.phonetic
            ? displayPhonetic(pronunciation.phonetic)
            : isLoading
              ? "Đang tải IPA…"
              : isDictionaryHeadword(text)
                ? "IPA chưa có"
                : "Nghe cả cụm"}
        </span>
        {pronunciation?.phonetic && <span className="text-xs text-[var(--muted-2)]">IPA</span>}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => play(0.68, "slow")}
          className="btn-quiet px-3 py-2 text-xs"
          aria-label={`Nghe chậm: ${text}`}
        >
          <Volume1 className={`size-4 ${playing === "slow" ? "animate-pulse" : ""}`} />
          Chậm 0.7×
        </button>
        <button
          type="button"
          onClick={() => play(1, "normal")}
          className="btn-quiet px-3 py-2 text-xs"
          aria-label={`Nghe tốc độ bình thường: ${text}`}
        >
          <Volume2 className={`size-4 ${playing === "normal" ? "animate-pulse" : ""}`} />
          Bình thường
        </button>
        <a
          href={buildYouglishUrl(text)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-quiet px-3 py-2 text-xs"
          aria-label={`Nghe ${text} trong ngữ cảnh người bản xứ trên YouGlish`}
        >
          <ExternalLink className="size-4" />
          Người bản xứ · YouGlish
        </a>
      </div>

      {audioUnavailable && (
        <p className="mt-2 text-xs text-[var(--danger)]" role="status">
          Trình duyệt chưa có giọng tiếng Anh. Dùng “Người bản xứ” để nghe clip thật.
        </p>
      )}
    </div>
  );
}
