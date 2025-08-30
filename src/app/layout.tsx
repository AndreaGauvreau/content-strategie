// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// si tu utilises les polices Geist du starter Next 15 :
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Kuartz — Content Calendar",
  description: "Desktop content calendar with CSV paste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
