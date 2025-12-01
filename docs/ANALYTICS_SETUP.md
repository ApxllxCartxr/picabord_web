# Analytics Setup Guide

## Overview

This project uses **Plausible Analytics** for privacy-focused website analytics. Plausible is:
- GDPR, CCPA, and PECR compliant by default
- Lightweight (< 1KB script)
- No cookies or personal data collection
- Open source and transparent
- Provides essential metrics without invasive tracking

## Why Plausible?

We chose Plausible Analytics over Google Analytics 4 for several reasons:

1. **Privacy-First**: No cookies, no personal data collection, no cross-site tracking
2. **GDPR Compliant**: Doesn't require cookie consent banners for basic analytics
3. **Lightweight**: 45x smaller than Google Analytics (< 1KB vs 45KB)
4. **Simple**: Clean, easy-to-understand dashboard
5. **Performance**: Minimal impact on page load times
6. **Transparent**: Open source and auditable

## Setup Instructions

### 1. Create Plausible Account

1. Go to [https://plausible.io/register](https://plausible.io/register)
2. Sign up for an account (30-day free trial, then €9/month for up to 10k monthly pageviews)
3. Add your website domain: `picabord.space`

### 2. Configure Environment Variables

The environment variables are already set up in `.env.local`:

```env
NEXT_PUBLIC_ANALYTICS_DOMAIN=picabord.space
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://plausible.io/js/script.js
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

**Important**: 
- `.env.local` is gitignored and contains your actual configuration
- `.env.example` is committed and shows the required variables
- For production deployment, set these variables in your hosting platform (Vercel, Netlify, etc.)

### 3. Verify Domain in Plausible

After creating your account:
1. Add `picabord.space` as a site in Plausible dashboard
2. Plausible will provide you with a tracking script
3. The script is already configured in this project (see next steps)

### 4. Implementation (Already Done)

The analytics integration will be implemented in the following tasks:
- Task 9.2: Create AnalyticsProvider component
- Task 9.3: Create useAnalytics hook
- Task 10: Implement cookie consent system (optional for Plausible)

## Environment Variables Reference

### Required Variables

- `NEXT_PUBLIC_ANALYTICS_DOMAIN`: Your website domain registered in Plausible
  - Example: `picabord.space`
  - This must match exactly what you registered in Plausible

- `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC`: URL to Plausible tracking script
  - Default: `https://plausible.io/js/script.tagged-events.js` (supports custom properties)
  - Basic tracking: `https://plausible.io/js/script.js`
  - For outbound links: `https://plausible.io/js/script.outbound-links.js`
  - Combined: `https://plausible.io/js/script.tagged-events.outbound-links.js`

- `NEXT_PUBLIC_ANALYTICS_ENABLED`: Enable/disable analytics
  - Set to `true` in production
  - Set to `false` in development to avoid tracking test data

### Optional Variables

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: Custom Plausible domain (if self-hosting)
  - Only needed if you're self-hosting Plausible
  - Example: `plausible.yourdomain.com`

## Deployment Configuration

### Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:
   ```
   NEXT_PUBLIC_ANALYTICS_DOMAIN=picabord.space
   NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://plausible.io/js/script.js
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   ```
4. Redeploy your application

### Netlify

1. Go to Site settings > Build & deploy > Environment
2. Add the environment variables listed above
3. Trigger a new deploy

### Other Platforms

Consult your hosting platform's documentation for setting environment variables.

## Testing Analytics

### Development Testing

1. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=false` in `.env.local` during development
2. This prevents test data from polluting your analytics

### Production Testing

1. After deployment, visit your website
2. Open Plausible dashboard
3. You should see real-time visitor data within a few seconds
4. Check that page views are being tracked correctly

### Verify Script Loading

1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "script"
4. Look for `script.js` from `plausible.io`
5. Verify it loads successfully (200 status)

## Features Available

### Basic Tracking (Automatic)

- Page views (with URL and title)
- Unique visitors vs returning visitors
- Bounce rate
- Visit duration
- Traffic sources
- Devices and browsers
- Countries and regions

**Enhanced Page View Tracking**:
- Automatically tracks all page views on route changes
- Includes page URL with query parameters
- Includes page title from document
- Distinguishes between unique and returning visitors using localStorage
- Respects user consent preferences

### Custom Events (To Be Implemented)

Custom events will be implemented in task 11:
- Contact form submissions
- CTA button clicks
- Social media shares
- Blog post interactions
- External link clicks

## Privacy Compliance

### GDPR Compliance

Plausible is GDPR compliant by default:
- No cookies used
- No personal data collected
- No cross-site tracking
- Data stored in EU (if using Plausible Cloud)

### Cookie Consent

**Note**: Plausible doesn't require cookie consent banners because it doesn't use cookies. However, we're implementing a consent system (task 10) for:
- User transparency
- Future extensibility
- Best practices

### Data Retention

Plausible retains data indefinitely by default. You can configure this in your Plausible account settings.

## Troubleshooting

### Analytics Not Showing Data

1. **Check environment variables**: Ensure `NEXT_PUBLIC_ANALYTICS_ENABLED=true`
2. **Verify domain**: Domain in `.env.local` must match Plausible dashboard
3. **Check script loading**: Open DevTools and verify script loads
4. **Ad blockers**: Some ad blockers block Plausible (expected behavior)
5. **Wait time**: Real-time data appears within seconds, but aggregated stats may take a few minutes

### Script Not Loading

1. **Check CSP headers**: Ensure Content Security Policy allows Plausible domain
2. **Check network**: Verify no network errors in DevTools
3. **Check script URL**: Ensure `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` is correct

### Development Data in Production

1. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=false` in development
2. Use different domains for staging and production
3. Filter out internal traffic in Plausible settings

## Cost Considerations

### Plausible Pricing (as of 2025)

- **10k pageviews/month**: €9/month
- **100k pageviews/month**: €19/month
- **1M pageviews/month**: €69/month
- **10M pageviews/month**: €149/month

### Alternative: Self-Hosting

Plausible is open source and can be self-hosted:
- Free (except hosting costs)
- Full control over data
- Requires server maintenance
- Docker-based deployment

See: [https://plausible.io/docs/self-hosting](https://plausible.io/docs/self-hosting)

## Resources

- [Plausible Documentation](https://plausible.io/docs)
- [Plausible API Reference](https://plausible.io/docs/stats-api)
- [Custom Events Guide](https://plausible.io/docs/custom-event-goals)
- [Privacy Policy Generator](https://plausible.io/privacy-policy-generator)

## Page View Tracking

### Automatic Page View Tracking

Page views are tracked automatically by the `AnalyticsProvider` component:

- **Triggers**: Automatically tracks on every route change
- **URL**: Includes full path with query parameters
- **Title**: Captures the page title from `document.title`
- **Visitor Type**: Distinguishes between unique and returning visitors
- **Consent**: Only tracks when user has given consent

### How It Works

1. The `AnalyticsProvider` listens to Next.js route changes using `usePathname()` and `useSearchParams()`
2. When a route change is detected, it captures:
   - Full URL path with query parameters
   - Page title from `document.title`
   - Visitor type (unique or returning) based on localStorage flag
3. Sends the data to Plausible with custom properties
4. Marks the visitor as "returning" for subsequent page views

### Visitor Type Tracking

The system tracks whether a visitor is unique or returning:

- **Unique Visitor**: First-time visitor (no localStorage flag)
- **Returning Visitor**: Has visited before (localStorage flag exists)
- **Storage Key**: `plausible_visited` in localStorage
- **Privacy**: Stored locally, not sent to server

### Custom Page View Tracking

You can also manually track page views using the `useAnalytics` hook:

```tsx
const { trackPageView } = useAnalytics()

// Track with URL only
trackPageView('/custom-page')

// Track with URL and title
trackPageView('/custom-page', 'Custom Page Title')
```

## Using the Analytics Hook

### Basic Usage

The `useAnalytics` hook provides three main functions for tracking:

```tsx
import { useAnalytics } from '@/hooks/use-analytics'

function MyComponent() {
  const { trackEvent, trackPageView, trackConversion } = useAnalytics()

  // Track a custom event
  const handleClick = () => {
    trackEvent('button_click', {
      location: 'hero',
      page: '/about'
    })
  }

  // Track a conversion
  const handleFormSubmit = () => {
    trackConversion('contact_form_submit', 1)
  }

  // Track a page view (usually automatic)
  const handleNavigation = () => {
    trackPageView('/custom-page')
  }

  return <button onClick={handleClick}>Click Me</button>
}
```

### Hook Features

- **Automatic consent checking**: Only tracks when user has given consent
- **No-op when disabled**: Returns safe no-op functions when analytics is disabled
- **Error handling**: Gracefully handles errors without breaking your app
- **TypeScript support**: Full type definitions included

### Common Use Cases

#### 1. Track Button Clicks
```tsx
trackEvent('contact_button_click', {
  location: 'hero_section',
  page: window.location.pathname
})
```

#### 2. Track Form Submissions
```tsx
trackConversion('contact_form_submit', 1)
```

#### 3. Track Social Shares
```tsx
trackEvent('social_share', {
  platform: 'twitter',
  url: window.location.href,
  title: 'Blog Post Title'
})
```

#### 4. Track External Links

External link tracking is automatically enabled via the `ExternalLinkTracker` component. All clicks on external links (links pointing to different domains) are automatically tracked with the following properties:

- `destination`: The URL being clicked
- `page`: The current page path
- `text`: The link text content
- `target`: The link target attribute

The tracker is integrated into the `Providers` component and uses event delegation for efficient tracking.

**Manual tracking** (if needed):
```tsx
trackEvent('external_link_click', {
  destination: 'https://example.com',
  page: window.location.pathname,
  text: 'Link text',
  target: '_blank'
})
```

#### 5. Track Blog Interactions
```tsx
trackEvent('blog_category_filter', {
  category: 'Hardware',
  post_slug: 'getting-started'
})
```

See `hooks/use-analytics.example.tsx` for more detailed examples.

## Next Steps

After completing this setup:
1. ✅ Task 9.1: Choose and configure analytics platform (DONE)
2. ✅ Task 9.2: Create AnalyticsProvider component (DONE)
3. ✅ Task 9.3: Create useAnalytics hook (DONE)
4. ⏭️ Task 10: Implement cookie consent system
5. ⏭️ Task 11: Implement analytics event tracking

## Support

For issues with:
- **Plausible service**: Contact [Plausible support](https://plausible.io/contact)
- **Implementation**: Check this documentation or create an issue in the project repository
