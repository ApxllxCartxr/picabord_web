# Consent Management System

This document explains how the consent management system works and how to use it throughout the application.

## Overview

The consent management system provides a centralized way to handle user consent for analytics and cookies in compliance with GDPR and privacy regulations. It includes:

- **Consent Storage**: Stores user consent preferences in localStorage
- **Consent Checking**: Provides functions to check if consent has been given
- **Consent Management**: Functions to grant, decline, and withdraw consent
- **Data Clearing**: Automatically clears analytics data when consent is withdrawn
- **Event System**: Notifies components when consent state changes

## Core Components

### 1. Consent Manager (`lib/consent-manager.ts`)

The consent manager is the core utility that handles all consent-related operations.

#### Key Functions

```typescript
// Check if user has responded to consent banner
hasUserResponded(): boolean

// Check if user has given consent
hasConsent(): boolean

// Get full consent state
getConsentState(): ConsentState

// Grant consent (stores consent and reloads page)
grantConsent(): void

// Decline consent (stores declined state)
declineConsent(): void

// Withdraw consent (clears all data and reloads page)
withdrawConsent(): void

// Clear analytics data from storage
clearAnalyticsData(): void

// Listen for consent changes
onConsentChange(callback: (consentGiven: boolean) => void): () => void
```

#### Usage Example

```typescript
import { 
  hasConsent, 
  grantConsent, 
  withdrawConsent,
  onConsentChange 
} from '@/lib/consent-manager'

// Check if user has given consent
if (hasConsent()) {
  // Initialize analytics
}

// Grant consent
function handleAccept() {
  grantConsent() // Will reload page
}

// Withdraw consent
function handleWithdraw() {
  withdrawConsent() // Will clear data and reload page
}

// Listen for consent changes
useEffect(() => {
  const cleanup = onConsentChange((consentGiven) => {
    console.log('Consent changed:', consentGiven)
  })
  
  return cleanup
}, [])
```

### 2. Cookie Consent Banner (`components/CookieConsent.tsx`)

Displays a GDPR-compliant banner on first visit asking for consent.

**Features:**
- Shows only if user hasn't responded
- Accessible with keyboard navigation
- Focus trap for better UX
- Stores consent choice in localStorage
- Triggers page reload when consent is granted

**Usage:**

```tsx
import CookieConsent from '@/components/CookieConsent'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
```

### 3. Privacy Settings Component (`components/PrivacySettings.tsx`)

Allows users to view and manage their consent preferences.

**Features:**
- Shows current consent status
- Displays when consent was last updated
- Allows granting/declining consent
- Allows withdrawing consent and clearing data
- Real-time updates when consent changes

**Usage:**

```tsx
import PrivacySettings from '@/components/PrivacySettings'

export default function PrivacyPage() {
  return (
    <div>
      <h1>Privacy Settings</h1>
      <PrivacySettings />
    </div>
  )
}
```

### 4. Analytics Provider (`components/AnalyticsProvider.tsx`)

Initializes analytics and respects consent preferences.

**Features:**
- Checks consent on mount
- Listens for consent changes
- Only loads analytics script when consent is given
- Automatically tracks page views

**Usage:**

```tsx
import AnalyticsProvider from '@/components/AnalyticsProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
```

### 5. Analytics Hook (`hooks/use-analytics.ts`)

Provides tracking functions that respect consent.

**Features:**
- Returns no-op functions when consent not given
- Tracks events, page views, and conversions
- Automatically checks consent before tracking

**Usage:**

```tsx
import { useAnalytics } from '@/hooks/use-analytics'

export default function ContactForm() {
  const { trackEvent, trackConversion } = useAnalytics()
  
  const handleSubmit = () => {
    // Track form submission
    trackEvent('contact_form_submit', {
      form_type: 'contact',
      source: 'contact_page'
    })
    
    // Track as conversion
    trackConversion('contact_form_submit')
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

## Consent Flow

### First Visit

1. User visits the website
2. `CookieConsent` component checks if user has responded
3. If not, banner is displayed after 1 second delay
4. User clicks "Accept" or "Decline"
5. Consent choice is stored in localStorage
6. If accepted, page reloads to initialize analytics

### Subsequent Visits

1. User visits the website
2. `AnalyticsProvider` checks consent on mount
3. If consent given, analytics script is loaded
4. Page views and events are tracked automatically

### Withdrawing Consent

1. User navigates to privacy settings
2. User clicks "Withdraw Consent & Clear Data"
3. Confirmation dialog is shown
4. If confirmed:
   - Consent data is removed from localStorage
   - All analytics data is cleared (localStorage, sessionStorage, cookies)
   - Page reloads to disable analytics

## Data Storage

### localStorage Keys

- `analytics-consent`: `'true'` or `'false'`
- `analytics-consent-responded`: `'true'` when user has responded
- `analytics-consent-timestamp`: Unix timestamp of when consent was given/declined

### What Gets Cleared

When consent is withdrawn, the following data is cleared:

1. **localStorage**: All keys starting with `plausible_` or containing `analytics`
2. **sessionStorage**: All keys starting with `plausible_` or containing `analytics`
3. **Cookies**: All cookies starting with `plausible_`, `_ga`, or containing `analytics`

Note: The consent preference keys themselves are removed, so the banner will show again on next visit.

## Event System

The consent manager dispatches custom events when consent changes:

```typescript
// Event name: 'consent-changed'
// Event detail: { consentGiven: boolean }

