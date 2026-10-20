import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/theme-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "CulinaryVerse AI — The World's Intelligent Cooking Agent",
  description:
    "Discover authentic Indian regional cuisines from all 28 states & 8 Union Territories alongside celebrated global dishes. Experience multilingual Malayalam & English voice guidance, AI cooking assistance, liquid-glass aesthetics, and live Indian grocery price comparisons.",
  keywords: [
    "CulinaryVerse AI",
    "Kerala recipes",
    "Indian cuisine",
    "Malayalam cooking agent",
    "AI Chef",
    "Liquid-Glass UI",
    "Grocery price comparison",
    "Swiggy Instamart",
    "Blinkit",
    "Zepto",
    "Amazon Fresh",
    "Flipkart Grocery",
    "Authentic Sadya",
    "Thalassery Biryani",
    "Hyderabadi Biryani",
  ],
  authors: [{ name: "Jane Rose, Assistant Professor, CSE" }],
  openGraph: {
    title: "CulinaryVerse AI — The World's Intelligent Cooking Agent",
    description: "Multilingual AI cooking companion with authentic regional recipes, Malayalam voice narration, and grocery price intelligence.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Malayalam:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-brand-primary selection:text-white">
        <ThemeProvider>
          {/* Subtle liquid backdrop glows */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl animate-pulse-slow" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl animate-pulse-slow delay-1000" />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl animate-pulse-slow delay-2000" />
          </div>

          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
