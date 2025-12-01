'use client';

import { useState, useCallback } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import BlogFilter from '@/components/BlogFilter';
import { BlogPost } from '@/lib/blog.types';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);

  const handleFilterChange = useCallback((filtered: BlogPost[]) => {
    setFilteredPosts(filtered);
  }, []);

  return (
    <>
      {/* Filter Component */}
      <BlogFilter posts={posts} onFilterChange={handleFilterChange} />

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            No articles match your filters. Try adjusting your search or category selection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              excerpt={post.frontmatter.excerpt}
              date={post.frontmatter.date}
              author={post.frontmatter.author}
              category={post.frontmatter.category}
              featuredImage={post.frontmatter.featuredImage}
              readingTime={post.readingTime}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
