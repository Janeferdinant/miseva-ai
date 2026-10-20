"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Shield, ArrowRight, Settings, Info } from "lucide-react";
import {
  RecommendationResult,
  UserConsentProfile,
  sharedRecommendationEngine
} from "@/lib/marketing/services/recommendation-engine-service";
import { PrivacySettingsModal } from "./PrivacySettingsModal";

interface ContextualRecommendationCardProps {
  currentPage?: string;
  activeCategory?: string;
  searchQuery?: string;
}

export function ContextualRecommendationCard({
  currentPage = "/home",
  activeCategory,
  searchQuery
}: ContextualRecommendationCardProps) {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserConsentProfile>({
    userId: "usr_active_session",
    allowPersonalisation: true,
    allowNotifications: false,
    consentedCategories: ["Kerala Cuisine", "Smart Cooking"],
    savedDishIds: []
  });

  const loadRecommendations = () => {
    const recs = sharedRecommendationEngine.getRecommendations(
      {
        currentPage,
        activeCategory,
        searchQuery
      },
      profile
    );
    setRecommendations(recs);
  };

  useEffect(() => {
    loadRecommendations();
  }, [currentPage, activeCategory, searchQuery, profile.allowPersonalisation]);

  const handleUpdateConsent = (allowPers: boolean, allowNotif: boolean) => {
    const updated = {
      ...profile,
      allowPersonalisation: allowPers,
      allowNotifications: allowNotif
    };
    setProfile(updated);
    sharedRecommendationEngine.setConsent(profile.userId, allowPers, allowNotif);
  };

  const handleResetData = () => {
    sharedRecommendationEngine.resetUserProfile(profile.userId);
    setProfile({
      ...profile,
      consentedCategories: [],
      savedDishIds: []
    });
    alert("Profile history cleared successfully.");
  };

  const handleDeleteAllData = () => {
    sharedRecommendationEngine.deleteUserData(profile.userId);
    setProfile({
      userId: "usr_active_session",
      allowPersonalisation: false,
      allowNotifications: false,
      consentedCategories: [],
      savedDishIds: []
    });
    alert("All personal recommendation data has been deleted.");
    setIsPrivacyModalOpen(false);
  };

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="my-8 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base font-extrabold tracking-tight">
            Curated Recommendations For You
          </h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-foreground/75 border border-white/10 hidden sm:inline-block">
            {profile.allowPersonalisation ? "Consented Matching" : "Contextual Only"}
          </span>
        </div>

        <button
          onClick={() => setIsPrivacyModalOpen(true)}
          className="flex items-center gap-1.5 text-xs text-foreground/60 hover:text-emerald-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-white/5"
          title="Manage recommendation privacy"
        >
          <Shield className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Privacy Settings</span>
        </button>
      </div>

      {/* Grid of Recommendation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map(rec => (
          <div
            key={rec.id}
            className="rounded-2xl glass-card p-4 border border-white/10 hover:border-emerald-400/40 transition-all flex flex-col justify-between group space-y-3 shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {rec.category}
                </span>
                <span className="text-[10px] text-foreground/50 font-mono">
                  {Math.round(rec.confidenceScore * 100)}% match
                </span>
              </div>

              <h4 className="text-sm font-bold group-hover:text-emerald-300 transition-colors line-clamp-1">
                {rec.title}
              </h4>

              {rec.subtitle && (
                <p className="text-xs text-foreground/60 line-clamp-1">
                  {rec.subtitle}
                </p>
              )}

              {/* Explainable Reason Badge */}
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-[11px] text-amber-300/80 flex items-start gap-1.5 leading-snug">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span>{rec.reason}</span>
              </div>
            </div>

            <Link
              href={rec.destinationUrl}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:scale-[1.02]"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Privacy Settings Modal */}
      <PrivacySettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        profile={profile}
        onUpdateConsent={handleUpdateConsent}
        onResetData={handleResetData}
        onDeleteAllData={handleDeleteAllData}
      />
    </section>
  );
}
