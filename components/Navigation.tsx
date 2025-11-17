import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const solutionsMenuRef = useRef<HTMLDivElement>(null);
  const solutionsCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const solutionsMenuTlRef = useRef<gsap.core.Timeline | null>(null);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hoverLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);

  const sections = [
    { id: "solutions", label: "Solutions" },
    { id: "work", label: "Work" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" }
  ];

  const solutionsItems = [
    {
      label: "Hardware",
      description: "",
      bgGradient: "from-cyan-500/10 via-cyan-400/5 to-transparent",
      borderColor: "border-cyan-500/20",
      textColor: "text-foreground",
      accentColor: "text-cyan-500",
      href: "/pika"
    },
    {
      label: "Software",
      description: "",
      bgGradient: "from-purple-500/10 via-purple-400/5 to-transparent",
      borderColor: "border-purple-500/20",
      textColor: "text-foreground",
      accentColor: "text-purple-500",
      href: "/tec"
    }
  ];

  // Always keep the navbar visible by setting it to stay in view
  useEffect(() => {
    // Ensure navbar stays in view by setting a high z-index and fixed position
    document.documentElement.style.scrollPaddingTop = '80px'; // Add padding for anchor links
  }, []);

  // Animate solutions menu when it opens/closes
  useEffect(() => {
    const solutionsMenu = solutionsMenuRef.current;
    if (!solutionsMenu) return;

    if (isSolutionsMenuOpen) {
      // Animate in - menu only, no card animation
      gsap.set(solutionsMenu, { height: 0, opacity: 0 });
      gsap.set(solutionsCardsRef.current, { y: 0, opacity: 1 });

      const tl = gsap.timeline();
      tl.to(solutionsMenu, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power3.out' });

      solutionsMenuTlRef.current = tl;
    } else if (solutionsMenuTlRef.current) {
      // Animate out - menu only
      const tl = gsap.timeline();
      tl.to(solutionsMenuRef.current, { height: 0, opacity: 0, duration: 0.2, ease: 'power3.in' });
    }
  }, [isSolutionsMenuOpen]);

  // Open/close solutions menu on hover
  const openSolutionsMenu = () => {
    setIsSolutionsMenuOpen(true);
  };

  const closeSolutionsMenu = () => {
    setIsSolutionsMenuOpen(false);
  };

  // GSAP animation setup - exact PillNav logic
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;

        // Calculate circle dimensions for perfect reveal
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = labelRefs.current[index];
        const hoverLabel = hoverLabelRefs.current[index];

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        // Kill existing timeline
        tlRefs.current[index]?.kill();

        // Create animation timeline - smoother, faster animation
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease: 'power3.out', overwrite: 'auto' }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => { });
    }

    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] w-[95%] max-w-6xl" aria-label="Main navigation">
      {/* Glassmorphic Pill Container */}
      <div className="bg-background/30 backdrop-blur-2xl border border-border/80 rounded-full shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.3)] px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <Image
              src="/PIC-A-BOARD_logo_w.png"
              alt="PICABORD Logo"
              width={28}
              height={28}
              className="h-5 w-auto md:h-6 invert dark:invert-0 transition-[filter] duration-300 ease-in-out group-hover:brightness-90"
              priority
            />
            <h1 className="text-lg md:text-xl font-medium text-foreground font-picabord tracking-tight pt-1 transition-colors duration-300 group-hover:text-primary">
              PICABORD
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0 relative" role="list">
            {sections.map((section, index) => {
              const handleEnter = () => {
                const tl = tlRefs.current[index];
                if (!tl) return;
                activeTweenRefs.current[index]?.kill();
                activeTweenRefs.current[index] = tl.tweenTo(tl.duration(), {
                  duration: 0.3,
                  ease: 'power3.out',
                  overwrite: 'auto'
                });
              };

              const handleLeave = () => {
                const tl = tlRefs.current[index];
                if (!tl) return;
                activeTweenRefs.current[index]?.kill();
                activeTweenRefs.current[index] = tl.tweenTo(0, {
                  duration: 0.2,
                  ease: 'power3.out',
                  overwrite: 'auto'
                });
              };

              // Special handling for Solutions button
              if (section.id === 'solutions') {
                return (
                  <div
                    key={section.id}
                    className="relative"
                    onMouseEnter={() => {
                      handleEnter();
                      openSolutionsMenu();
                    }}
                    onMouseLeave={() => {
                      handleLeave();
                      closeSolutionsMenu();
                    }}
                  >
                    <button
                      data-testid={`nav-${section.id}`}
                      data-solutions-button
                      aria-expanded={isSolutionsMenuOpen}
                      className={`relative px-5 py-3 text-base font-semibold rounded-2xl focus-visible-ring overflow-hidden ${currentSection === section.id || isSolutionsMenuOpen
                        ? "text-primary-foreground bg-primary"
                        : "text-muted-foreground"
                        }`}
                    >
                      {/* Circular reveal */}
                      <span
                        ref={(el) => { circleRefs.current[index] = el; }}
                        className="absolute left-1/2 bottom-0 rounded-full bg-primary pointer-events-none z-[1]"
                        style={{ willChange: 'transform' }}
                        aria-hidden="true"
                      />

                      {/* Dual label stack */}
                      <span className="relative inline-block leading-none z-[2]">
                        <span
                          ref={(el) => { labelRefs.current[index] = el; }}
                          className="relative z-[2] inline-block leading-none"
                          style={{ willChange: 'transform' }}
                        >
                          {section.label}
                        </span>
                        <span
                          ref={(el) => { hoverLabelRefs.current[index] = el; }}
                          className="absolute left-0 top-0 z-[3] inline-block text-primary-foreground"
                          style={{ willChange: 'transform, opacity' }}
                          aria-hidden="true"
                        >
                          {section.label}
                        </span>
                      </span>
                    </button>

                    {/* Solutions Dropdown Menu */}
                    {isSolutionsMenuOpen && (
                      <div
                        ref={solutionsMenuRef}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[440px]"
                      >
                        <div className="relative bg-background/80 backdrop-blur-2xl border border-border/30 rounded-2xl shadow-2xl p-4 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none"
                        >
                          <div className="flex gap-3">
                            {solutionsItems.map((item, idx) => (
                              <Link key={item.label} href={item.href as any} className="flex-1">
                                <div
                                  ref={(el) => { solutionsCardsRef.current[idx] = el; }}
                                  className={`relative flex flex-col gap-2 p-5 rounded-xl min-h-[140px] cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm border ${item.borderColor} ${item.textColor} group overflow-hidden`}
                                >
                                  {/* Subtle shine effect on hover */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                  <div className="relative z-10">
                                    <div className={`font-bold text-2xl tracking-tight ${item.accentColor} mb-1`}>
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium opacity-70">
                                      {item.description}
                                    </div>
                                  </div>

                                  <div className={`relative z-10 mt-auto flex items-center gap-2 text-sm font-medium ${item.accentColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <span>Explore</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={section.id} href={(section.id === 'home' ? '/' : `/${section.id}`) as any}>
                  <button
                    data-testid={`nav-${section.id}`}
                    aria-current={currentSection === section.id ? 'page' : undefined}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    className={`relative px-5 py-3 text-base font-semibold rounded-2xl focus-visible-ring overflow-hidden ${currentSection === section.id
                      ? "text-primary-foreground bg-primary"
                      : "text-muted-foreground"
                      }`}
                  >
                    {/* Circular reveal */}
                    <span
                      ref={(el) => { circleRefs.current[index] = el; }}
                      className="absolute left-1/2 bottom-0 rounded-full bg-primary pointer-events-none z-[1]"
                      style={{ willChange: 'transform' }}
                      aria-hidden="true"
                    />

                    {/* Dual label stack */}
                    <span className="relative inline-block leading-none z-[2]">
                      <span
                        ref={(el) => { labelRefs.current[index] = el; }}
                        className="relative z-[2] inline-block leading-none"
                        style={{ willChange: 'transform' }}
                      >
                        {section.label}
                      </span>
                      <span
                        ref={(el) => { hoverLabelRefs.current[index] = el; }}
                        className="absolute left-0 top-0 z-[3] inline-block text-primary-foreground"
                        style={{ willChange: 'transform, opacity' }}
                        aria-hidden="true"
                      >
                        {section.label}
                      </span>
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle, Contact CTA & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Theme toggle moved to floating tag */}

            {/* Contact Us - desktop */}
            <div className="hidden md:block">
              <Link href={"/contact" as any} className="group">
                <button
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl transform transition-all duration-500 ease-out focus-visible-ring bg-transparent text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary-foreground group-hover:scale-[1.03]"
                  aria-label="Contact Us"
                >
                  <span className="text-sm font-medium transition-colors duration-300">
                    Contact Us
                  </span>
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-primary/10 text-primary transition-colors duration-500 ease-out group-hover:bg-primary/30 group-hover:text-primary-foreground shadow-sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="rounded-2xl focus-visible-ring"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden mt-2 w-full bg-background/90 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.3)] p-4 animate-fade-in-down"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <div className="bg-background/80 dark:bg-background/90 backdrop-blur-xl border border-border/50 dark:border-border rounded-3xl shadow-2xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] px-4 py-3 space-y-1">
            {sections.map((section, index) => (
              <Link key={section.id} href={(section.id === 'home' ? '/' : `/${section.id}`) as any}>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid={`nav-mobile-${section.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={currentSection === section.id ? 'page' : undefined}
                  className={`w-full justify-start px-5 py-3 text-base font-medium rounded-2xl transition-all duration-200 focus-visible-ring animate-fade-in-up ${currentSection === section.id
                    ? "text-primary-foreground bg-primary hover:bg-primary/90"
                    : "text-muted-foreground hover:bg-accent/50"
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {section.label}
                </Button>
              </Link>
            ))}
            {/* Mobile Contact CTA */}
            <div className="pt-2">
              <Link href={'/contact' as any}>
                <button
                  className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-primary/10 text-primary transform transition-all duration-500 ease-out hover:bg-primary/20 hover:text-primary-foreground hover:scale-[1.03] focus-visible-ring"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Contact Us"
                >
                  <span className="text-sm font-medium">Contact Us</span>
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-primary text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}