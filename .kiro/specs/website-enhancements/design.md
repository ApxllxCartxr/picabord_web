# Design Document

## Overview

This design document outlines the technical architecture and implementation approach for adding a blog system and analytics integration to the PICABORD website. The blog system will use Next.js 15 App Router with MDX for content management, while analytics will be implemented using a privacy-focused solution with proper consent management.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PICABORD Website                         │
│                    (Next.js 15 App Router)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Blog System    │         │    Analytics     │         │
│  │                  │         │                  │         │
│  │  - MDX Content   │         │  - Event Tracking│         │
│  │  - Filtering     │         │  - Page Views    │         │
│  │  - Search        │         │  - Conversions   │         │
│  │  - Categories    │         │  - Privacy       │         │
│  └──────────────────┘         └──────────────────┘         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                                │
         │                                │
         ▼                                ▼
┌──────────────────┐           ┌──────────────────┐
│  MDX Files       │           │  Analytics       │
│  (File System)   │           │  Platform        │
│                  │           │  (Plausible/GA)  │
└──────────────────┘           └──────────────────┘
```

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Content**: MDX (Markdown + JSX)
- **Styling**: Tailwind CSS (existing)
- **Components**: shadcn/ui (existing)
- **Analytics**: Plausible Analytics (privacy-focused) or Google Analytics 4
- **Code Highlighting**: Prism.js or Shiki
- **Search**: Client-side filtering with Fuse.js for fuzzy search
- **Metadata**: next-mdx-remote or @next/mdx

## Components and Interfaces

### Blog System Components

#### 1. Blog Listing Page (`app/blog/page.tsx`)

**Purpose**: Display all blog posts with filtering and search capabilities

**Props**: None (Server Component)

**Features**:
- Grid layout of blog post cards
- Category filter buttons
- Search input
- Pagination (if needed)
- Responsive design

**Data Flow**:
```typescript
// Server Component - fetches all blog posts
async function getBlogPosts() {
  // Read MDX files from content/blog directory
  // Parse frontmatter
  // Sort by date
  // Return array of post metadata
}
```

#### 2. Blog Post Card Component (`components/BlogPostCard.tsx`)

**Purpose**: Display individual blog post preview

**Props**:
```typescript
interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  featuredImage?: string;
  readingTime: number;
}
```

**Features**:
- Hover effects consistent with existing design
- Featured image with Next.js Image optimization
- Category badge
- Reading time indicator
- Author information

#### 3. Blog Post Page (`app/blog/[slug]/page.tsx`)

**Purpose**: Display full blog post content

**Features**:
- MDX content rendering
- Table of contents (auto-generated from headings)
- Social sharing buttons
- Author bio
- Related articles section
- Breadcrumb navigation
- Reading progress indicator

**Metadata**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}
```

#### 4. Blog Filter Component (`components/BlogFilter.tsx`)

**Purpose**: Client-side filtering and search

**Props**:
```typescript
interface BlogFilterProps {
  posts: BlogPost[];
  onFilterChange: (filtered: BlogPost[]) => void;
}
```

**State**:
```typescript
interface FilterState {
  selectedCategory: string | null;
  searchQuery: string;
}
```

**Features**:
- Category buttons with active state
- Search input with debouncing
- Clear filters button
- Results count display

#### 5. Related Articles Component (`components/RelatedArticles.tsx`)

**Purpose**: Show related blog posts

**Props**:
```typescript
interface RelatedArticlesProps {
  currentPostSlug: string;
  currentCategory: string;
  limit?: number;
}
```

**Logic**:
- Find posts in same category
- Exclude current post
- Sort by date (most recent first)
- Limit to 3 posts

#### 6. Social Share Component (`components/SocialShare.tsx`)

**Purpose**: Social media sharing buttons

**Props**:
```typescript
interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}
```

**Platforms**:
- Twitter/X
- LinkedIn
- Facebook
- Copy link

### Analytics Components

#### 1. Analytics Provider (`components/AnalyticsProvider.tsx`)

**Purpose**: Initialize and manage analytics tracking

**Props**:
```typescript
interface AnalyticsProviderProps {
  children: React.ReactNode;
  trackingId: string;
  consentGiven: boolean;
}
```

**Features**:
- Initialize analytics script
- Track page views on route changes
- Provide tracking functions via context
- Respect consent preferences

#### 2. Cookie Consent Banner (`components/CookieConsent.tsx`)

**Purpose**: GDPR-compliant cookie consent

**Features**:
- Display on first visit
- Accept/Decline buttons
- Remember choice in localStorage
- Link to privacy policy
- Customizable message

**State**:
```typescript
interface ConsentState {
  hasResponded: boolean;
  consentGiven: boolean;
}
```

#### 3. Analytics Hook (`hooks/use-analytics.ts`)

**Purpose**: Provide analytics tracking functions

