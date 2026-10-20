import React from "react";
import { Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="space-y-6 py-6 max-w-3xl mx-auto">
      <div className="rounded-3xl glass-panel p-8 border border-glass-border shadow-glass space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
          <Shield className="w-4 h-4" />
          <span>Terms of Use</span>
        </div>
        <h1 className="text-3xl font-black text-foreground">Terms of Service</h1>
        <p className="text-xs text-foreground/60">Effective Date: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-glass-border space-y-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
        <h2 className="text-base font-bold text-foreground">1. Academic & Educational Purpose</h2>
        <p>
          CulinaryVerse AI is developed as an academic research platform under faculty supervision (Jane Rose, Assistant Professor, CSE) for educational, research, and non-commercial culinary exploration.
        </p>

        <h2 className="text-base font-bold text-foreground">2. Retailer Pricing Disclaimers</h2>
        <p>
          Grocery pricing, package sizes, and delivery estimations for Amazon Fresh, Flipkart, Swiggy Instamart, Zepto, Blinkit, and BigBasket are benchmarks provided for informational and planning purposes only. CulinaryVerse AI does not place financial orders or guarantee retailer stock. All actual transactions occur directly on the respective retailer's platform.
        </p>

        <h2 className="text-base font-bold text-foreground">3. Dietary & Allergen Safety</h2>
        <p>
          While recipes contain allergen tags and food safety guidelines, users with severe food allergies must verify all package ingredient labels before consumption.
        </p>
      </div>
    </div>
  );
}
