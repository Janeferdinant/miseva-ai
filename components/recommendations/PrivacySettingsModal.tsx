"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Trash2, RotateCcw, X, Check } from "lucide-react";
import { UserConsentProfile } from "@/lib/marketing/services/recommendation-engine-service";

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserConsentProfile;
  onUpdateConsent: (allowPersonalisation: boolean, allowNotifications: boolean) => void;
  onResetData: () => void;
  onDeleteAllData: () => void;
}

export function PrivacySettingsModal({
  isOpen,
  onClose,
  profile,
  onUpdateConsent,
  onResetData,
  onDeleteAllData
}: PrivacySettingsModalProps) {
  const [personalisation, setPersonalisation] = useState(profile.allowPersonalisation);
  const [notifications, setNotifications] = useState(profile.allowNotifications);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConsent(personalisation, notifications);
    setShowSavedNotification(true);
    setTimeout(() => {
      setShowSavedNotification(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#12161a] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">Privacy & Recommendation Controls</h3>
            <p className="text-xs text-foreground/60">
              Manage how Miseva AI uses your culinary preferences.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {/* Toggle 1: Personalisation */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="space-y-1 pr-4">
              <span className="text-sm font-semibold block">Enable In-App Personalisation</span>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Recommends recipes based on your saved dishes and ingredient searches. When disabled, recommendations are strictly based on the current page.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={personalisation}
                onChange={e => setPersonalisation(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
            </label>
          </div>

          {/* Toggle 2: Notifications */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="space-y-1 pr-4">
              <span className="text-sm font-semibold block">Cooking Reminders & Updates</span>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Receive consented meal plan reminders. Respects quiet hours (10 PM to 8 AM IST).
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifications}
                onChange={e => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
            </label>
          </div>

          {/* Data Reset & Deletion */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onResetData}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Profile History</span>
            </button>
            <button
              onClick={onDeleteAllData}
              className="flex-1 px-4 py-2.5 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All Data</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 text-foreground/75"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            {showSavedNotification ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Preferences Saved</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
