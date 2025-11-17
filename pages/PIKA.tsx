'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PIKAProps {
  onBack: () => void;
}

export default function PIKA({ onBack }: PIKAProps) {
  const { trackEvent } = useAnalytics();
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  
  const aboutRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement>(null);
  const pcbAnimationRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Create separate observers with different thresholds
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAboutVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const leftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLeftVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Use higher threshold for bottom image so it only triggers when more visible
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBottomVisible(true);
          }
        });
      },
      { threshold: 0.5 } // Only trigger when 50% of the section is visible
    );

    if (aboutRef.current) aboutObserver.observe(aboutRef.current);
    if (leftRef.current) leftObserver.observe(leftRef.current);
    if (bottomRef.current) bottomObserver.observe(bottomRef.current);

    return () => {
      aboutObserver.disconnect();
      leftObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  // GSAP Animation for PCB traces
  useEffect(() => {
    if (!pcbAnimationRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the animated paths
      gsap.to(".animated-path", {
        strokeDashoffset: 0,
        duration: 3,
        ease: "none",
        stagger: 0.5,
        repeat: -1,
      });

      // Pulse animation for connection pads
      gsap.to(".animated-pad", {
        opacity: 0.8,
        scale: 1.2,
        duration: 1.5,
        ease: "power1.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
      });
    }, pcbAnimationRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#090d15]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-background/50 to-muted/10 border-b border-border">
        {/* PCB Circuit Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg ref={pcbAnimationRef} className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pcb-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                {/* Horizontal traces */}
                <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                <line x1="0" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                {/* Vertical traces */}
                <line x1="50" y1="0" x2="50" y2="200" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                <line x1="150" y1="0" x2="150" y2="200" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                {/* Connection pads */}
                <circle cx="50" cy="50" r="4" fill="currentColor" className="text-primary/40 animated-pad" />
                <circle cx="150" cy="50" r="4" fill="currentColor" className="text-primary/40 animated-pad" />
                <circle cx="50" cy="150" r="4" fill="currentColor" className="text-primary/40 animated-pad" />
                <circle cx="150" cy="150" r="4" fill="currentColor" className="text-primary/40 animated-pad" />
                {/* Diagonal traces */}
                <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-chart-1/20" />
                <line x1="150" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-chart-2/20" />
                {/* Via holes */}
                <circle cx="100" cy="100" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
                <circle cx="25" cy="25" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
                <circle cx="175" cy="175" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
              </pattern>
              
              {/* Gradient for animated paths */}
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-chart-1" />
                <stop offset="50%" stopColor="currentColor" className="text-primary" />
                <stop offset="100%" stopColor="currentColor" className="text-chart-2" />
              </linearGradient>
            </defs>
            
            {/* Static pattern background */}
            <rect width="100%" height="100%" fill="url(#pcb-pattern)" />
            
            {/* Animated signal paths - 6 rows spanning full width */}
            {[0, 200, 400, 600, 800, 1000].map((yOffset, index) => (
              <g key={`row-${index}`} transform={`translate(0, ${yOffset})`}>
                {/* Path 1: Horizontal then vertical */}
                <path 
                  d="M 0 50 L 2000 50" 
                  stroke="url(#pathGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  className="animated-path"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  opacity="0.6"
                />
                {/* Path 2: Vertical then horizontal */}
                <path 
                  d="M 50 0 L 50 50 L 2000 50" 
                  stroke="url(#pathGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  className="animated-path"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  opacity="0.6"
                />
                {/* Path 3: Horizontal at different y */}
                <path 
                  d="M 0 150 L 2000 150" 
                  stroke="url(#pathGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  className="animated-path"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  opacity="0.6"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 w-full">
          <div className="flex items-center mb-12">
            <Button
              variant="ghost"
              onClick={onBack}
              data-testid="button-back"
              className="mr-4 text-white hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="outline" className="border-primary/30 text-primary mr-4">
              Single Board Computer
            </Badge>
            <Badge className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground">
              Coming Soon
            </Badge>
          </div>

          {/* Vertically Stacked Title and Image */}
          <div className="flex flex-col items-center justify-center gap-12 min-h-[80vh]">
            {/* Text - Top */}
            <div className="text-left w-full max-w-5xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-picabord font-bold text-white mb-6">
                PIKA-I
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                <span className="text-white">INDIA'S </span>
                <span className="text-[#00d9ff]">FIRST </span>
                <span className="text-white">MODULAR AI-ENABLED SINGLE BOARD COMPUTER</span>
              </h2>
            </div>

            {/* Image - Bottom */}
            <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src="/main.png"
                alt="PIKA-I Board"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About PIKA Section */}
      <section ref={aboutRef} className="relative py-22 bg-[#0a0e16] overflow-hidden">
        <div className="max-w mx-auto px-10 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left side - Text */}
            <div className="flex-1 lg:flex-[0.45]">
              <h3 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                About{" "}
                <span className="text-primary font-picabord">PIKA-1</span>
              </h3>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-justify">
                <span className="font-picabord">PIKA-1</span> is a high-performance, compact single-board computer (SBC) designed by PICABORD to deliver versatility and efficiency in a small form factor. Engineered for developers, tech enthusiasts, and businesses, it combines robust processing power with low energy consumption, making it ideal for edge computing, IoT applications, AI prototyping, and embedded systems.
              </p>
            </div>

            {/* Right side - Image with slide-in animation */}
            <div 
              className={`flex-1 lg:flex-[0.55] relative w-full h-[500px] md:h-[550px] px-[-10] transition-all duration-1000  ${
                isAboutVisible 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}
            >
              <Image
                src="/main2.png"
                alt="PIKA-1 Features"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plug, Play, and Swap Instantly Section */}
      <section ref={leftRef} className="relative py-40 bg-[#070b12] overflow-hidden min-h-[200px]">
        {/* Left side - Image with slide-in from left animation - Peeking from left edge */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-[100%] lg:w-[30%] transition-all duration-1000 ${
            isLeftVisible 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-3/4 opacity-0'
          }`}
        >
          <Image
            src="/left.png"
            alt="Plug, Play, and Swap"
            fill
            className="object-contain object-left"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-end items-center min-h-[500px]">
            {/* Right side - Text */}
            <div className="w-full lg:w-[55%]">
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Plug, Play, and Swap{" "}
                <span className="text-primary">Instantly</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-justify">
                Easily replace or upgrade I/O peripherals on <span className="font-picabord">PIKA-1</span> without changing the entire board, enabling quick customization and experimentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stack More, Achieve More Section */}
      <section ref={bottomRef} className="relative py-15 bg-[#0a0e16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16">
            {/* Text Section */}
            <div className="text-center max-w-3xl py-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Stack More,{" "}
                <span className="text-primary">Achieve More</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-justify">
                <span className="font-picabord">PIKA-1</span> boards are designed to support stacking to create a high-performance cluster, enabling parallel processing, distributed computing, and compute-intensive tasks all in a compact, flexible setup.
              </p>
            </div>

            {/* Image with slide-in from bottom animation */}
            <div 
              className={`relative w-full h-[450px] md:h-[500px] max-w-4xl transition-all duration-[8000ms] ease-out ${
              isBottomVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
              }`}
            >
              <Image
              src="/bottom.png"
              alt="Stack More, Achieve More"
              fill
              className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#070b12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Build the Future?
          </h3>
          <p className="text-xl text-gray-300 mb-10 ">
            Get started with the <span className="font-picabord">PIKA-1</span> development kit and bring your ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 px-8 sm:px-12 min-h-[44px] hover-elevate focus-visible-ring text-white hover:text-primary"
              data-testid="button-contact-sales"
              onClick={() => {
                trackEvent('cta_button_click', {
                  button_text: 'Contact Sales',
                  location: 'bottom_cta',
                  page: '/pika'
                });
              }}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
