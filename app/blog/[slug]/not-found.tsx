import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog Post Not Found</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the blog post you're looking for. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button size="lg" className="gap-2">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Blog
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
