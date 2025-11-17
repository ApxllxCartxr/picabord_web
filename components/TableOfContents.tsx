'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from the page
    const extractHeadings = () => {
      const articleContent = document.querySelector('.mdx-content');
      if (!articleContent) return [];

      const headingElements = articleContent.querySelectorAll('h2, h3, h4');
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent || '';
        
        // Generate ID from text if not present
        let id = heading.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          
          // Ensure unique ID by appending index if duplicate
          const existingIds = extractedHeadings.map(h => h.id);
          if (existingIds.includes(id)) {
            id = `${id}-${index}`;
          }
          
          heading.id = id;
        }

        extractedHeadings.push({ id, text, level });
      });

      return extractedHeadings;
    };

    const extracted = extractHeadings();
    setHeadings(extracted);

    // Set up intersection observer for active heading
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: '-100px 0px -66%',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all headings
    extracted.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL without scrolling
      window.history.pushState(null, '', `#${id}`);
      
      // Close mobile menu after click
      setIsOpen(false);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-background border border-border rounded-lg shadow-lg hover:shadow-xl transition-all duration-200',
          isOpen && 'bg-muted',
          className
        )}
        aria-label="Toggle table of contents"
      >
        <List className="h-5 w-5" />
        <span className="text-sm font-medium">Contents</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Table of Contents */}
      <nav
        className={cn(
          // Mobile styles - slide up from bottom
          'lg:block fixed lg:sticky bottom-0 left-0 right-0 lg:top-32 lg:bottom-auto',
          'bg-background lg:bg-transparent border-t lg:border-t-0 border-border',
          'z-30 lg:z-auto',
          'transition-transform duration-300 ease-in-out',
          'max-h-[70vh] lg:max-h-[calc(100vh-10rem)] overflow-y-auto',
          !isOpen && 'translate-y-full lg:translate-y-0',
          className
        )}
        aria-label="Table of contents"
      >
        <div className="lg:sticky lg:top-0 p-6 lg:p-0">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-4 pb-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
              <List className="h-4 w-4" />
              On This Page
            </h2>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden mb-4 pb-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
              <List className="h-4 w-4" />
              On This Page
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close table of contents"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Headings List */}
          <ul className="space-y-2 text-sm">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const indent = (heading.level - 2) * 12; // 12px per level

              return (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${indent}px` }}
                  className="transition-all duration-200"
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className={cn(
                      'block py-1.5 px-3 rounded-md transition-all duration-200',
                      'hover:bg-muted hover:text-foreground',
                      'border-l-2 -ml-3 pl-[11px]',
                      isActive
                        ? 'border-primary text-primary font-medium bg-primary/5'
                        : 'border-transparent text-muted-foreground'
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-20"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
