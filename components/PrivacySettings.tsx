'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Check, X } from 'lucide-react'
import { 
  getConsentState, 
  grantConsent, 
  declineConsent, 
  withdrawConsent,
  onConsentChange 
} from '@/lib/consent-manager'

/**
 * PrivacySettings Component
 * 
 * Allows users to view and manage their privacy and consent preferences.
 * Provides options to grant, decline, or withdraw consent for analytics.
 */
export default function PrivacySettings() {
  const [consentState, setConsentState] = useState<{
    hasResponded: boolean
    consentGiven: boolean
    timestamp?: number
  }>({
    hasResponded: false,
    consentGiven: false,
    timestamp: undefined,
  })
  const [isLoading, setIsLoading] = useState(false)

  // Load consent state on mount
  useEffect(() => {
    const state = getConsentState()
    setConsentState({
      hasResponded: state.hasResponded,
      consentGiven: state.consentGiven,
      timestamp: state.timestamp,
    })

    // Listen for consent changes
    const cleanup = onConsentChange((consentGiven) => {
      const updatedState = getConsentState()
      setConsentState({
        hasResponded: updatedState.hasResponded,
        consentGiven: updatedState.consentGiven,
        timestamp: updatedState.timestamp,
      })
    })

    return cleanup
  }, [])

  /**
   * Handle granting consent
   */
  const handleGrantConsent = () => {
    setIsLoading(true)
    grantConsent()
    // Page will reload, so no need to reset loading state
  }

  /**
   * Handle declining consent
   */
  const handleDeclineConsent = () => {
    setIsLoading(true)
    declineConsent()
    setIsLoading(false)
    // Update state immediately
    const updatedState = getConsentState()
    setConsentState({
      hasResponded: updatedState.hasResponded,
      consentGiven: updatedState.consentGiven,
      timestamp: updatedState.timestamp,
    })
  }

  /**
   * Handle withdrawing consent
   */
  const handleWithdrawConsent = () => {
    if (confirm('Are you sure you want to withdraw your consent? This will clear all analytics data and reload the page.')) {
      setIsLoading(true)
      withdrawConsent()
      // Page will reload, so no need to reset loading state
    }
  }

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp?: number): string => {
    if (!timestamp) return 'N/A'
    
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your data and consent preferences</p>
        </div>
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-muted/30 rounded-2xl">
        <h3 className="text-sm font-semibold text-foreground mb-3">Current Status</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Analytics Consent:</span>
            <div className="flex items-center gap-2">
              {consentState.consentGiven ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">Granted</span>
                </>
              ) : consentState.hasResponded ? (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-500">Declined</span>
                </>
              ) : (
                <span className="text-sm font-medium text-muted-foreground">Not Set</span>
              )}
            </div>
          </div>

          {consentState.timestamp && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated:</span>
              <span className="text-sm font-medium text-foreground">
                {formatTimestamp(consentState.timestamp)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Information */}
      <div className="mb-6 p-4 bg-primary/5 rounded-2xl">
        <h3 className="text-sm font-semibold text-foreground mb-2">What We Track</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Page views and navigation patterns</li>
          <li>• Time spent on pages</li>
          <li>• Button clicks and interactions</li>
          <li>• Form submissions (no personal data)</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          All data is anonymized and we never collect personally identifiable information.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {!consentState.hasResponded && (
          <>
            <Button
              onClick={handleGrantConsent}
              disabled={isLoading}
              className="w-full rounded-2xl py-2.5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? 'Processing...' : 'Grant Consent'}
            </Button>
            <Button
              onClick={handleDeclineConsent}
              disabled={isLoading}
              variant="outline"
              className="w-full rounded-2xl py-2.5 font-semibold"
            >
              Decline Consent
            </Button>
          </>
        )}

        {consentState.hasResponded && !consentState.consentGiven && (
          <Button
            onClick={handleGrantConsent}
            disabled={isLoading}
            className="w-full rounded-2xl py-2.5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? 'Processing...' : 'Grant Consent'}
          </Button>
        )}

        {consentState.consentGiven && (
          <Button
            onClick={handleWithdrawConsent}
            disabled={isLoading}
            variant="destructive"
            className="w-full rounded-2xl py-2.5 font-semibold"
          >
            {isLoading ? 'Processing...' : 'Withdraw Consent & Clear Data'}
          </Button>
        )}
      </div>

      {/* Additional Info */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Changes to your consent preferences will take effect immediately.
        {consentState.consentGiven && ' Withdrawing consent will clear all stored analytics data.'}
      </p>
    </div>
  )
}
