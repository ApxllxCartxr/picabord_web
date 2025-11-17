'use client';

import { useEffect, useRef } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';

interface BlogPostTrackerProps {
  title: string;
  category: string;
  slug: string;
}

/**
 * BlogPostTracker Component
 * 
 * Tracks blog post views and scroll depth for analytics.
 * This component should be included on blog post pages.
 */
export default function BlogPostTracker({ title, category, slug }: BlogPostTrackerProps) {
  const { trackEvent } = useAnalytics();
  const scrollDepthTracked = useRef<Set<number>>(new Set());
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Track blog post view (only once per page load)
    if (!hasTrackedView.current) {
      trackEvent('blog_post_view', {
        post_title: title,
        post_category: category,
        post_slug: slug,
      });
      hasTrackedView.current = true;
    }

    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track at 25%, 50%, 75%, and 100% scroll depth
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);
          trackEvent('blog_scroll_depth', {
            post_title: title,
            post_category: category,
            post_slug: slug,
            scroll_depth: milestone,
          });
        }
      }
    };

    // Add scroll event listener with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [title, category, slug, trackEvent]);

  // This component doesn't render anything
  return null;
}
