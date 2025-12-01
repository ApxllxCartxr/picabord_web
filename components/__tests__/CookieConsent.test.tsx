import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import CookieConsent from '../CookieConsent';

describe('CookieConsent', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Mock window.location.reload
    delete (window as any).location;
    (window as any).location = { reload: vi.fn() };

    // Clear localStorage before each test
    localStorageMock.clear();

    // Mock timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should not render if user has already responded', () => {
    localStorageMock.setItem('analytics-consent-responded', 'true');
    
    render(<CookieConsent />);
    
    // Fast-forward timers
    vi.advanceTimersByTime(1500);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render banner if user has not responded', async () => {
    render(<CookieConsent />);
    
    // Fast-forward past the initial delay (async to work with modern fake timers)
    await vi.advanceTimersByTimeAsync(1500);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    expect(screen.getByText('We value your privacy')).toBeInTheDocument();
  });

  it('should have accessible labels and ARIA attributes', async () => {
    render(<CookieConsent />);
    
    await vi.advanceTimersByTimeAsync(1500);
    
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'cookie-consent-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'cookie-consent-description');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });

  it('should store consent and reload when accept is clicked', async () => {
    render(<CookieConsent />);
    
    await vi.advanceTimersByTimeAsync(1500);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    const acceptButton = screen.getByRole('button', { name: /accept cookies/i });
    fireEvent.click(acceptButton);
    
    expect(localStorageMock.getItem('analytics-consent')).toBe('true');
    expect(localStorageMock.getItem('analytics-consent-responded')).toBe('true');
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should store decline and close banner when decline is clicked', async () => {
    render(<CookieConsent />);
    
    await vi.advanceTimersByTimeAsync(1500);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    const declineButton = screen.getByRole('button', { name: /decline cookies and disable analytics/i });
    fireEvent.click(declineButton);
    
    expect(localStorageMock.getItem('analytics-consent')).toBe('false');
    expect(localStorageMock.getItem('analytics-consent-responded')).toBe('true');
    
    // Fast-forward animation
    vi.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should close banner when X button is clicked', async () => {
    render(<CookieConsent />);
    
    await vi.advanceTimersByTimeAsync(1500);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    const closeButton = screen.getByRole('button', { name: /decline cookies and close banner/i });
    fireEvent.click(closeButton);
    
    expect(localStorageMock.getItem('analytics-consent')).toBe('false');
    expect(localStorageMock.getItem('analytics-consent-responded')).toBe('true');
  });

  it('should have a link to privacy policy', async () => {
    render(<CookieConsent />);
    
    await vi.advanceTimersByTimeAsync(1500);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    const privacyLink = screen.getByRole('link', { name: /learn more/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
