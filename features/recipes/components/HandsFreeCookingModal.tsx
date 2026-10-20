"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  X,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Volume2,
  Sparkles,
  Timer as TimerIcon,
} from "lucide-react";
import { CookingStep, Recipe } from "@/lib/types/recipe";
import {
  SpeechEngine,
  parseVoiceCommand,
  LanguageType,
} from "@/lib/voice/speech-engine";

interface HandsFreeCookingModalProps {
  recipe: Recipe;
  initialStepIndex?: number;
  onClose: () => void;
}

export function HandsFreeCookingModal({
  recipe,
  initialStepIndex = 0,
  onClose,
}: HandsFreeCookingModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
  const [isListening, setIsListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [lang, setLang] = useState<LanguageType>("en");
  const [timerLeft, setTimerLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const steps = recipe.instructions;
  const currentStep = steps[currentStepIndex];

  // Speech Recognition setup
  useEffect(() => {
    let recognition: any = null;

    if (
      isListening &&
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRec =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = lang === "ml" ? "ml-IN" : "en-IN";

      recognition.onresult = (event: any) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setLastTranscript(transcript);
        handleVoiceCommand(transcript);
      };

      recognition.onerror = () => {
        // Keep listening unless user stopped
      };

      try {
        recognition.start();
      } catch {}
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening, lang, currentStepIndex]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerLeft !== null && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((t) => (t !== null && t > 0 ? t - 1 : 0));
      }, 1000);
    } else if (timerLeft === 0) {
      setIsTimerRunning(false);
      SpeechEngine.speak(
        lang === "ml" ? "സമയം പൂർത്തിയായി!" : "Cooking timer completed!",
        lang
      );
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerLeft, lang]);

  const handleVoiceCommand = (transcript: string) => {
    const cmd = parseVoiceCommand(transcript);
    switch (cmd.type) {
      case "NEXT_STEP":
        if (currentStepIndex < steps.length - 1) {
          const next = currentStepIndex + 1;
          setCurrentStepIndex(next);
          setLastAction("Advancing to next step");
          speakStep(next);
        }
        break;
      case "PREV_STEP":
        if (currentStepIndex > 0) {
          const prev = currentStepIndex - 1;
          setCurrentStepIndex(prev);
          setLastAction("Returning to previous step");
          speakStep(prev);
        }
        break;
      case "REPEAT":
        setLastAction("Repeating current step");
        speakStep(currentStepIndex);
        break;
      case "START_TIMER":
        if (currentStep.timerMinutes) {
          setTimerLeft(currentStep.timerMinutes * 60);
          setIsTimerRunning(true);
          setLastAction(`Started ${currentStep.timerMinutes} minute timer`);
        }
        break;
      case "STOP_TIMER":
        setIsTimerRunning(false);
        setLastAction("Paused timer");
        break;
      case "QUERY_INGREDIENT":
        setLastAction(`Looked up ingredient: ${cmd.target}`);
        break;
      default:
        setLastAction(`Heard: "${transcript}"`);
    }
  };

  const speakStep = (index: number) => {
    const step = steps[index];
    const text = lang === "ml" ? step.textMalayalam : step.text;
    const prefix = lang === "ml" ? `ഘട്ടം ${step.stepNumber}. ` : `Step ${step.stepNumber}. `;
    SpeechEngine.speak(`${prefix}${text}`, lang);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col justify-between rounded-3xl glass-panel border border-brand-primary/40 shadow-2xl p-6 sm:p-10 relative overflow-y-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                Hands-Free Cooking Studio
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {recipe.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ml" : "en")}
              className="px-3 py-1.5 rounded-xl glass-card text-xs font-bold text-white hover:border-brand-primary"
            >
              {lang === "en" ? "മലയാളം Narration" : "English Narration"}
            </button>
            <button
              onClick={() => {
                SpeechEngine.stop();
                onClose();
              }}
              className="p-2 rounded-xl glass-card text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="my-6">
          <div className="flex items-center justify-between text-sm font-bold text-white/70 mb-2">
            <span>
              Step {currentStep.stepNumber} of {steps.length}
            </span>
            <span className="text-brand-primary font-mono">
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Giant Cooking Step Card */}
        <div className="my-4 p-6 sm:p-8 rounded-2xl glass-card border-brand-primary/30 bg-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentStep.title}
            </h3>
            {currentStep.timerMinutes && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm">
                <TimerIcon className="w-4 h-4" />
                <span>{currentStep.timerMinutes} mins</span>
              </div>
            )}
          </div>

          <p className="text-lg sm:text-xl text-white/95 leading-relaxed font-medium">
            {currentStep.text}
          </p>

          <p className="text-base sm:text-lg text-emerald-300 lang-ml leading-relaxed font-semibold">
            {currentStep.textMalayalam}
          </p>

          {currentStep.tip && (
            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-sm">
              <span className="font-bold">Pro Tip: </span>
              {currentStep.tip}
            </div>
          )}

          {/* Active Timer Box if applicable */}
          {currentStep.timerMinutes && (
            <div className="mt-4 p-4 rounded-xl glass-panel flex items-center justify-between border-amber-500/30">
              <div className="flex items-center gap-3">
                <TimerIcon className="w-6 h-6 text-amber-400" />
                <span className="text-2xl font-black font-mono text-white">
                  {formatTimer(timerLeft ?? currentStep.timerMinutes * 60)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs"
                >
                  {isTimerRunning ? "Pause" : "Start Timer"}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerLeft(currentStep.timerMinutes! * 60);
                  }}
                  className="p-2 rounded-xl glass-card text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Voice Assistant Status Bar */}
        <div className="my-3 p-3.5 rounded-2xl glass-card border-brand-primary/20 flex flex-wrap items-center justify-between gap-3 bg-brand-primary/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-3 rounded-full transition-all ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              title={isListening ? "Stop Voice Recognition" : "Activate Hands-Free Mic"}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                <span>
                  {isListening
                    ? "Hands-free voice recognition active..."
                    : "Tap mic to activate hands-free listening"}
                </span>
              </div>
              <div className="text-[11px] text-white/60">
                Commands: “Next step”, “Previous step”, “Repeat”, “Start timer”
              </div>
            </div>
          </div>

          {lastAction && (
            <div className="text-xs font-mono px-3 py-1 rounded-lg bg-black/40 text-emerald-300 border border-emerald-500/30">
              {lastAction}
            </div>
          )}
        </div>

        {/* Large Navigation Controls */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              if (currentStepIndex > 0) {
                const prev = currentStepIndex - 1;
                setCurrentStepIndex(prev);
                speakStep(prev);
              }
            }}
            disabled={currentStepIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl glass-card text-white font-bold text-sm disabled:opacity-30 hover:border-brand-primary"
          >
            <Rewind className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => speakStep(currentStepIndex)}
            className="px-6 py-3.5 rounded-2xl glass-button text-white font-bold text-sm flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            <span>Read Step</span>
          </button>

          <button
            onClick={() => {
              if (currentStepIndex < steps.length - 1) {
                const next = currentStepIndex + 1;
                setCurrentStepIndex(next);
                speakStep(next);
              }
            }}
            disabled={currentStepIndex === steps.length - 1}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl glass-button text-white font-bold text-sm disabled:opacity-30"
          >
            <span>Next</span>
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
