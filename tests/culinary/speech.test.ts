import { describe, it, expect } from "vitest";
import { parseVoiceCommand, VoiceCommandType, getLanguageConfig } from "@/lib/voice/speech-engine";

describe("Multilingual Speech Engine & Voice Command Parser", () => {
  it("should provide valid language configurations for English and Malayalam", () => {
    const enConfig = getLanguageConfig("en");
    expect(enConfig.code).toBe("en-IN");
    expect(enConfig.name).toBe("English");

    const mlConfig = getLanguageConfig("ml");
    expect(mlConfig.code).toBe("ml-IN");
    expect(mlConfig.name).toBe("മലയാളം (Malayalam)");
  });

  it("should parse standard hands-free voice commands accurately", () => {
    expect(parseVoiceCommand("next step").type).toBe("NEXT_STEP");
    expect(parseVoiceCommand("adutha step").type).toBe("NEXT_STEP");
    expect(parseVoiceCommand("go to next").type).toBe("NEXT_STEP");

    expect(parseVoiceCommand("previous step").type).toBe("PREV_STEP");
    expect(parseVoiceCommand("munpathe step").type).toBe("PREV_STEP");
    expect(parseVoiceCommand("go back").type).toBe("PREV_STEP");

    expect(parseVoiceCommand("repeat").type).toBe("REPEAT");
    expect(parseVoiceCommand("read again").type).toBe("REPEAT");
    expect(parseVoiceCommand("veendum parayuka").type).toBe("REPEAT");

    expect(parseVoiceCommand("start timer").type).toBe("START_TIMER");
    expect(parseVoiceCommand("timer thudanguka").type).toBe("START_TIMER");

    expect(parseVoiceCommand("stop timer").type).toBe("STOP_TIMER");
  });

  it("should extract ingredient queries from voice commands", () => {
    const res = parseVoiceCommand("how much coconut oil");
    expect(res.type).toBe("QUERY_INGREDIENT");
    expect(res.target?.toLowerCase()).toContain("coconut oil");
  });

  it("should return UNKNOWN for unrecognized phrases", () => {
    expect(parseVoiceCommand("what is the weather today").type).toBe("UNKNOWN");
  });
});
