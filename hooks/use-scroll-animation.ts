import { useEffect, useRef, useState } from 'react';

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport for scroll animations
 * 
 * @param options - Configuration options for the Intersection Observer
 * @param options.threshold - Percentage of element visibility required to trigger (0-1)
 * @param options.rootMargin - Margin around the root element
 * @param options.triggerOnce - Whether to trigger animation only once
 * @returns Object containing ref to attach to element and visibility state
 * 
 * @example
 * ```tsx
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
 * 
 * return (
 *   <div ref={ref} className={isVisible ? 'animate-fade-in' : 'opacity-0'}>
 *     Content
 *   </div>
 * );
 * ```
 */
export function useScrollAnimation(
  options: ScrollAnimationOptions = {}
): ScrollAnimationReturn {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already triggered and triggerOnce is true, don't observe
    if (hasTriggered && triggerOnce) {
      return;
    }

    // Check if Intersection Observer is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: just show the element
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasTriggered(true);
            
            // If triggerOnce is true, disconnect after first trigger
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            // Only update visibility if not triggerOnce
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isVisible };
}
