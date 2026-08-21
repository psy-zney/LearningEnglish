export type PronunciationData = {
  phonetic: string | null;
  audioUrl: string | null;
};

type DictionaryPhonetic = {
  text?: unknown;
  audio?: unknown;
};

type DictionaryEntry = {
  phonetic?: unknown;
  phonetics?: unknown;
};

const TRUSTED_AUDIO_HOSTS = new Set(["api.dictionaryapi.dev", "ssl.gstatic.com"]);

export function isDictionaryHeadword(value: string): boolean {
  const word = value.trim();
  return word.length <= 64 && /^[A-Za-z]+(?:['’-][A-Za-z]+)*$/.test(word);
}

function normalizeAudioUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const candidate = value.startsWith("//") ? `https:${value}` : value;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && TRUSTED_AUDIO_HOSTS.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function extractDictionaryPronunciation(payload: unknown): PronunciationData {
  if (!Array.isArray(payload)) return { phonetic: null, audioUrl: null };

  for (const rawEntry of payload) {
    if (!rawEntry || typeof rawEntry !== "object") continue;
    const entry = rawEntry as DictionaryEntry;
    const phonetics = Array.isArray(entry.phonetics)
      ? entry.phonetics.filter((item): item is DictionaryPhonetic => Boolean(item) && typeof item === "object")
      : [];
    const phonetic = typeof entry.phonetic === "string" && entry.phonetic.trim()
      ? entry.phonetic.trim()
      : phonetics.find((item) => typeof item.text === "string" && item.text.trim())?.text;
    const audioUrl = phonetics
      .map((item) => normalizeAudioUrl(item.audio))
      .find((value): value is string => Boolean(value)) ?? null;

    if (phonetic || audioUrl) {
      return {
        phonetic: typeof phonetic === "string" ? phonetic : null,
        audioUrl,
      };
    }
  }

  return { phonetic: null, audioUrl: null };
}

export function buildYouglishUrl(text: string): string {
  return `https://youglish.com/pronounce/${encodeURIComponent(text.trim())}/english/us`;
}
