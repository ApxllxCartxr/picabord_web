/**
 * Blog post file system utilities
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostFrontmatter, BlogCategory, isBlogPostFrontmatter } from './blog.types';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Read all MDX files from the content/blog directory
 * Parse frontmatter and calculate reading time
 * Sort posts by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  // Read all files in the blog directory
  const files = fs.readdirSync(BLOG_CONTENT_DIR);

  // Filter for MDX files only
  const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  // Parse each file
  const posts = mdxFiles.map(filename => {
    const fileId = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(BLOG_CONTENT_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Validate frontmatter - skip invalid files silently
    if (!isBlogPostFrontmatter(data)) {
      return null;
    }

    // Provide defaults for missing fields
    const frontmatter: BlogPostFrontmatter = {
      title: data.title,
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      date: data.date,
      author: data.author || 'PICABORD Team',
      category: (data.category as BlogCategory) || 'Software',
      featuredImage: (data as any).image || data.featuredImage || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      published: data.published !== false, // Default to true
    };

    // Use slug from frontmatter if available, otherwise use filename
    const slug = (data as any).slug || fileId;

    // Calculate reading time
    const stats = readingTime(content);

    return {
      slug,
      frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
    } as BlogPost;
  }).filter((post): post is BlogPost => post !== null);

  // Filter out unpublished posts in production
  const publishedPosts = posts.filter(post => post.frontmatter.published);

  // Sort by date (newest first)
  publishedPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });

  return publishedPosts;
}

/**
 * Get a single blog post by slug
 * First tries to find by slug in frontmatter, then by filename
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  // Check if directory exists
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return null;
  }

  // Read all files and find one with matching slug in frontmatter
  const files = fs.readdirSync(BLOG_CONTENT_DIR);
  const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  for (const filename of mdxFiles) {
    const filePath = path.join(BLOG_CONTENT_DIR, filename);
    let fileContents: string;
    
    try {
      fileContents = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      continue;
    }

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Check if this file matches the slug
    const fileSlug = (data as any).slug || filename.replace(/\.mdx?$/, '');
    
    if (fileSlug === slug) {
      // Validate frontmatter
      if (!isBlogPostFrontmatter(data)) {
        return null;
      }

      // Provide defaults for missing fields
      const frontmatter: BlogPostFrontmatter = {
        title: data.title,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        date: data.date,
        author: data.author || 'PICABORD Team',
        category: (data.category as BlogCategory) || 'Software',
        featuredImage: (data as any).image || data.featuredImage || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        published: data.published !== false,
      };

      // Calculate reading time
      const stats = readingTime(content);

      return {
        slug,
        frontmatter,
        content,
        readingTime: Math.ceil(stats.minutes),
      } as BlogPost;
    }
  }

  return null;
}

/**
 * Get all blog posts in a specific category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.frontmatter.category === category);
}

/**
 * Get related blog posts based on category matching
 * Excludes the current post and returns up to `limit` posts
 */
export function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit: number = 3
): BlogPost[] {
  const categoryPosts = getBlogPostsByCategory(category);
  
  // Filter out the current post
  const relatedPosts = categoryPosts.filter(post => post.slug !== currentSlug);
  
  // Return up to the limit
  return relatedPosts.slice(0, limit);
}

/**
 * Get all unique categories from blog posts
 */
export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts();
  const categories = new Set(allPosts.map(post => post.frontmatter.category));
  return Array.from(categories);
}

/**
 * Get all unique tags from blog posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags);
}
