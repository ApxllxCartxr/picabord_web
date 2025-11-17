/**
 * Example usage of useAnalytics hook
 * 
 * This file demonstrates how to use the useAnalytics hook in various scenarios.
 * Delete this file after reviewing the examples.
 */

'use client'

import { useAnalytics } from './use-analytics'

/**
 * Example 1: Track button clicks
 */
export function ContactButton() {
  const { trackEvent } = useAnalytics()

  const handleClick = () => {
    trackEvent('contact_button_click', {
      location: 'hero_section',
      page: window.location.pathname
    })
  }

  return (
    <button onClick={handleClick}>
      Contact Us
    </button>
  )
}

/**
 * Example 2: Track form submissions as conversions
 */
export function ContactForm() {
  const { trackConversion, trackEvent } = useAnalytics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Track form submission as conversion
    trackConversion('contact_form_submit', 1)

    // Also track as regular event with additional data
    trackEvent('form_submit', {
      form_type: 'contact',
      source: 'contact_page'
    })

    // Submit form...
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}

/**
 * Example 3: Track product link clicks
 */
export function ProductLink({ product }: { product: string }) {
  const { trackEvent } = useAnalytics()

  const handleClick = () => {
    trackEvent('product_link_click', {
      product_name: product,
      page: window.location.pathname
    })
  }

  return (
    <a href={`/${product.toLowerCase()}`} onClick={handleClick}>
      Learn more about {product}
    </a>
  )
}

/**
 * Example 4: Track social shares
 */
export function ShareButton({ platform, url, title }: { 
  platform: string
  url: string
  title: string 
}) {
  const { trackEvent } = useAnalytics()

  const handleShare = () => {
    trackEvent('social_share', {
      platform,
      url,
      title
    })

    // Open share dialog...
  }

  return (
    <button onClick={handleShare}>
      Share on {platform}
    </button>
  )
}

/**
 * Example 5: Track external link clicks
 */
export function ExternalLink({ href, children }: { 
  href: string
  children: React.ReactNode 
}) {
  const { trackEvent } = useAnalytics()

  const handleClick = () => {
    trackEvent('external_link_click', {
      destination: href,
      page: window.location.pathname
    })
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

/**
 * Example 6: Track page views manually (usually handled by AnalyticsProvider)
 */
export function CustomPageView() {
  const { trackPageView } = useAnalytics()

  const handleNavigation = (url: string) => {
    // Manually track page view if needed
    trackPageView(url)
  }

  return (
    <button onClick={() => handleNavigation('/custom-page')}>
      Go to Custom Page
    </button>
  )
}

/**
 * Example 7: Track blog-specific events
 */
export function BlogPost({ slug, category }: { slug: string; category: string }) {
  const { trackEvent } = useAnalytics()

  const handleCategoryClick = () => {
    trackEvent('blog_category_filter', {
      category,
      post_slug: slug
    })
  }

  const handleSearch = (query: string) => {
    trackEvent('blog_search', {
      query,
      results_count: 0 // Update with actual count
    })
  }

  return (
    <div>
      <button onClick={handleCategoryClick}>
        {category}
      </button>
      <input 
        type="search" 
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search posts..."
      />
    </div>
  )
}

/**
 * Example 8: Track scroll depth
 */
export function ScrollTracker() {
  const { trackEvent } = useAnalytics()

  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

    if (scrollPercentage >= 25 && scrollPercentage < 50) {
      trackEvent('scroll_depth', { depth: '25%' })
    } else if (scrollPercentage >= 50 && scrollPercentage < 75) {
      trackEvent('scroll_depth', { depth: '50%' })
    } else if (scrollPercentage >= 75 && scrollPercentage < 100) {
      trackEvent('scroll_depth', { depth: '75%' })
    } else if (scrollPercentage >= 100) {
      trackEvent('scroll_depth', { depth: '100%' })
    }
  }

  return null // This would be used in a useEffect
}
