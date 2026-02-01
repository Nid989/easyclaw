import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyClaw — The easiest way to install OpenClaw",
  description:
    "Install ClawdBot, MoltBot, and OpenClaw in one command. No confusion, no hours of setup. Just paste and go.",
  openGraph: {
    title: "EasyClaw — The easiest way to install OpenClaw",
    description:
      "Install ClawdBot, MoltBot, and OpenClaw in one command. No confusion, no hours of setup.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
