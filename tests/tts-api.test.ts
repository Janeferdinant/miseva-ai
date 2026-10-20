import { describe, it, expect } from "vitest";

describe("TTS API Route (/api/tts)", () => {
  it("should split long text into sentence chunks under 180 characters", async () => {
    // Dynamic import of chunker helper
    const { chunkTextForTts } = await import("../app/api/tts/route");
    const sampleMalayalam =
      "ചുവടുകട്ടിയുള്ള മൺചട്ടിയിൽ ചേനയും പച്ചക്കായയും അരക്കപ്പ് വെള്ളവും മഞ്ഞൾപ്പൊടിയും ഉപ്പും ചേർത്ത് 8 മിനിറ്റ് വേവിക്കുക. ഇതിലേക്ക് അരച്ച തേങ്ങയും ജീരകവും പച്ചമുളകും ചേർത്ത് നന്നായി ഇളക്കുക. തിളച്ചുവരുമ്പോൾ തൈര് ചേർത്ത് തീ അണയ്ക്കുക.";

    const chunks = chunkTextForTts(sampleMalayalam, 150);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(150);
      expect(chunk.trim().length).toBeGreaterThan(0);
    }
  });

  it("should handle short text as a single chunk", async () => {
    const { chunkTextForTts } = await import("../app/api/tts/route");
    const shortText = "നമസ്കാരം, സ്വാഗതം.";
    const chunks = chunkTextForTts(shortText, 150);
    expect(chunks).toEqual([shortText]);
  });
});
