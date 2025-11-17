import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogList from '@/components/BlogList';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog | PICABORD',
  description: 'Insights, updates, and technical articles from PICABORD. Stay informed about our innovations in hardware and software solutions.',
  openGraph: {
    title: 'Blog | PICABORD',
    description: 'Insights, updates, and technical articles from PICABORD',
    type: 'website',
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10">
      {/* Header */}
      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in-up">
            <Badge variant="outline" className="border-primary/30 text-primary font-picabord">
              PICABORD Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Insights &{" "}
              <span className="text-primary">
                Updates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed about our latest innovations, industry insights, and technical articles
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <BlogList posts={allPosts} />
          )}
        </div>
      </section>
    </div>
  );
}
