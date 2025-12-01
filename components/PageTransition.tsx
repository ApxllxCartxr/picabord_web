"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, Variants, useAnimation } from "framer-motion";

interface PageTransitionProps {
  columns?: number;
}

export default function PageTransition({ columns = 8 }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);
  const pendingNavigation = useRef<string | null>(null);

  const containerVariants: Variants = {
    idle: {},
    cover: {
      transition: {
        staggerChildren: 0.1, // Slower stagger
        when: "beforeChildren",
      },
    },
    reveal: {
      transition: {
        staggerChildren: 0.1, // Slower stagger
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const columnVariants: Variants = {
    idle: { y: "100%" },
    cover: { y: "0%", transition: { duration: 0.45, ease: "easeInOut" } },
    reveal: { y: "-100%", transition: { duration: 0.45, ease: "easeInOut" } },
  };

  useEffect(() => {
    // If pathname changed but we have a pendingNavigation (triggered by our handler),
    // the router.push has completed — we can now reveal.
    if (pendingNavigation.current) {
      (async () => {
        try {
          await controls.start("reveal");
        } finally {
          pendingNavigation.current = null;
          // hide overlay after animation
          setTimeout(() => setVisible(false), 50);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      const download = anchor.getAttribute("download");

      // Only intercept same-origin internal navigations without target or download
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        targetAttr === "_blank" ||
        download !== null ||
        (href.startsWith("http") && !href.startsWith(location.origin))
      ) {
        return;
      }

      // Prevent default navigation and run transition
      e.preventDefault();
      const dest = new URL(href, location.href).pathname + new URL(href, location.href).search;
      runTransition(dest);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runTransition(dest: string) {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      router.push(dest as any);
      return;
    }

    setVisible(true);
    // start cover
    await controls.start("cover");

    // Wait for cover animation to complete (0.6s)
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // after covered, navigate
    pendingNavigation.current = dest;
    await router.push(dest as any);
    // reveal will be triggered in pathname effect
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        variants={{
          idle: { 
            y: "100%",
          },
          cover: {
            y: "0%",
            transition: {
              duration: 0.6,
              ease: [0.165, 0.84, 0.44, 1], // Quicker entrance
            }
          },
          reveal: {
            y: "-100%",
            transition: {
              duration: 0.6,
              ease: [0.165, 0.84, 0.44, 1],
              delay: 0.3, // Wait for content to fade out
            }
          }
        }}
        style={{
          background: "hsl(var(--background))",
          boxShadow: "0 0 50px rgba(0,0,0,0.15)"
        }}
        initial="idle"
        animate={controls}
      />
    </div>
  );
}
