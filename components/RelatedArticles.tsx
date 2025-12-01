import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { getRelatedPosts, BlogPost } from '@/lib/blog';
import { BlogCategory } from '@/lib/blog.types';

interface RelatedArticlesProps {
  currentPostSlug: string;
  currentCategory: BlogCategory;
  limit?: number;
}

// Category color mapping (same as BlogPostCard)
const categoryColors: Record<BlogCategory, string> = {
  'Hardware': 'bg-chart-1/10 text-chart-1 border-chart-1/30',
  'Software': 'bg-chart-2/10 text-chart-2 border-chart-2/30',
  'Industry Insights': 'bg-primary/10 text-primary border-primary/30',
  'Company News': 'bg-accent/10 text-accent-foreground border-accent/30',
};

export default function RelatedArticles({
  currentPostSlug,
  currentCategory,
  limit = 3,
}: RelatedArticlesProps) {
  // Fetch related posts based on category
  const relatedPosts = getRelatedPosts(currentPostSlug, currentCategory, limit);

  // Don't render if no related posts
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <RelatedArticleCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

interface RelatedArticleCardProps {
  post: BlogPost;
  index: number;
}

function RelatedArticleCard({ post, index }: RelatedArticleCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const { title, excerpt, category, featuredImage } = frontmatter;

  // Animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <Link href={`/blog/${slug}`}>
      <Card 
        className="h-full hover-elevate transition-all duration-300 group overflow-hidden animate-fade-in-up"
        style={{ animationDelay }}
      >
        {/* Thumbnail */}
        {featuredImage && (
          <div className="relative w-full h-40 overflow-hidden bg-muted">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardContent className="p-5 space-y-3">
          {/* Category Badge */}
          <Badge 
            variant="outline" 
            className={`${categoryColors[category]} text-xs font-medium`}
          >
            {category}
          </Badge>

          {/* Title */}
          <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {excerpt}
          </p>

          {/* Reading Time */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-3 border-t border-border/50">
            <Clock className="w-3.5 h-3.5" />
            <span>{readingTime} min read</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
