import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/theme-context";
import { MotionProvider } from "@/components/motion/motion-context";
import { MotionGraphicsCanvas } from "@/components/motion/MotionGraphicsCanvas";
import { MotionControlDock } from "@/components/motion/MotionControlDock";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://miseva.ai"),
  title: "Miseva AI — Your World. Your Kitchen. Your AI Chef.",
  description:
    "Miseva AI is an intelligent culinary and dining platform. Discover recipes from Kerala to world cuisines, cook with bilingual English and Malayalam AI voice guidance, compare Indian grocery prices, and design breathtaking dining tables.",
  keywords: [
    "Miseva AI",
    "Mise en place",
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
    "Table styling studio",
    "Authentic Sadya",
    "Thalassery Biryani",
  ],
  authors: [{ name: "Jane Rose, Assistant Professor, CSE" }],
  icons: {
    icon: "/brand/logo-mark.svg",
    apple: "/brand/logo.svg",
  },
  openGraph: {
    title: "Miseva AI — Your World. Your Kitchen. Your AI Chef.",
    description: "Multilingual AI cooking companion with authentic regional recipes, Malayalam voice guidance, price comparison, and table styling.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/brand/images/hero-culinary.jpg",
        width: 1920,
        height: 1080,
        alt: "Miseva AI Culinary Intelligence Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miseva AI — Your World. Your Kitchen. Your AI Chef.",
    description: "Cook smarter, eat better, and style your dining table with Miseva AI.",
    images: ["/brand/images/hero-culinary.jpg"],
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
          <MotionProvider>
            {/* Motion Graphics Canvas (Cyber Grid & Floating Culinary Quantum Embers) */}
            <MotionGraphicsCanvas />

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
            <MotionControlDock />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
