import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedBackground } from "@/components/animated-background";
import { NeonProgressLine } from "@/components/neon-progress-line";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "John Doe - Full Stack Developer",
    template: "%s | John Doe"
  },
  description: "Portfolio of John Doe - Full Stack Web Developer specializing in JavaScript, React, Node.js, MongoDB, TypeScript",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Node.js", "TypeScript", "JavaScript", "Next.js", "Portfolio", "John Doe"],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "John Doe - Full Stack Developer",
    description: "Portfolio of John Doe - Full Stack Web Developer specializing in JavaScript, React, Node.js, MongoDB, TypeScript",
    siteName: "John Doe - Portfolio",
    images: [
      {
        url: "/pratik.jpg", // Placeholder image
        width: 1200,
        height: 630,
        alt: "John Doe - Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - Full Stack Developer",
    description: "Portfolio of John Doe - Full Stack Web Developer",
    images: ["/pratik.jpg"],
    creator: "@johndoe"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-auto`}
      >
        <AnimatedBackground />
        <NeonProgressLine />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