**API**:
```typescript
interface UseAnalytics {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  trackPageView: (url: string) => void;
  trackConversion: (conversionName: string, value?: number) => void;
}

function useAnalytics(): UseAnalytics;
```

**Usage Example**:
```typescript
const { trackEvent } = useAnalytics();

// Track button click
trackEvent('contact_button_click', {
  location: 'hero_section',
  page: '/about'
});

// Track form submission
trackEvent('contact_form_submit', {
  form_type: 'contact',
  source: 'blog_post'
});
```

#### 4. Privacy Policy Page (`app/privacy/page.tsx`)

**Purpose**: Explain data collection and privacy practices

**Sections**:
- What data we collect
- How we use data
- Cookie usage
- Third-party services
- User rights (GDPR)
- Contact information

## Data Models

### Blog Post Frontmatter

```typescript
interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  date: string; // ISO 8601 format
  author: string;
  category: 'Hardware' | 'Software' | 'Industry Insights' | 'Company News';
  featuredImage: string; // Path to image
  tags?: string[];
  published: boolean;
}
```

### Blog Post File Structure

```
content/
└── blog/
    ├── getting-started-with-pika1.mdx
    ├── building-scalable-software.mdx
    └── industry-trends-2025.mdx
```

### Example MDX File

```mdx
---
title: "Getting Started with PIKA-1"
excerpt: "Learn how to set up and configure your PIKA-1 single board computer for your first project."
date: "2025-01-15"
author: "PICABORD Team"
category: "Hardware"
featuredImage: "/blog/pika1-setup.jpg"
tags: ["PIKA-1", "Tutorial", "Hardware"]
published: true
---

# Getting Started with PIKA-1

Welcome to the world of PIKA-1! In this guide, we'll walk you through...

## Prerequisites

Before you begin, make sure you have:

- PIKA-1 board
- Power supply (5V, 3A)
- MicroSD card (16GB minimum)

## Step 1: Initial Setup

First, let's prepare the board...

```bash
# Flash the OS image
sudo dd if=pika-os.img of=/dev/sdX bs=4M status=progress
```

<CustomComponent prop="value" />

## Next Steps

Now that you have your PIKA-1 set up...
```

### Analytics Event Schema

```typescript
interface AnalyticsEvent {
  event_name: string;
  timestamp: number;
  page_url: string;
  user_id?: string; // Anonymous ID
  properties?: {
    [key: string]: string | number | boolean;
  };
}

// Predefined events
type PredefinedEvents =
  | 'page_view'
  | 'contact_form_submit'
  | 'contact_button_click'
  | 'product_link_click'
  | 'social_share'
  | 'external_link_click'
  | 'blog_post_view'
  | 'blog_category_filter'
  | 'blog_search';
```

## Error Handling

### Blog System Error Handling

1. **Missing Blog Post**
   - Return 404 page with helpful navigation
   - Suggest related posts or return to blog listing

2. **Invalid MDX Content**
   - Log error during build
   - Show error boundary in development
   - Fallback to plain text in production

3. **Image Loading Failures**
   - Use Next.js Image placeholder
   - Fallback to default blog image

### Analytics Error Handling

