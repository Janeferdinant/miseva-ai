"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Timer as TimerIcon,
  Languages,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CookingStep } from "@/lib/types/recipe";
import { SpeechEngine, LanguageType, getLanguageConfig } from "@/lib/voice/speech-engine";

interface AudioNarrationPlayerProps {
  steps: CookingStep[];
  recipeTitle: string;
}

export function AudioNarrationPlayer({ steps, recipeTitle }: AudioNarrationPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [narrationLang, setNarrationLang] = useState<LanguageType>("en");
  const [speed, setSpeed] = useState<number>(1.0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(true);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    setHasVoiceSupport(SpeechEngine.isSupported());
    return () => {
      SpeechEngine.stop();
    };
  }, []);

  // Timer countdown hook
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSecondsLeft === 0) {
      setIsTimerRunning(false);
      // Play timer completion alert
      if (!isMuted) {
        SpeechEngine.speak(
          narrationLang === "ml"
            ? "സമയം കഴിഞ്ഞു! അടുത്ത ഘട്ടത്തിലേക്ക് കടക്കാം."
            : "Timer finished! You can proceed to the next cooking step.",
          narrationLang
        );
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft, isMuted, narrationLang]);

  const speakCurrentStep = () => {
    if (!hasVoiceSupport || isMuted) return;

    const text = narrationLang === "ml" ? currentStep.textMalayalam : currentStep.text;
    const title = narrationLang === "ml" ? `ഘട്ടം ${currentStep.stepNumber}` : `Step ${currentStep.stepNumber}: ${currentStep.title}`;
    const fullNarration = `${title}. ${text}`;

    setIsPlaying(true);
    SpeechEngine.speak(fullNarration, narrationLang, speed, {
      onStart: () => {
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
      },
      onError: () => {
        setIsPlaying(false);
      },
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      SpeechEngine.stop();
      setIsPlaying(false);
    } else {
      speakCurrentStep();
    }
  };

  const handleStop = () => {
    SpeechEngine.stop();
    setIsPlaying(false);
  };

  const handleStepChange = (index: number) => {
    handleStop();
    setCurrentStepIndex(index);
    if (steps[index]?.timerMinutes) {
      setTimerSecondsLeft(steps[index].timerMinutes * 60);
      setIsTimerRunning(false);
    } else {
      setTimerSecondsLeft(null);
      setIsTimerRunning(false);
    }
  };

  const toggleLanguage = () => {
    handleStop();
    setNarrationLang((prev) => (prev === "en" ? "ml" : "en"));
  };

  const cycleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 1.25 : speed === 1.25 ? 0.75 : 1.0;
    setSpeed(nextSpeed);
    if (isPlaying) {
      handleStop();
      setTimeout(speakCurrentStep, 100);
    }
  };

  const startTimer = () => {
    if (currentStep.timerMinutes && timerSecondsLeft === null) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
    }
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    if (currentStep.timerMinutes) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
    } else {
      setTimerSecondsLeft(null);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-6 shadow-glass border border-glass-border">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-glass-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
            <Volume2 className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {narrationLang === "ml" ? "വോയ്‌സ് ഗൈഡഡ് പാചകം" : "Voice-Guided Step Narration"}
            </h4>
            <div className="text-[11px] text-foreground/60">
              {narrationLang === "ml"
                ? "മലയാളം ശബ്ദ വിവരണം & കരോക്കെ"
                : "Multilingual audio transcription with interactive timers"}
            </div>
          </div>
        </div>

        {/* Controls: Language + Speed + Mute */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl glass-card text-xs font-semibold hover:border-brand-primary transition-colors text-foreground"
            title="Toggle Narration Language"
          >
            <Languages className="w-3.5 h-3.5 text-brand-primary" />
            <span>{narrationLang === "en" ? "English" : "മലയാളം"}</span>
          </button>

          {/* Speed Button */}
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl glass-card text-xs font-semibold hover:border-brand-primary transition-colors text-foreground"
            title="Playback Speed"
          >
            <FastForward className="w-3 h-3 text-brand-accent" />
            <span>{speed}x</span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={() => {
              if (isPlaying) handleStop();
              setIsMuted(!isMuted);
            }}
            className="p-1.5 rounded-xl glass-card hover:border-brand-primary transition-colors text-foreground/80 hover:text-foreground"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Voice Support Notice */}
      {!hasVoiceSupport && (
        <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Speech synthesis is not supported on this browser. Full written transcripts remain available.</span>
        </div>
      )}

      {/* Step Scrubber / Progress Pills */}
      <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step, idx) => (
          <button
            key={step.stepNumber}
            onClick={() => handleStepChange(idx)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              currentStepIndex === idx
                ? "bg-brand-primary text-white shadow-md scale-105"
                : idx < currentStepIndex
                ? "bg-brand-primary/20 text-brand-primary"
                : "glass-card text-foreground/70 hover:text-foreground"
            }`}
          >
            {idx < currentStepIndex && <CheckCircle2 className="w-3 h-3" />}
            <span>Step {step.stepNumber}</span>
          </button>
        ))}
      </div>

      {/* Current Step Active Card */}
      <div className="mt-4 p-4 sm:p-5 rounded-xl glass-card border-brand-primary/30 relative overflow-hidden bg-brand-primary/5">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-primary uppercase tracking-wider mb-1">
          <span>
            {narrationLang === "ml"
              ? `ഘട്ടം ${currentStep.stepNumber} / ${steps.length}`
              : `Step ${currentStep.stepNumber} of ${steps.length}`}
          </span>
          {currentStep.timerMinutes && (
            <span className="flex items-center gap-1 text-amber-400 font-bold lowercase">
              <TimerIcon className="w-3.5 h-3.5" />
              {currentStep.timerMinutes} mins
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {currentStep.title}
        </h3>

        {/* Bilingual Instruction Display with Karaoke Highlight */}
        <div className="mt-3 space-y-2">
          <p
            className={`text-sm sm:text-base leading-relaxed transition-colors ${
              isPlaying && narrationLang === "en"
                ? "text-brand-primary font-medium"
                : "text-foreground/90"
            }`}
          >
            {currentStep.text}
          </p>

          <p
            className={`text-sm sm:text-base leading-relaxed lang-ml transition-colors ${
              isPlaying && narrationLang === "ml"
                ? "text-brand-primary font-semibold"
                : "text-foreground/75 font-medium"
            }`}
          >
            {currentStep.textMalayalam}
          </p>

          {currentStep.tip && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              <span className="font-bold">Chef Tip: </span>
              {currentStep.tip}
            </div>
          )}
        </div>

        {/* Timer Box (If step has timer) */}
        {currentStep.timerMinutes && (
          <div className="mt-4 p-3 rounded-xl glass-panel flex items-center justify-between border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2">
              <TimerIcon className={`w-5 h-5 ${isTimerRunning ? "text-amber-400 animate-spin" : "text-amber-400"}`} />
              <div>
                <div className="text-[10px] uppercase font-bold text-foreground/60">Cooking Timer</div>
                <div className="text-lg font-extrabold text-foreground font-mono">
                  {formatTimer(timerSecondsLeft ?? currentStep.timerMinutes * 60)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isTimerRunning ? (
                <button
                  onClick={startTimer}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition-colors"
                >
                  Start Timer
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-foreground font-bold text-xs transition-colors"
                >
                  Pause
                </button>
              )}
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-lg glass-card text-foreground/70 hover:text-foreground transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Playback Bar */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          onClick={() => handleStepChange(Math.max(0, currentStepIndex - 1))}
          disabled={currentStepIndex === 0}
          className="px-3 py-2 rounded-xl glass-card text-xs font-semibold disabled:opacity-40 text-foreground hover:border-brand-primary transition-colors"
        >
          Previous Step
        </button>

        <button
          onClick={handlePlayPause}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-button text-sm font-bold shadow-lg"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause Narration</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>
                {narrationLang === "ml" ? "ശബ്ദം കേൾക്കുക (Play)" : "Read Step Aloud"}
              </span>
            </>
          )}
        </button>

        <button
          onClick={() => handleStepChange(Math.min(steps.length - 1, currentStepIndex + 1))}
          disabled={currentStepIndex === steps.length - 1}
          className="px-3 py-2 rounded-xl glass-card text-xs font-semibold disabled:opacity-40 text-foreground hover:border-brand-primary transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
