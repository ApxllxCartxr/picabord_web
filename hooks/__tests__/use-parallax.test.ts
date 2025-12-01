import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useParallax } from '../use-parallax';

describe('useParallax', () => {
  beforeEach(() => {
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => {
      cb(0);
      return 0;
    }) as any;

    global.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return ref and transform state', () => {
    const { result } = renderHook(() => useParallax());

    expect(result.current.ref).toBeDefined();
    expect(result.current.transform).toBeDefined();
    expect(typeof result.current.transform).toBe('string');
  });

  it('should initialize with default transform', () => {
    const { result } = renderHook(() => useParallax());

    expect(result.current.transform).toBe('translate3d(0, 0, 0)');
  });

  it('should accept custom options', () => {
    const { result } = renderHook(() => 
      useParallax({ 
        speed: 0.5, 
        direction: 'horizontal' 
      })
    );

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.transform).toBe('string');
  });

  it('should return transform string in correct format', () => {
    const { result } = renderHook(() => useParallax());

    // Should match translate3d format
    expect(result.current.transform).toMatch(/translate3d\([^)]+\)/);
  });
});
