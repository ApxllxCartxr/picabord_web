'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/lib/blog.types';
import { useAnalytics } from '@/hooks/use-analytics';

interface BlogFilterProps {
  posts: BlogPost[];
  onFilterChange: (filtered: BlogPost[]) => void;
}

const CATEGORIES: (BlogCategory | 'All')[] = [
  'All',
  'Hardware',
  'Software',
  'Industry Insights',
  'Company News',
];

export default function BlogFilter({ posts, onFilterChange }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { trackEvent } = useAnalytics();

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      
      // Track search query when debounced (only if not empty)
      if (searchQuery.trim()) {
        trackEvent('blog_search', {
          search_query: searchQuery.trim(),
          results_count: posts.filter(post => 
            post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.frontmatter.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
          ).length,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, posts, trackEvent]);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.frontmatter.category === selectedCategory);
    }

    // Filter by search query (title and excerpt)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(post => 
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.frontmatter.excerpt.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, selectedCategory, debouncedSearch]);

  // Notify parent of filtered results
  useEffect(() => {
    onFilterChange(filteredPosts);
  }, [filteredPosts, onFilterChange]);

  // Check if filters are active
  const hasActiveFilters = selectedCategory !== 'All' || searchQuery.trim() !== '';

  // Handle category selection
  const handleCategorySelect = (category: BlogCategory | 'All') => {
    setSelectedCategory(category);
    
    // Track category filter usage
    trackEvent('blog_category_filter', {
      category: category,
      results_count: posts.filter(post => 
        category === 'All' || post.frontmatter.category === category
      ).length,
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategorySelect(category)}
            className={`transition-all ${
              selectedCategory === category
                ? 'shadow-md'
                : 'hover:border-primary/50'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results Count and Clear Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="secondary" className="text-sm">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
        </Badge>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