// Listen for changes
window.addEventListener('consent-changed', (event) => {
  console.log('Consent changed:', event.detail.consentGiven)
})

// Or use the helper function
const cleanup = onConsentChange((consentGiven) => {
  console.log('Consent changed:', consentGiven)
})

// Clean up listener
cleanup()
```

## GDPR Compliance

The consent management system is designed to be GDPR compliant:

✅ **Explicit Consent**: Users must explicitly accept or decline
✅ **No Pre-checked Boxes**: No default consent
✅ **Easy to Withdraw**: One-click consent withdrawal
✅ **Data Deletion**: All analytics data is cleared when consent is withdrawn
✅ **Transparent**: Clear information about what data is collected
✅ **Accessible**: Keyboard navigation and screen reader support

## Best Practices

### 1. Always Check Consent Before Tracking

```typescript
import { hasConsent } from '@/lib/consent-manager'

if (hasConsent()) {
  // Track event
}
```

### 2. Use the Analytics Hook

The `useAnalytics` hook automatically checks consent:

```typescript
const { trackEvent } = useAnalytics()
trackEvent('button_click') // Only tracks if consent given
```

### 3. Listen for Consent Changes

If your component needs to react to consent changes:

```typescript
useEffect(() => {
  const cleanup = onConsentChange((consentGiven) => {
    if (consentGiven) {
      // Initialize analytics features
    } else {
      // Disable analytics features
    }
  })
  
  return cleanup
}, [])
```

### 4. Provide Privacy Settings

Always provide a way for users to manage their consent:

```tsx
// In your privacy policy page or settings page
<PrivacySettings />
```

### 5. Test Consent Flow

Test the complete consent flow:

1. Clear localStorage
2. Visit site and verify banner shows
3. Accept consent and verify analytics loads
4. Withdraw consent and verify data is cleared
5. Verify banner shows again after withdrawal

## Troubleshooting

### Banner Not Showing

- Check if `analytics-consent-responded` is in localStorage
- Clear localStorage to reset: `localStorage.clear()`

### Analytics Not Tracking

- Check if consent is given: `hasConsent()`
- Check if analytics is enabled in config
- Check browser console for errors
- Verify Plausible script is loaded

### Consent Not Persisting

- Check if localStorage is available
- Check if browser is in private/incognito mode
- Check for localStorage quota errors

### Data Not Clearing

- Check browser console for errors
- Manually clear: `clearAnalyticsData()`
- Check if cookies are being set by third parties

## Testing

### Manual Testing

```typescript
import { 
  grantConsent, 
  declineConsent, 
  withdrawConsent,
  resetConsentState,
  getConsentState 
} from '@/lib/consent-manager'

// Check current state
console.log(getConsentState())

// Grant consent
grantConsent()

// Decline consent
declineConsent()

// Withdraw consent
withdrawConsent()

// Reset for testing (shows banner again)
resetConsentState()
```

### Automated Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import CookieConsent from '@/components/CookieConsent'

test('shows banner when user has not responded', () => {
  localStorage.clear()
  render(<CookieConsent />)
  
  // Wait for banner to appear
  await waitFor(() => {
    expect(screen.getByText(/We value your privacy/i)).toBeInTheDocument()
  })
})

test('accepts consent and reloads page', () => {
  const reloadSpy = jest.spyOn(window.location, 'reload')
  render(<CookieConsent />)
  
  fireEvent.click(screen.getByText(/Accept/i))
  
  expect(localStorage.getItem('analytics-consent')).toBe('true')
  expect(reloadSpy).toHaveBeenCalled()
})
```

## Migration Guide

If you're migrating from a different consent system:

1. **Update imports**: Replace old consent functions with new ones from `@/lib/consent-manager`
2. **Update components**: Use `CookieConsent` and `PrivacySettings` components
3. **Update analytics**: Use `useAnalytics` hook instead of direct tracking
4. **Test thoroughly**: Verify consent flow works end-to-end

## Future Enhancements

Potential improvements for the consent system:

- [ ] Cookie categories (necessary, analytics, marketing)
- [ ] Granular consent per category
- [ ] Consent expiration (re-ask after X days)
- [ ] Consent version tracking
- [ ] Multi-language support
- [ ] Custom consent UI themes
- [ ] Server-side consent storage
- [ ] Consent analytics dashboard
