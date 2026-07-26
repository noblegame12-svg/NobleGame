import { Orbitron, Inter, Alex_Brush } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  weight: "400",
  variable: "--font-alex-brush",
  subsets: ["latin"],
});

export const metadata = {
  title: "Noble Game - Premium Custom PC Builds & Hardware",
  description: "Experience ultimate performance. Discover Noble Game, high-performance PC components, ready-to-run PC builds, and professional gaming gear.",
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

