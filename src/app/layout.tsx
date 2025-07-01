import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToggleThemeButton from "../components/ui/ToggleThemeButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic-Tac-Toe Game | Modern React & TypeScript",
  description: "A beautiful, modern Tic-Tac-Toe game built with Next.js, React, and TypeScript. Play, time travel, and enjoy stunning UI!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToggleThemeButton />
        {children}
      </body>
    </html>
  );
}
