import { useEffect, useRef, useState } from 'react';

export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export interface ParallaxReturn {
  ref: React.RefObject<HTMLElement>;
  transform: string;
}

/**
 * Custom hook to create parallax scroll effects
 * 
 * @param options - Configuration options for the parallax effect
 * @param options.speed - Speed multiplier for parallax effect (0-1, default 0.3)
 * @param options.direction - Direction of parallax movement
 * @returns Object containing ref to attach to element and transform CSS value
 * 
 * @example
 * ```tsx
 * const { ref, transform } = useParallax({ speed: 0.3, direction: 'vertical' });
 * 
 * return (
 *   <div ref={ref} style={{ transform }}>
 *     Parallax Content
 *   </div>
 * );
 * ```
 */
export function useParallax(
  options: ParallaxOptions = {}
): ParallaxReturn {
  const { speed = 0.3, direction = 'vertical' } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ticking = false;

    const updateParallax = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate the element's position relative to viewport
      // Positive when element is below viewport, negative when above
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
      
      // Calculate parallax offset
      const offset = (scrollProgress - 0.5) * 100 * speed;

      // Apply transform based on direction
      if (direction === 'vertical') {
        setTransform(`translate3d(0, ${offset}px, 0)`);
      } else {
        setTransform(`translate3d(${offset}px, 0, 0)`);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial calculation
    updateParallax();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, direction]);

  return { ref, transform };
}