1. **Script Loading Failure**
   - Fail silently (don't break user experience)
   - Log error to console in development
   - Provide fallback no-op functions

2. **Network Errors**
   - Queue events for retry
   - Implement exponential backoff
   - Drop events after 3 failed attempts

3. **Consent Not Given**
   - Don't initialize analytics
   - Provide no-op tracking functions
   - Show consent banner

## Testing Strategy

### Blog System Testing

1. **Unit Tests**
   - Blog post parsing functions
   - Filter and search logic
   - Related articles algorithm
   - Reading time calculation

2. **Integration Tests**
   - MDX rendering
   - Navigation between posts
   - Category filtering
   - Search functionality

3. **E2E Tests**
   - Navigate to blog listing
   - Filter by category
   - Search for posts
   - Read full article
   - Click related articles
   - Share on social media

### Analytics Testing

1. **Unit Tests**
   - Event tracking functions
   - Consent management
   - Event queuing logic

2. **Integration Tests**
   - Analytics initialization
   - Page view tracking
   - Event firing
   - Consent banner interaction

3. **Manual Testing**
   - Verify events in analytics dashboard
   - Test consent flow
   - Verify GDPR compliance
   - Test on different browsers

## Performance Considerations

### Blog System Performance

1. **Static Generation**
   - Use `generateStaticParams` for all blog posts
   - Pre-render at build time
   - Incremental Static Regeneration (ISR) for updates

2. **Image Optimization**
   - Use Next.js Image component
   - Lazy load images below the fold
   - Serve WebP format with fallbacks
   - Responsive images for different screen sizes

3. **Code Splitting**
   - Lazy load MDX components
   - Split syntax highlighting by language
   - Load social share scripts on demand

4. **Search Optimization**
   - Debounce search input (300ms)
   - Use Web Workers for heavy filtering
   - Implement virtual scrolling for large lists

### Analytics Performance

1. **Script Loading**
   - Load analytics script asynchronously
   - Use `next/script` with `strategy="afterInteractive"`
   - Defer non-critical tracking

2. **Event Batching**
   - Batch multiple events
   - Send in single request
   - Implement request throttling

3. **Minimal Bundle Size**
   - Use lightweight analytics library
   - Tree-shake unused features
   - Lazy load consent banner

## Security Considerations

### Blog System Security

1. **Content Security**
   - Sanitize MDX content during build
   - Validate frontmatter schema
   - Prevent XSS in user-generated content (if comments added later)

2. **Image Security**
   - Validate image sources
   - Use Next.js Image domains whitelist
   - Implement CSP headers

### Analytics Security

1. **Data Privacy**
   - Anonymize IP addresses
   - Don't collect PII
   - Implement data retention policies
   - Provide data deletion mechanism

2. **Script Integrity**
   - Use Subresource Integrity (SRI) for external scripts
   - Verify analytics script source
   - Implement CSP for script sources

3. **Consent Management**
   - Store consent in localStorage (not cookies)
   - Encrypt sensitive preferences
   - Respect Do Not Track headers

## Deployment Strategy

### Blog Content Deployment

1. **Content Updates**
   - Add new MDX files to `content/blog/`
   - Commit to repository
   - Trigger build and deploy
   - Verify on staging before production

2. **Build Process**
   - Parse all MDX files
   - Generate static pages
   - Optimize images
   - Create sitemap with blog posts

### Analytics Deployment

1. **Initial Setup**
   - Create analytics account
   - Add tracking ID to environment variables
   - Deploy with analytics enabled
   - Verify tracking in dashboard

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_ANALYTICS_ID=your_tracking_id
   NEXT_PUBLIC_ANALYTICS_DOMAIN=picabord.space
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   ```

## Integration Points

### Navigation Integration

Add "Blog" link to main navigation in `components/Navigation.tsx`:

```typescript
const sections = [
  { id: "solutions", label: "Solutions" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "About" }
];
```

### Footer Integration

Add blog link and privacy policy to `components/Footer.tsx`:

```typescript
const company = [
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Privacy Policy", href: "/privacy" }
];
```

### Analytics Integration Points

1. **Root Layout** (`app/layout.tsx`)
   - Add AnalyticsProvider
   - Add CookieConsent banner
   - Initialize tracking

2. **Contact Form** (`pages/Contact.tsx`)
   - Track form submissions
   - Track field interactions

3. **Product Pages** (`app/pika/page.tsx`, `app/tec/page.tsx`)
   - Track page views
   - Track CTA clicks

4. **Blog Posts**
   - Track post views
   - Track reading time
   - Track social shares
   - Track scroll depth

## Accessibility Considerations

### Blog System Accessibility

1. **Semantic HTML**
   - Use proper heading hierarchy
   - Article tags for blog posts
   - Nav tags for navigation

2. **Keyboard Navigation**
   - Tab through filter buttons
   - Enter to select category
   - Focus management on search

3. **Screen Reader Support**
   - Alt text for all images
   - ARIA labels for interactive elements
   - Announce filter results

4. **Color Contrast**
   - Maintain WCAG AA standards
   - Test with existing theme
   - Ensure readable code blocks

### Analytics Accessibility

1. **Cookie Consent**
   - Keyboard accessible
   - Screen reader friendly
   - Clear language
   - Focus trap when open

2. **No Impact on UX**
   - Analytics should not affect user experience
   - No layout shifts
   - No blocking scripts

## Monitoring and Maintenance

### Blog System Monitoring

1. **Build Monitoring**
   - Alert on build failures
   - Validate MDX syntax
   - Check for broken links

2. **Performance Monitoring**
   - Track page load times
   - Monitor Core Web Vitals
   - Alert on performance degradation

### Analytics Monitoring

1. **Data Quality**
   - Verify event tracking
   - Check for missing data
   - Monitor consent rates

2. **Privacy Compliance**
   - Regular privacy audits
   - Update privacy policy as needed
   - Monitor consent preferences

## Future Enhancements

### Blog System

1. **Phase 2 Features**
   - Comments system
   - Author pages
   - Tag-based filtering
   - RSS feed
   - Email subscriptions

2. **Content Management**
   - Admin dashboard for content management
   - Draft preview system
   - Scheduled publishing

### Analytics

1. **Advanced Tracking**
   - Heatmaps
   - Session recordings
   - A/B testing framework
   - Custom dashboards

2. **Reporting**
   - Automated reports
   - Custom metrics
   - Goal tracking
   - Funnel analysis
