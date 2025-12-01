/**
 * Analytics Configuration
 * 
 * This file contains the configuration for Plausible Analytics integration.
 * Environment variables are loaded from .env.local
 */

export const analyticsConfig = {
  /**
   * The domain registered in Plausible Analytics
   * Must match exactly what's configured in your Plausible account
   */
  domain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || '',

  /**
   * URL to the Plausible tracking script
   * Options:
   * - https://plausible.io/js/script.js (basic tracking)
   * - https://plausible.io/js/script.tagged-events.js (custom events)
   * - https://plausible.io/js/script.outbound-links.js (outbound link tracking)
   * - https://plausible.io/js/script.tagged-events.outbound-links.js (both)
   * 
   * Using tagged-events version to support custom properties on page views
   */
  scriptSrc: process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC || 'https://plausible.io/js/script.tagged-events.js',

  /**
   * Enable or disable analytics
   * Set to false in development to avoid tracking test data
   */
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',

  /**
   * Custom Plausible domain (for self-hosted instances)
   * Leave empty if using Plausible Cloud
   */
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || undefined,
} as const;

/**
 * Validate analytics configuration
 * Logs warnings if configuration is incomplete
 */
export function validateAnalyticsConfig(): boolean {
  if (!analyticsConfig.enabled) {
    console.info('[Analytics] Analytics is disabled');
    return false;
  }

  if (!analyticsConfig.domain) {
    console.warn('[Analytics] NEXT_PUBLIC_ANALYTICS_DOMAIN is not set');
    return false;
  }

  if (!analyticsConfig.scriptSrc) {
    console.warn('[Analytics] NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC is not set');
    return false;
  }

  console.info('[Analytics] Configuration validated successfully');
  return true;
}

/**
 * Get the data-domain attribute for the Plausible script
 */
export function getAnalyticsDomain(): string {
  return analyticsConfig.domain;
}

/**
 * Get the script source URL
 */
export function getScriptSrc(): string {
  return analyticsConfig.scriptSrc;
}

/**
 * Check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  return analyticsConfig.enabled && !!analyticsConfig.domain;
}
