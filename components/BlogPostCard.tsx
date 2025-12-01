'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogCategory } from '@/lib/blog.types';

interface BlogPostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: BlogCategory;
  featuredImage?: string;
  readingTime: number;
  index?: number;
}

// Category color mapping
const categoryColors: Record<BlogCategory, string> = {
  'Hardware': 'bg-chart-1/10 text-chart-1 border-chart-1/30',
  'Software': 'bg-chart-2/10 text-chart-2 border-chart-2/30',
  'Industry Insights': 'bg-primary/10 text-primary border-primary/30',
  'Company News': 'bg-accent/10 text-accent-foreground border-accent/30',
};

export default function BlogPostCard({
  slug,
  title,
  excerpt,
  date,
  author,
  category,
  featuredImage,
  readingTime,
  index = 0,
}: BlogPostCardProps) {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <Link href={`/blog/${slug}` as any}>
      <Card 
        className="h-full hover-elevate transition-all duration-300 group overflow-hidden animate-fade-in-up"
        style={{ animationDelay }}
      >
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-48 overflow-hidden bg-muted">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardContent className="p-6 space-y-4">
          {/* Category Badge */}
          <Badge 
            variant="outline" 
            className={`${categoryColors[category]} text-xs font-medium`}
          >
            {category}
          </Badge>

          {/* Title */}
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{author}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
