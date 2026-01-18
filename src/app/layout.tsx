import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeQuest - Learn to Code Through Adventure",
  description: "Master programming through gamified learning. Earn XP, unlock badges, and level up your coding skills in an interactive adventure.",
  keywords: ["CodeQuest", "learn to code", "programming", "gamified learning", "JavaScript", "Python", "React", "coding adventure"],
  authors: [{ name: "CodeQuest Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "CodeQuest - Learn to Code Through Adventure",
    description: "Master programming through gamified learning. Earn XP, unlock badges, and level up your coding skills.",
    url: "https://codequest.example.com",
    siteName: "CodeQuest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeQuest - Learn to Code Through Adventure",
    description: "Master programming through gamified learning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}