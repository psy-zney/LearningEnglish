import {
  extractDictionaryPronunciation,
  isDictionaryHeadword,
} from "@/lib/pronunciation";

const emptyPronunciation = { phonetic: null, audioUrl: null };

export async function GET(request: Request) {
  const text = new URL(request.url).searchParams.get("text")?.trim() ?? "";
  if (!text || text.length > 64) {
    return Response.json({ error: "Headword is required." }, { status: 400 });
  }

  if (!isDictionaryHeadword(text)) {
    return Response.json(emptyPronunciation);
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(text.toLowerCase())}`,
      {
        cache: "force-cache",
        headers: { Accept: "application/json" },
        next: { revalidate: 604_800 },
        signal: AbortSignal.timeout(4_000),
      },
    );
    if (response.status === 404) return Response.json(emptyPronunciation);
    if (!response.ok) throw new Error(`Dictionary API returned ${response.status}`);

    return Response.json(extractDictionaryPronunciation(await response.json()));
  } catch (error) {
    console.warn("Pronunciation lookup failed; browser speech remains available:", error);
    return Response.json(emptyPronunciation);
  }
}
