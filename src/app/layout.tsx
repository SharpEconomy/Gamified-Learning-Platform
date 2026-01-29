import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "CodeQuest - Learn to Code and Level Up",
    template: "%s | CodeQuest - Gamified Coding Platform",
  },
  description: "Master programming skills through interactive coding lessons. Earn XP, unlock achievements, get certified, and level up your coding career. Learn JavaScript, React, TypeScript, Node.js and more.",
  keywords: ["CodeQuest", "learn to code", "coding platform", "programming", "JavaScript", "React", "TypeScript", "Node.js", "gamified learning", "coding challenges", "programming courses", "online coding", "web development", "code academy"],
  authors: [{ name: "CodeQuest Team", url: "https://codequest.com/team" }],
  creator: "CodeQuest",
  publisher: "CodeQuest",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  metadataBase: new URL('https://codequest.com', 'https://codequest.com'),
  alternates: {
    canonical: 'https://codequest.com',
  },
  openGraph: {
    title: "CodeQuest - Gamified Coding Platform",
    description: "Learn to code interactively with real-time feedback. Earn XP, badges, and certificates while mastering JavaScript, React, TypeScript, and more.",
    url: 'https://codequest.com',
    siteName: "CodeQuest",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeQuest - Gamified Coding Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeQuest - Learn to Code and Level Up",
    description: "Interactive coding platform with XP, badges, and certificates. Master programming through gamified learning.",
    images: ["/og-image.png"],
    creator: "@codequest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
