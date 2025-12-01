'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { analyticsConfig, isAnalyticsEnabled } from '@/lib/analytics.config'
import { hasConsent, onConsentChange } from '@/lib/consent-manager'

/**
 * Analytics context type
 */
interface AnalyticsContextType {
  isEnabled: boolean
  consentGiven: boolean
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (url: string, title?: string) => void
}

/**
 * Analytics context
 */
const AnalyticsContext = createContext<AnalyticsContextType>({
  isEnabled: false,
  consentGiven: false,
  trackEvent: () => {},
  trackPageView: () => {},
})

/**
 * Hook to access analytics context
 */
export function useAnalyticsContext() {
  return useContext(AnalyticsContext)
}

/**
 * Props for AnalyticsProvider
 */
interface AnalyticsProviderProps {
  children: React.ReactNode
}

/**
 * AnalyticsProvider Component
 * 
 * Initializes Plausible Analytics and provides tracking functions to child components.
 * Respects user consent preferences and only tracks when consent is given.
 * Automatically tracks page views on route changes.
 */
export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consentGiven, setConsentGiven] = useState<boolean>(false)
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false)

  // Check for consent on mount and listen for changes
  useEffect(() => {
    // Check initial consent state
    const consent = hasConsent()
    setConsentGiven(consent)

    // Listen for consent changes
    const cleanup = onConsentChange((consentGiven) => {
      setConsentGiven(consentGiven)
    })

    return cleanup
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (!isAnalyticsEnabled() || !consentGiven || !scriptLoaded) {
      return
    }

    // Construct full URL with search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Get page title from document
    const pageTitle = typeof document !== 'undefined' ? document.title : ''
    
    // Track page view using Plausible with title
    trackPageView(url, pageTitle)
  }, [pathname, searchParams, consentGiven, scriptLoaded])

  /**
   * Track a custom event
   */
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!isAnalyticsEnabled() || !consentGiven || !scriptLoaded) {
      return
    }

    // Check if plausible function exists
    if (typeof window !== 'undefined' && (window as any).plausible) {
      try {
        if (properties) {
          (window as any).plausible(eventName, { props: properties })
        } else {
          (window as any).plausible(eventName)
        }
      } catch (error) {
        console.error('[Analytics] Error tracking event:', error)
      }
    }
  }

  /**
   * Track a page view
   */
  const trackPageView = (url: string, title?: string) => {
    if (!isAnalyticsEnabled() || !consentGiven || !scriptLoaded) {
      return
    }

    // Plausible automatically tracks page views, but we can manually trigger if needed
    if (typeof window !== 'undefined' && (window as any).plausible) {
      try {
        const props: Record<string, any> = {}
        
        // Include page title if provided
        if (title) {
          props.title = title
        }
        
        // Track visitor type (unique vs returning)
        // Plausible handles this automatically, but we can add custom properties
        const isReturningVisitor = localStorage.getItem('plausible_visited') === 'true'
        props.visitor_type = isReturningVisitor ? 'returning' : 'unique'
        
        // Mark as visited for future page views
        if (!isReturningVisitor) {
          localStorage.setItem('plausible_visited', 'true')
        }
        
        // Track page view with properties
        (window as any).plausible('pageview', { 
          u: url,
          props: props
        })
      } catch (error) {
        console.error('[Analytics] Error tracking page view:', error)
      }
    }
  }

  /**
   * Handle script load
   */
  const handleScriptLoad = () => {
    setScriptLoaded(true)
    console.info('[Analytics] Script loaded successfully')
  }

  /**
   * Handle script error
   */
  const handleScriptError = () => {
    console.error('[Analytics] Failed to load analytics script')
  }

  const contextValue: AnalyticsContextType = {
    isEnabled: isAnalyticsEnabled() && consentGiven,
    consentGiven,
    trackEvent,
    trackPageView,
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {/* Load Plausible script only if analytics is enabled and consent is given */}
      {isAnalyticsEnabled() && consentGiven && (
        <Script
          src={analyticsConfig.scriptSrc}
          data-domain={analyticsConfig.domain}
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        />
      )}
      {children}
    </AnalyticsContext.Provider>
  )
}
