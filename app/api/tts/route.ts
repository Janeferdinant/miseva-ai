import { NextRequest, NextResponse } from "next/server";

export function chunkTextForTts(text: string, maxLen = 150): string[] {
  const clean = text.trim();
  if (clean.length <= maxLen) return [clean];

  const chunks: string[] = [];
  // Split along sentence endings, punctuation or commas
  const segments = clean.split(/([.!?:;।,\n]+)/);
  let current = "";

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if ((current + seg).length <= maxLen) {
      current += seg;
    } else {
      if (current.trim().length > 0) {
        chunks.push(current.trim());
      }
      current = seg;
    }
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  // Safety fallback: if any chunk is still longer than maxLen, slice it
  const refinedChunks: string[] = [];
  for (const c of chunks) {
    if (c.length <= maxLen) {
      refinedChunks.push(c);
    } else {
      for (let i = 0; i < c.length; i += maxLen) {
        refinedChunks.push(c.slice(i, i + maxLen));
      }
    }
  }

  return refinedChunks.length > 0 ? refinedChunks : [clean.slice(0, maxLen)];
}

async function fetchGoogleTtsChunk(text: string, lang = "ml"): Promise<Buffer> {
  const targetLang = lang.startsWith("en") ? "en-IN" : lang === "ml" ? "ml" : lang;
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    text
  )}&tl=${targetLang}&client=tw-ob`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://translate.google.com/",
    },
    // Cache on Edge for 7 days
    next: { revalidate: 604800 },
  });

  if (!res.ok) {
    throw new Error(`TTS synthesis upstream error: HTTP ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const text = searchParams.get("text");
    const lang = searchParams.get("lang") || "ml";

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Missing required 'text' query parameter" }, { status: 400 });
    }

    const chunks = chunkTextForTts(text, 150);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      try {
        const buf = await fetchGoogleTtsChunk(chunk, lang);
        audioBuffers.push(buf);
      } catch (err: any) {
        console.error("Failed chunk synthesis:", chunk, err.message);
      }
    }

    if (audioBuffers.length === 0) {
      return NextResponse.json({ error: "Audio synthesis failed for all chunks" }, { status: 502 });
    }

    const combinedAudio = Buffer.concat(audioBuffers);

    return new Response(combinedAudio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": combinedAudio.length.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error: any) {
    console.error("Error in /api/tts:", error);
    return NextResponse.json({ error: "Internal Server Error in TTS synthesis" }, { status: 500 });
  }
}
