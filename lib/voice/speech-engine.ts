export type LanguageType = "en" | "ml";

export type VoiceCommandType =
  | "NEXT_STEP"
  | "PREV_STEP"
  | "REPEAT"
  | "START_TIMER"
  | "STOP_TIMER"
  | "QUERY_INGREDIENT"
  | "UNKNOWN";

export interface VoiceCommandResult {
  type: VoiceCommandType;
  target?: string;
  rawText?: string;
}

export interface LanguageConfig {
  code: string;
  lang: LanguageType;
  name: string;
  label: string;
  samplePhrase: string;
}

export function getLanguageConfig(lang: LanguageType): LanguageConfig {
  if (lang === "ml") {
    return {
      code: "ml-IN",
      lang: "ml",
      name: "മലയാളം (Malayalam)",
      label: "മലയാളം",
      samplePhrase: "പാചകക്കുറിപ്പുകൾ വായിക്കാൻ തയ്യാറാണ്.",
    };
  }
  return {
    code: "en-IN",
    lang: "en",
    name: "English",
    label: "English",
    samplePhrase: "Ready to guide you step-by-step through cooking.",
  };
}

/**
 * Intelligent parser for voice commands in English and Malayalam transliterations.
 */
export function parseVoiceCommand(transcript: string): VoiceCommandResult {
  const t = transcript.toLowerCase().trim();

  // Next Step commands
  if (
    t.includes("next step") ||
    t.includes("go to next") ||
    t.includes("adutha step") ||
    t.includes("aduthathu") ||
    t.includes("continue") ||
    t.includes("munnottu")
  ) {
    return { type: "NEXT_STEP", rawText: transcript };
  }

  // Previous Step commands
  if (
    t.includes("previous step") ||
    t.includes("go back") ||
    t.includes("munpathe step") ||
    t.includes("purakottu") ||
    t.includes("last step")
  ) {
    return { type: "PREV_STEP", rawText: transcript };
  }

  // Repeat commands
  if (
    t.includes("repeat") ||
    t.includes("read again") ||
    t.includes("veendum parayuka") ||
    t.includes("onnum koodi") ||
    t.includes("say again")
  ) {
    return { type: "REPEAT", rawText: transcript };
  }

  // Timer commands
  if (t.includes("start timer") || t.includes("timer thudanguka") || t.includes("set timer")) {
    return { type: "START_TIMER", rawText: transcript };
  }

  if (t.includes("stop timer") || t.includes("cancel timer") || t.includes("pause timer") || t.includes("timer nirthuka")) {
    return { type: "STOP_TIMER", rawText: transcript };
  }

  // Ingredient amount query (e.g. "how much coconut oil", "ethra ulla")
  if (t.includes("how much") || t.includes("ethra")) {
    const cleaned = t
      .replace("how much", "")
      .replace("ethra", "")
      .replace("do i need", "")
      .replace("venam", "")
      .trim();
    if (cleaned.length > 0) {
      return { type: "QUERY_INGREDIENT", target: cleaned, rawText: transcript };
    }
  }

  return { type: "UNKNOWN", rawText: transcript };
}

/**
 * Speech Synthesis Helper with Malayalam Voice Detection & Fallback
 */
export class SpeechEngine {
  private static synth: SpeechSynthesis | null =
    typeof window !== "undefined" && "speechSynthesis" in window
      ? window.speechSynthesis
      : null;

  public static isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  public static isRecognitionSupported(): boolean {
    return (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    );
  }

  public static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public static findVoice(lang: LanguageType): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (lang === "ml") {
      // Look for Malayalam specifically
      const mlVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes("ml") ||
          v.name.toLowerCase().includes("malayalam")
      );
      if (mlVoice) return mlVoice;

      // Fallback: Indian English voice with accurate phonetics
      const indianVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes("en-in") ||
          v.name.toLowerCase().includes("india")
      );
      if (indianVoice) return indianVoice;
    } else {
      // English voice (prefer Indian English or standard English)
      const enVoice =
        voices.find((v) => v.lang.toLowerCase().includes("en-in")) ||
        voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
        null;
      if (enVoice) return enVoice;
    }
    return voices[0] || null;
  }

  public static speak(
    text: string,
    lang: LanguageType,
    rate: number = 1.0,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): void {
    if (!this.synth) {
      callbacks?.onError?.("Speech synthesis not supported in this environment");
      return;
    }

    this.stop(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.7, Math.min(1.5, rate));
    utterance.pitch = 1.0;

    const voice = this.findVoice(lang);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = lang === "ml" ? "ml-IN" : "en-IN";
    }

    if (callbacks?.onStart) utterance.onstart = callbacks.onStart;
    if (callbacks?.onEnd) utterance.onend = callbacks.onEnd;
    if (callbacks?.onError) utterance.onerror = callbacks.onError;

    this.synth.speak(utterance);
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static pause(): void {
    if (this.synth) {
      this.synth.pause();
    }
  }

  public static resume(): void {
    if (this.synth) {
      this.synth.resume();
    }
  }
}
