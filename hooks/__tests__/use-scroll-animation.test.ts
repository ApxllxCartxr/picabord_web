import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useScrollAnimation } from '../use-scroll-animation';

describe('useScrollAnimation', () => {
  let mockIntersectionObserver: any;
  let observeCallback: IntersectionObserverCallback | null = null;

  beforeEach(() => {
    observeCallback = null;
    
    // Mock IntersectionObserver
    mockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
      observeCallback = callback;
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      };
    });

    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  it('should return ref and isVisible state', () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isVisible).toBe('boolean');
  });

  it('should accept custom options', () => {
    const { result } = renderHook(() => 
      useScrollAnimation({ 
        threshold: 0.5, 
        rootMargin: '50px',
        triggerOnce: false 
      })
    );

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isVisible).toBe('boolean');
  });

  it('should handle missing IntersectionObserver gracefully', () => {
    // Remove IntersectionObserver
    const originalIO = global.IntersectionObserver;
    (global as any).IntersectionObserver = undefined;

    const { result } = renderHook(() => useScrollAnimation());

    // Should have ref defined even without IntersectionObserver
    expect(result.current.ref).toBeDefined();
    
    // Restore
    global.IntersectionObserver = originalIO;
  });
});
