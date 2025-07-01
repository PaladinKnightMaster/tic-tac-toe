"use client";
import { useEffect, useState } from "react";

export default function ToggleThemeButton() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") setDark(true);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [dark]);
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-black/80 shadow border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
} 