'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface CascadingTextProps {
  text: string;
  className?: string;
  animationDuration?: number;
  staggerDelay?: number;
  fontSize?: 'responsive' | 'fixed';
  font?: 'inter' | 'jetbrains-mono' | 'geist-sans' | 'general-sans' | 'epoch' | 'spline-sans-mono';
}

export default function CascadingText({
  text,
  className = '',
  animationDuration = 1200,
  staggerDelay = 50,
  fontSize = 'responsive',
  font = 'inter'
}: CascadingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'visible' | 'exiting'>('idle');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const dropThreshold = viewportHeight * 0.6;
    const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
    
    let progress = 0;
    if (rect.top < viewportHeight && rect.top > dropThreshold) {
      progress = 1 - ((rect.top - dropThreshold) / (viewportHeight - dropThreshold));
      progress = Math.max(0, Math.min(1, progress));
    } else if (rect.top <= dropThreshold) {
      progress = 1;
    }
    
    setScrollProgress(prevProgress => {
      if (Math.abs(prevProgress - progress) < 0.01) return prevProgress;
      return progress;
    });
    
    if (isInViewport) {
      setIsVisible(prevVisible => {
        if (!prevVisible && rect.bottom >= 0) {
          return true;
        } else if (prevVisible && rect.top > viewportHeight * 0.8) {
          return false;
        }
        return prevVisible;
      });
      
      setAnimationState(prev => {
        if (progress >= 1 && prev !== 'visible') {
          return 'visible';
        } else if (progress > 0 && progress < 1 && prev !== 'entering') {
          return 'entering';
        }
        return prev;
      });
    } else if (rect.top > viewportHeight) {
      setIsVisible(prevVisible => {
        if (prevVisible) {
          setAnimationState('idle');
          return false;
        }
        return prevVisible;
      });
    }
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
    };
  }, []);

  const getResponsiveFontSize = (textLength: number) => {
    if (fontSize === 'fixed') return 'text-6xl';
    
    if (textLength <= 8) {
      return 'text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]';
    } else if (textLength <= 15) {
      return 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl';
    } else {
      return 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl';
    }
  };

  const getFontClass = (fontFamily: string) => {
    switch (fontFamily) {
      case 'inter':
        return 'font-sans';
      case 'jetbrains-mono':
        return 'font-mono';
      case 'geist-sans':
        return 'font-sans';
      default:
        return 'font-sans';
    }
  };

  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index
  }));

  const getCharacterDropThreshold = (index: number) => {
    const center = Math.floor((characters.length - 1) / 2);
    const distanceFromCenter = Math.abs(index - center);
    const maxDistance = Math.max(center, characters.length - 1 - center);
    
    if (maxDistance === 0) return 0;
    
    const pairIndex = Math.floor(distanceFromCenter);
    const maxPairs = Math.ceil(maxDistance);
    
    if (maxPairs === 0) return 0;
    
    const pairDropStart = (pairIndex / maxPairs) * 0.9;
    
    const isLeftOfCenter = index < center;
    const isRightOfCenter = index > center;
    const withinPairDelay = (isRightOfCenter ? 0.02 : (isLeftOfCenter ? 0.01 : 0));
    
    return Math.min(0.92, pairDropStart + withinPairDelay);
  };

  const getCharacterStyle = (index: number) => {
    const isReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const center = Math.floor((characters.length - 1) / 2);
    const distanceFromCenter = Math.abs(index - center);
    
    const dropHeight = -220 - (distanceFromCenter * 15) - ((index * 17) % 40);
    const horizontalOffset = ((index * 11) % 9) - 4;
    
    const characterDropThreshold = getCharacterDropThreshold(index);
    
    let characterProgress = 0;
    if (scrollProgress > characterDropThreshold) {
      const availableTime = 1 - characterDropThreshold;
      if (availableTime > 0) {
        characterProgress = (scrollProgress - characterDropThreshold) / availableTime;
        characterProgress = Math.max(0, Math.min(1, characterProgress));
      } else {
        characterProgress = 1;
      }
    }

    if (isReducedMotion) {
      return {
        opacity: isVisible ? 1 : 0,
        transform: 'translateY(0px)',
        transition: 'opacity 0.3s ease'
      };
    }

    let currentY = dropHeight;
    let currentX = horizontalOffset;
    
    if (characterProgress > 0) {
      let easedProgress = characterProgress;
      if (characterProgress < 1) {
        easedProgress = 1 - Math.pow(1 - characterProgress, 1.5);
        if (characterProgress > 0.85) {
          const bouncePhase = (characterProgress - 0.85) / 0.15;
          easedProgress += Math.sin(bouncePhase * Math.PI) * 0.02 * (1 - bouncePhase);
        }
      }
      
      currentY = dropHeight + (easedProgress * -dropHeight);
      currentX = horizontalOffset + (easedProgress * -horizontalOffset);
    }

    if (animationState === 'idle' && scrollProgress === 0) {
      return {
        opacity: 1,
        transform: `translate(${horizontalOffset}px, ${dropHeight}px)`,
        transition: 'none'
      };
    }

    if (animationState === 'exiting') {
      const exitHorizontalOffset = horizontalOffset * 1.5;
      return {
        opacity: 1,
        transform: `translate(${exitHorizontalOffset}px, ${dropHeight}px)`,
        transition: 'transform 300ms ease-out',
        willChange: 'transform'
      };
    }

    return {
      opacity: 1,
      transform: `translate(${currentX}px, ${currentY}px)`,
      transition: scrollProgress === 0 ? 'none' : 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform'
    };
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ minHeight: '1em' }}
    >
      <div
        className={`
          ${getFontClass(font)}
          ${getResponsiveFontSize(text.length)}
          font-black
          tracking-tighter
          ${className.includes('text-') ? '' : 'text-foreground'}
          leading-none
          select-none
        `}
        role="heading"
        aria-label={text}
      >
        {characters.map(({ char, index }) => (
          <span
            key={index}
            className="inline-block"
            style={getCharacterStyle(index)}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
      </div>
      
      <span className="sr-only">{text}</span>
    </div>
  );
}
