'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/use-analytics'

/**
 * ExternalLinkTracker Component
 * 
 * Automatically tracks clicks on external links (links that point to domains
 * outside the current website). Uses event delegation to efficiently handle
 * all link clicks on the page.
 * 
 * External links are identified by:
 * - Having an href that starts with http:// or https://
 * - Not pointing to the current domain
 * - Having target="_blank" or rel="noopener" attributes
 */
export default function ExternalLinkTracker() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    /**
     * Check if a URL is external (points to a different domain)
     */
    const isExternalLink = (url: string): boolean => {
      try {
        // Parse the URL
        const linkUrl = new URL(url, window.location.href)
        
        // Check if it's a different domain
        return linkUrl.hostname !== window.location.hostname
      } catch {
        // If URL parsing fails, it's likely a relative link
        return false
      }
    }

    /**
     * Handle click events on links
     */
    const handleLinkClick = (event: MouseEvent) => {
      // Find the closest anchor element
      const target = event.target as HTMLElement
      const link = target.closest('a')

      // If no link found, return
      if (!link) return

      // Get the href attribute
      const href = link.getAttribute('href')
      
      // If no href or it's a hash link, return
      if (!href || href.startsWith('#')) return

      // Check if it's an external link
      if (isExternalLink(href)) {
        // Track the external link click
        trackEvent('external_link_click', {
          destination: href,
          page: window.location.pathname,
          text: link.textContent?.trim() || '',
          target: link.getAttribute('target') || '_self',
        })
      }
    }

    // Add event listener to document
    document.addEventListener('click', handleLinkClick, true)

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [trackEvent])

  // This component doesn't render anything
  return null
}
