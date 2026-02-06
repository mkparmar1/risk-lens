import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RiskLens - AI Freelance Project Risk Analyzer",
  description: "Evaluate freelance projects, estimate risks, and get actionable negotiation advice with AI.",
  keywords: ["freelance risk analyzer", "scope creep detector", "client vetting tool", "bad client red flags", "freelance contract protection", "AI negotiation assistant", "freelancer tools", "upwork client checker"],
  openGraph: {
    title: "RiskLens - AI Freelance Project Risk Analyzer",
    description: "Evaluate freelance projects, estimate risks, and get actionable negotiation advice with AI.",
    siteName: "RiskLens",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
