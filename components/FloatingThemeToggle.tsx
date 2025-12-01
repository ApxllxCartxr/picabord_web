"use client"

import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function FloatingThemeToggle() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-background/90 dark:bg-background/80 border border-border/50 dark:border-border rounded-full shadow-lg p-1 backdrop-blur-sm">
        <ThemeToggle />
      </div>
    </div>
  );
}
