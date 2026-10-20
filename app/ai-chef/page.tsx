"use client";

import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import {
  processChefQuery,
  matchRecipesByPantry,
  ChefResponse,
  PantryMatchResult,
} from "@/lib/ai/cooking-agent";
import { SpeechEngine } from "@/lib/voice/speech-engine";
import { RecipeCard } from "@/components/RecipeCard";

interface ChatMessage {
  id: string;
  sender: "user" | "chef";
  text: string;
  textMalayalam?: string;
  suggestedRecipes?: any[];
  actionSuggestions?: string[];
  intent?: string;
}

export default function AIChefPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "pantry">("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "chef",
      text: "Namaste! I am your AI Master Chef. Ask me anything about Indian regional techniques, secret spice blends, pantry ingredient combinations, or authentic world cuisines.",
      textMalayalam:
        "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ എ.ഐ മാസ്റ്റർ ഷെഫ്. ഇന്ത്യൻ തനത് പാചക രീതികൾ, ചേരുവകൾ, പുതിയ വിഭവങ്ങൾ എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കാം.",
      actionSuggestions: [
        "What can I cook with coconut and plantain?",
        "Why add raw coconut oil at the end of avial?",
        "Explain the risotto mantecatura technique",
        "Substitute for sour curd in curry",
      ],
    },
  ]);

  // Pantry Assistant State
  const pantryOptions = [
    { id: "coconut", name: "Fresh Coconut", nameMl: "തേങ്ങ", icon: "🥥" },
    { id: "chicken", name: "Chicken", nameMl: "ചിക്കൻ", icon: "🍗" },
    { id: "mutton", name: "Mutton / Goat", nameMl: "മട്ടൺ", icon: "🥩" },
    { id: "yam", name: "Elephant Yam (Chena)", nameMl: "ചേന", icon: "🥔" },
    { id: "plantain", name: "Raw Plantain (Kaya)", nameMl: "പച്ചക്കായ", icon: "🍌" },
    { id: "rice", name: "Rice (Khaima / Basmati)", nameMl: "അരി", icon: "🍚" },
    { id: "potatoes", name: "Potatoes", nameMl: "ഉരുളക്കിഴങ്ങ്", icon: "🥔" },
    { id: "tomatoes", name: "Tomatoes", nameMl: "തക്കാളി", icon: "🍅" },
    { id: "onions", name: "Onions & Shallots", nameMl: "ഉള്ളി", icon: "🧅" },
    { id: "eggs", name: "Eggs", nameMl: "മുട്ട", icon: "🥚" },
    { id: "mushrooms", name: "Mushrooms", nameMl: "കൂൺ", icon: "🍄" },
    { id: "prawns", name: "Prawns / Shrimp", nameMl: "ചെമ്മീൻ", icon: "🦐" },
  ];
  const [selectedPantry, setSelectedPantry] = useState<string[]>(["coconut", "plantain"]);

  const pantryMatches: PantryMatchResult[] = matchRecipesByPantry(selectedPantry);

  const togglePantryItem = (id: string) => {
    setSelectedPantry((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");

    // Simulate thoughtful chef reasoning
    setTimeout(() => {
      const chefResult: ChefResponse = processChefQuery(text);
      const chefMsg: ChatMessage = {
        id: `chef-${Date.now()}`,
        sender: "chef",
        text: chefResult.reply,
        textMalayalam: chefResult.replyMalayalam,
        suggestedRecipes: chefResult.suggestedRecipes,
        actionSuggestions: chefResult.actionSuggestions,
        intent: chefResult.intent,
      };
      setMessages((prev) => [...prev, chefMsg]);
    }, 400);
  };

  const handleSpeakMessage = (text: string, lang: "en" | "ml" = "en") => {
    SpeechEngine.speak(text, lang);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Studio Header */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-brand-primary/40 shadow-glass">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold mb-2">
              <Bot className="w-4 h-4" />
              <span>Interactive RAG Culinary Assistant</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground">
              AI Cooking Studio & Conversational Chef
            </h1>
            <p className="text-sm text-foreground/75 mt-1 max-w-2xl">
              Ask questions about cooking chemistry, traditional cooking techniques, ingredient substitutions, or search your pantry.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "chat"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Chef Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("pantry")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "pantry"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pantry Matcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Chat Interface */}
      {activeTab === "chat" && (
        <div className="space-y-6">
          {/* Chat Messages Log */}
          <div className="rounded-3xl glass-panel p-4 sm:p-6 min-h-[480px] max-h-[650px] overflow-y-auto space-y-6 border border-glass-border">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "chef" && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                    msg.sender === "user"
                      ? "glass-button text-white rounded-tr-none shadow-md"
                      : "glass-card rounded-tl-none border border-glass-border"
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed font-medium">
                    {msg.text}
                  </p>

                  {msg.textMalayalam && (
                    <p className="text-sm sm:text-base text-brand-primary lang-ml leading-relaxed font-semibold pt-1 border-t border-white/10">
                      {msg.textMalayalam}
                    </p>
                  )}

                  {/* Speech Trigger */}
                  {msg.sender === "chef" && (
                    <div className="flex items-center gap-2 pt-2 text-xs">
                      <button
                        onClick={() => handleSpeakMessage(msg.text, "en")}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg glass-panel hover:text-brand-primary text-[11px] font-bold text-foreground/75"
                        title="Listen in English"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>English Voice</span>
                      </button>

                      {msg.textMalayalam && (
                        <button
                          onClick={() => handleSpeakMessage(msg.textMalayalam!, "ml")}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg glass-panel hover:text-brand-primary text-[11px] font-bold text-foreground/75"
                          title="Listen in Malayalam"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>മലയാളം ശബ്ദം</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Embedded Suggested Recipe Cards */}
                  {msg.suggestedRecipes && msg.suggestedRecipes.length > 0 && (
                    <div className="pt-3 border-t border-glass-border/40 space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Recommended Recipes</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.suggestedRecipes.map((r: any) => (
                          <RecipeCard key={r.id} recipe={r} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Suggestions Pills */}
                  {msg.actionSuggestions && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.actionSuggestions.map((pill, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(pill)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/10 hover:bg-white/20 text-foreground transition-colors"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the chef (e.g. 'What can I cook with coconut and yam?', 'How to avoid curd splitting?')..."
              className="flex-1 px-4 py-3.5 rounded-2xl glass-input text-sm text-foreground"
            />
            <button
              type="submit"
              className="px-5 py-3.5 rounded-2xl glass-button text-sm font-bold flex items-center gap-2 shadow-lg"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Interactive Pantry Matcher */}
      {activeTab === "pantry" && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl glass-panel space-y-4 border border-glass-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-foreground">
                  Select What's in Your Kitchen Pantry
                </h2>
                <p className="text-xs text-foreground/60">
                  Tap ingredients you have on hand; our algorithm calculates which authentic recipes you can cook right away.
                </p>
              </div>

              <button
                onClick={() => setSelectedPantry([])}
                className="text-xs font-bold text-brand-primary hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Pantry Ingredients Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
              {pantryOptions.map((item) => {
                const isSelected = selectedPantry.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => togglePantryItem(item.id)}
                    className={`p-3 rounded-2xl text-left transition-all flex items-center gap-2.5 border ${
                      isSelected
                        ? "bg-brand-primary/20 border-brand-primary shadow-sm"
                        : "glass-card hover:border-white/30"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-foreground/60 lang-ml">
                        {item.nameMl}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matched Dishes Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>Matched Recipes ({pantryMatches.length} dishes found)</span>
            </h3>

            {pantryMatches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pantryMatches.map(({ recipe, matchPercentage, matchedIngredients, missingIngredients }) => (
                  <div key={recipe.id} className="flex flex-col space-y-2">
                    <RecipeCard recipe={recipe} />
                    <div className="p-3 rounded-xl glass-card text-xs space-y-1.5 border border-brand-primary/20 bg-brand-primary/5">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-brand-primary">{matchPercentage}% Pantry Match</span>
                        <span className="text-foreground/50">{matchedIngredients.length} ingredients ready</span>
                      </div>
                      {missingIngredients.length > 0 && (
                        <div className="text-[11px] text-foreground/70">
                          <span className="text-amber-400 font-semibold">Missing: </span>
                          {missingIngredients.slice(0, 3).join(", ")}
                          {missingIngredients.length > 3 ? ` +${missingIngredients.length - 3} more` : ""}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl glass-card text-center text-sm text-foreground/70">
                Select at least one ingredient above to see matching dishes.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
