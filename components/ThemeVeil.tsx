'use client';

import { useEffect, useState } from 'react';
import DarkVeil from './DarkVeil';
import LightVeil from './LightVeil';

type ThemeVeilProps = {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
};

export default function ThemeVeil(props: ThemeVeilProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check initial theme
    const checkTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
      setIsDark(shouldBeDark);
    };
    
    checkTheme();

    // Listen for theme changes via storage events (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        setIsDark(e.newValue === "dark");
      }
    };

    // Listen for class changes on document element (from ThemeToggle)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return <div className="w-full h-full" />;
  }

  console.log('ThemeVeil rendering:', isDark ? 'DarkVeil' : 'LightVeil');

  return isDark ? <DarkVeil {...props} /> : <LightVeil {...props} />;
}
