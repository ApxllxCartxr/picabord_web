import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const transitionTimeout = useRef<number | undefined>(undefined);
  const flashTimeout = useRef<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeout.current) window.clearTimeout(transitionTimeout.current);
      if (flashTimeout.current) window.clearTimeout(flashTimeout.current);
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const DURATION = 300; // ms - should match --theme-transition-duration

    // If user prefers reduced motion, skip transition helper
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      // add transient class to animate themeable properties
      root.classList.add('theme-transition');
      // clear existing timeout if any
      if (transitionTimeout.current) window.clearTimeout(transitionTimeout.current);
    }

    if (isDark) {
      setIsDark(false);
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("Switched to light mode");
    } else {
      setIsDark(true);
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("Switched to dark mode");
    }

    if (!prefersReduced) {
      transitionTimeout.current = window.setTimeout(() => {
        root.classList.remove('theme-transition');
      }, DURATION) as unknown as number;

      // create a radiating flash from the toggle button
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const flash = document.createElement('div');
        flash.className = 'theme-flash';

        // color depends on target theme: light -> whiteish, dark -> darkish
        if (isDark) {
          // switching to light
          flash.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.0) 100%)';
        } else {
          // switching to dark
          flash.style.background = 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.0) 100%)';
        }

        // position and append
        flash.style.left = `${cx}px`;
        flash.style.top = `${cy}px`;
        document.body.appendChild(flash);

        // trigger animation
        // force reflow
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        flash.getBoundingClientRect();
        flash.classList.add('theme-flash-animate');

        // cleanup after animation
        if (flashTimeout.current) window.clearTimeout(flashTimeout.current);
        flashTimeout.current = window.setTimeout(() => {
          try { flash.remove(); } catch (e) { /* ignore */ }
        }, DURATION + 120) as unknown as number;
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      ref={buttonRef}
      data-testid="button-theme-toggle"
      className="hover-elevate"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
      <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
    </Button>
  );
}