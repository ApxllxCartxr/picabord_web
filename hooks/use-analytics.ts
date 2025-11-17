'use client'

import { useCallback } from 'react'
import { isAnalyticsEnabled } from '@/lib/analytics.config'
import { hasConsent } from '@/lib/consent-manager'

/**
 * Analytics hook interface
 */
export interface UseAnalytics {
  /**
   * Track a custom event
   * @param eventName - Name of the event to track
   * @param properties - Optional properties to attach to the event
   */
  trackEvent: (eventName: string, properties?: Record<string, any>) => void

  /**
   * Track a page view
   * @param url - URL of the page being viewed
   * @param title - Optional title of the page being viewed
   */
  trackPageView: (url: string, title?: string) => void

  /**
   * Track a conversion event
   * @param conversionName - Name of the conversion
   * @param value - Optional monetary value of the conversion
   */
  trackConversion: (conversionName: string, value?: number) => void
}

/**
 * Check if Plausible is available
 */
function isPlausibleAvailable(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).plausible === 'function'
}

/**
 * useAnalytics Hook
 * 
 * Provides analytics tracking functions that respect user consent and analytics configuration.
 * Returns no-op functions when analytics is disabled or consent is not given.
 * 
 * @example
 * ```tsx
 * const { trackEvent, trackPageView, trackConversion } = useAnalytics()
 * 
 * // Track a button click
 * trackEvent('contact_button_click', {
 *   location: 'hero_section',
 *   page: '/about'
 * })
 * 
 * // Track a form submission as conversion
 * trackConversion('contact_form_submit', 1)
 * ```
 */
export function useAnalytics(): UseAnalytics {
  /**
   * Track a custom event
   */
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    // Check if analytics is enabled and consent is given
    if (!isAnalyticsEnabled() || !hasConsent()) {
      return
    }

    // Check if Plausible is available
    if (!isPlausibleAvailable()) {
      console.warn('[Analytics] Plausible is not available yet')
      return
    }

    try {
      if (properties) {
        (window as any).plausible(eventName, { props: properties })
      } else {
        (window as any).plausible(eventName)
      }
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error)
    }
  }, [])

  /**
   * Track a page view
   */
  const trackPageView = useCallback((url: string, title?: string) => {
    // Check if analytics is enabled and consent is given
    if (!isAnalyticsEnabled() || !hasConsent()) {
      return
    }

    // Check if Plausible is available
    if (!isPlausibleAvailable()) {
      console.warn('[Analytics] Plausible is not available yet')
      return
    }

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
  }, [])

  /**
   * Track a conversion event
   */
  const trackConversion = useCallback((conversionName: string, value?: number) => {
    // Check if analytics is enabled and consent is given
    if (!isAnalyticsEnabled() || !hasConsent()) {
      return
    }

    // Check if Plausible is available
    if (!isPlausibleAvailable()) {
      console.warn('[Analytics] Plausible is not available yet')
      return
    }

    try {
      const properties: Record<string, any> = {}
      
      if (value !== undefined) {
        properties.value = value
      }

      // Track conversion as a custom event with 'conversion_' prefix
      const eventName = conversionName.startsWith('conversion_') 
        ? conversionName 
        : `conversion_${conversionName}`

      if (Object.keys(properties).length > 0) {
        (window as any).plausible(eventName, { props: properties })
      } else {
        (window as any).plausible(eventName)
      }
    } catch (error) {
      console.error('[Analytics] Error tracking conversion:', error)
    }
  }, [])

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  }
}
