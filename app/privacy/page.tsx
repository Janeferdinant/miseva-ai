import React from "react";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6 py-6 max-w-3xl mx-auto">
      <div className="rounded-3xl glass-panel p-8 border border-glass-border shadow-glass space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
          <Shield className="w-4 h-4" />
          <span>User Privacy Notice</span>
        </div>
        <h1 className="text-3xl font-black text-foreground">Privacy Policy</h1>
        <p className="text-xs text-foreground/60">Effective Date: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-glass-border space-y-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
        <h2 className="text-base font-bold text-foreground">1. Local Storage Exclusivity</h2>
        <p>
          CulinaryVerse AI respects your privacy. Saved favorite recipes, customized 7-day meal plans, and pantry checklist preferences are stored strictly on your local device via standard browser localStorage. No personal profiles are monetized or sold to third-party advertisers.
        </p>

        <h2 className="text-base font-bold text-foreground">2. Voluntary PIN Code Entry</h2>
        <p>
          When you enter a 6-digit Indian PIN code to test grocery retailer availability, the code is processed locally to filter regional delivery services. We do not track your real-time GPS location.
        </p>

        <h2 className="text-base font-bold text-foreground">3. Speech Recognition & Voice Data</h2>
        <p>
          Voice commands executed during Hands-Free Cooking Mode are processed client-side via the browser's standard Web Speech API. No audio recordings are stored on our servers.
        </p>
      </div>
    </div>
  );
}
