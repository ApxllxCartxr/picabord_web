import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { TableOfContents } from '@/components/TableOfContents';
import { ReadingProgress } from '@/components/ReadingProgress';
import { SocialShare } from '@/components/SocialShare';
import RelatedArticles from '@/components/RelatedArticles';
import BlogPostTracker from '@/components/BlogPostTracker';
import { useMDXComponents } from '@/mdx-components';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Enable ISR - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | PICABORD',
    };
  }

  const { frontmatter } = post;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://picabord.space';
  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = frontmatter.featuredImage && frontmatter.featuredImage.startsWith('http') 
    ? frontmatter.featuredImage 
    : frontmatter.featuredImage 
      ? `${siteUrl}${frontmatter.featuredImage}`
      : `${siteUrl}/blog/default-post.jpg`;

  return {
    title: `${frontmatter.title} | PICABORD Blog`,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags?.join(', '),
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      url: postUrl,
      siteName: 'PICABORD',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [imageUrl],
      creator: '@picabord',
      site: '@picabord',
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get MDX components
  const components = useMDXComponents({});

  // Compile MDX content
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    development: false,
  } as any);

  // Generate JSON-LD structured data for SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://picabord.space';
  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = frontmatter.featuredImage && frontmatter.featuredImage.startsWith('http') 
    ? frontmatter.featuredImage 
    : frontmatter.featuredImage 
      ? `${siteUrl}${frontmatter.featuredImage}`
      : `${siteUrl}/blog/default-post.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: imageUrl,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Organization',
      name: frontmatter.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PICABORD',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/PIC-A-BOARD_logo_w.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: frontmatter.category,
    keywords: frontmatter.tags?.join(', '),
    wordCount: content.split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10">
      {/* Blog Post Tracking */}
      <BlogPostTracker 
        title={frontmatter.title}
        category={frontmatter.category}
        slug={slug}
      />
      
      {/* Reading Progress Indicator */}
      <ReadingProgress />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <nav className="pt-28 pb-6" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link 
                href="/" 
                className="hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link 
                href="/blog" 
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              {frontmatter.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pb-24">
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {/* Category Badge */}
          <div className="mb-6">
            <Badge 
              variant="outline" 
              className="border-primary/30 text-primary font-medium"
            >
              {frontmatter.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {frontmatter.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {frontmatter.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground border-t border-b border-border/50 py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{frontmatter.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={frontmatter.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {frontmatter.featuredImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={frontmatter.featuredImage}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>
        )}

        {/* Article Content with Table of Contents */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12 xl:gap-16">
            {/* Main Content */}
            <div className="mdx-content max-w-4xl">
              <MDXContent components={components} />
            </div>

            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents />
            </aside>
          </div>

          {/* Table of Contents - Mobile */}
          <div className="lg:hidden">
            <TableOfContents />
          </div>
        </div>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="text-xs"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Social Share Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="border-t border-border/50 pt-8">
            <SocialShare 
              title={frontmatter.title}
              url={postUrl}
              description={frontmatter.excerpt}
            />
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedArticles 
            currentPostSlug={slug}
            currentCategory={frontmatter.category}
            limit={3}
          />
        </div>

        {/* Back to Blog Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
