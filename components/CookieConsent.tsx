'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'
import { hasUserResponded, grantConsent, declineConsent } from '@/lib/consent-manager'

/**
 * CookieConsent Component
 * 
 * Displays a GDPR-compliant cookie consent banner on first visit.
 * Stores user's consent choice in localStorage and only shows if user hasn't responded.
 * Fully accessible with keyboard navigation and ARIA labels.
 */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const acceptButtonRef = useRef<HTMLButtonElement>(null)

  // Check if user has already responded to consent
  useEffect(() => {
    const responded = hasUserResponded()
    
    // Show banner only if user hasn't responded
    if (!responded) {
      // Small delay for better UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  // Focus management - focus accept button when banner appears
  useEffect(() => {
    if (isVisible && acceptButtonRef.current) {
      acceptButtonRef.current.focus()
    }
  }, [isVisible])

  // Handle keyboard navigation (Escape to close)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDecline()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible])

  // Trap focus within banner when visible
  useEffect(() => {
    if (isVisible && bannerRef.current) {
      const focusableElements = bannerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [isVisible])

  /**
   * Handle accept consent
   */
  const handleAccept = () => {
    closeBanner()
    // Use consent manager to grant consent (includes page reload)
    grantConsent()
  }

  /**
   * Handle decline consent
   */
  const handleDecline = () => {
    closeBanner()
    // Use consent manager to decline consent
    declineConsent()
  }

  /**
   * Close banner with animation
   */
  const closeBanner = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsAnimatingOut(false)
    }, 300)
  }

  if (!isVisible) {
    return null
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-background/60 backdrop-blur-sm z-[99998] transition-opacity duration-300 ${
          isAnimatingOut ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Cookie consent banner */}
      <div
        ref={bannerRef}
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        aria-modal="true"
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] w-[95%] max-w-2xl transition-all duration-300 ${
          isAnimatingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Glassmorphic container matching site design */}
        <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header with icon */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              
              <div className="flex-1">
                <h2
                  id="cookie-consent-title"
                  className="text-lg font-semibold text-foreground mb-2"
                >
                  We value your privacy
                </h2>
                <p
                  id="cookie-consent-description"
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  We use cookies and analytics to improve your experience on our website. 
                  This helps us understand how visitors interact with our content and make improvements. 
                  Your data is anonymized and we respect your privacy.{' '}
                  <Link
                    href={"/privacy" as any}
                    className="text-primary hover:underline focus-visible-ring rounded"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleDecline}
                aria-label="Decline cookies and close banner"
                className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-muted transition-colors focus-visible-ring"
              >
                <X className="w-4 h-4 mx-auto text-muted-foreground" aria-hidden="true" />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                ref={acceptButtonRef}
                onClick={handleAccept}
                className="flex-1 sm:flex-initial rounded-2xl px-6 py-2.5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 focus-visible-ring transition-all duration-200 hover:scale-[1.02]"
                aria-label="Accept cookies and enable analytics"
              >
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="flex-1 sm:flex-initial rounded-2xl px-6 py-2.5 font-semibold border-border/50 hover:bg-muted focus-visible-ring transition-all duration-200"
                aria-label="Decline cookies and disable analytics"
              >
                Decline
              </Button>
            </div>

            {/* Additional info */}
            <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left">
              You can change your preferences at any time in our privacy settings.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
