/**
 * Consent Management System
 * 
 * Provides centralized consent management for analytics and cookies.
 * Handles checking, storing, and withdrawing user consent in compliance with GDPR.
 */

/**
 * Consent state interface
 */
export interface ConsentState {
  hasResponded: boolean
  consentGiven: boolean
  timestamp?: number
}

/**
 * Storage keys for consent data
 */
const STORAGE_KEYS = {
  CONSENT: 'analytics-consent',
  RESPONDED: 'analytics-consent-responded',
  TIMESTAMP: 'analytics-consent-timestamp',
} as const

/**
 * Check if user has responded to consent banner
 * @returns true if user has accepted or declined consent
 */
export function hasUserResponded(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const responded = localStorage.getItem(STORAGE_KEYS.RESPONDED)
    return responded === 'true'
  } catch (error) {
    console.error('[Consent] Error checking if user responded:', error)
    return false
  }
}

/**
 * Check if user has given consent for analytics
 * @returns true if user has explicitly accepted consent
 */
export function hasConsent(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const consent = localStorage.getItem(STORAGE_KEYS.CONSENT)
    return consent === 'true'
  } catch (error) {
    console.error('[Consent] Error checking consent:', error)
    return false
  }
}

/**
 * Get the full consent state
 * @returns ConsentState object with all consent information
 */
export function getConsentState(): ConsentState {
  if (typeof window === 'undefined') {
    return {
      hasResponded: false,
      consentGiven: false,
    }
  }

  try {
    const hasResponded = hasUserResponded()
    const consentGiven = hasConsent()
    const timestampStr = localStorage.getItem(STORAGE_KEYS.TIMESTAMP)
    const timestamp = timestampStr ? parseInt(timestampStr, 10) : undefined

    return {
      hasResponded,
      consentGiven,
      timestamp,
    }
  } catch (error) {
    console.error('[Consent] Error getting consent state:', error)
    return {
      hasResponded: false,
      consentGiven: false,
    }
  }
}

/**
 * Grant consent for analytics
 * Stores consent in localStorage and triggers page reload to initialize analytics
 */
export function grantConsent(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const timestamp = Date.now()
    localStorage.setItem(STORAGE_KEYS.CONSENT, 'true')
    localStorage.setItem(STORAGE_KEYS.RESPONDED, 'true')
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, timestamp.toString())

    console.info('[Consent] Consent granted')

    // Dispatch custom event for components to react to consent change
    window.dispatchEvent(new CustomEvent('consent-changed', {
      detail: { consentGiven: true }
    }))

    // Reload page to initialize analytics
    window.location.reload()
  } catch (error) {
    console.error('[Consent] Error granting consent:', error)
  }
}

/**
 * Decline consent for analytics
 * Stores declined consent in localStorage
 */
export function declineConsent(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const timestamp = Date.now()
    localStorage.setItem(STORAGE_KEYS.CONSENT, 'false')
    localStorage.setItem(STORAGE_KEYS.RESPONDED, 'true')
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, timestamp.toString())

    console.info('[Consent] Consent declined')

    // Dispatch custom event for components to react to consent change
    window.dispatchEvent(new CustomEvent('consent-changed', {
      detail: { consentGiven: false }
    }))
  } catch (error) {
    console.error('[Consent] Error declining consent:', error)
  }
}

/**
 * Withdraw previously given consent
 * Removes consent, clears analytics data, and resets consent state
 */
export function withdrawConsent(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    // Clear consent data
    localStorage.removeItem(STORAGE_KEYS.CONSENT)
    localStorage.removeItem(STORAGE_KEYS.RESPONDED)
    localStorage.removeItem(STORAGE_KEYS.TIMESTAMP)

    // Clear any Plausible-specific data
    clearAnalyticsData()

    console.info('[Consent] Consent withdrawn and data cleared')

    // Dispatch custom event for components to react to consent change
    window.dispatchEvent(new CustomEvent('consent-changed', {
      detail: { consentGiven: false }
    }))

    // Reload page to disable analytics
    window.location.reload()
  } catch (error) {
    console.error('[Consent] Error withdrawing consent:', error)
  }
}

/**
 * Clear analytics-related data from browser storage
 * This includes localStorage, sessionStorage, and cookies
 */
export function clearAnalyticsData(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    // Clear Plausible localStorage data
    const plausibleKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('plausible_') || key.includes('analytics')
    )
    
    plausibleKeys.forEach(key => {
      if (key !== STORAGE_KEYS.CONSENT && 
          key !== STORAGE_KEYS.RESPONDED && 
          key !== STORAGE_KEYS.TIMESTAMP) {
        localStorage.removeItem(key)
      }
    })

    // Clear Plausible sessionStorage data
    const plausibleSessionKeys = Object.keys(sessionStorage).filter(key => 
      key.startsWith('plausible_') || key.includes('analytics')
    )
    
    plausibleSessionKeys.forEach(key => {
      sessionStorage.removeItem(key)
    })

    // Clear Plausible cookies
    clearAnalyticsCookies()

    console.info('[Consent] Analytics data cleared')
  } catch (error) {
    console.error('[Consent] Error clearing analytics data:', error)
  }
}

/**
 * Clear analytics-related cookies
 */
function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') {
    return
  }

  try {
    // Get all cookies
    const cookies = document.cookie.split(';')

    // Clear cookies that might be set by analytics
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim()
      
      // Clear if it's an analytics-related cookie
      if (cookieName.startsWith('plausible_') || 
          cookieName.startsWith('_ga') || 
          cookieName.includes('analytics')) {
        // Set cookie to expire in the past
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`
      }
    })
  } catch (error) {
    console.error('[Consent] Error clearing cookies:', error)
  }
}

/**
 * Reset consent state (for testing purposes)
 * This will show the consent banner again on next page load
 */
export function resetConsentState(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.CONSENT)
    localStorage.removeItem(STORAGE_KEYS.RESPONDED)
    localStorage.removeItem(STORAGE_KEYS.TIMESTAMP)

    console.info('[Consent] Consent state reset')

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('consent-changed', {
      detail: { consentGiven: false }
    }))
  } catch (error) {
    console.error('[Consent] Error resetting consent state:', error)
  }
}

/**
 * Listen for consent changes
 * @param callback Function to call when consent changes
 * @returns Cleanup function to remove the event listener
 */
export function onConsentChange(callback: (consentGiven: boolean) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{ consentGiven: boolean }>
    callback(customEvent.detail.consentGiven)
  }

  window.addEventListener('consent-changed', handler)

  return () => {
    window.removeEventListener('consent-changed', handler)
  }
}
