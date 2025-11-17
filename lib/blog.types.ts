/**
 * Blog post type definitions
 */

export type BlogCategory = 'Hardware' | 'Software' | 'Industry Insights' | 'Company News';

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  date: string; // ISO 8601 format
  author: string;
  category: BlogCategory;
  featuredImage: string; // Path to image
  tags?: string[];
  published: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: number; // in minutes
}

/**
 * Type guard to validate if an object is a valid BlogPostFrontmatter
 */
export function isBlogPostFrontmatter(obj: any): obj is BlogPostFrontmatter {
  // More lenient validation - only require essential fields
  if (!obj || typeof obj !== 'object') return false;
  
  // Required fields with defaults
  const hasTitle = typeof obj.title === 'string' && obj.title.trim().length > 0;
  const hasDate = typeof obj.date === 'string';
  const hasAuthor = typeof obj.author === 'string' || obj.author === undefined;
  
  // Optional published flag (defaults to true)
  const published = obj.published === undefined ? true : obj.published === true;
  
  return hasTitle && hasDate && published;
}

/**
 * Type guard to validate if an object is a valid BlogPost
 */
export function isBlogPost(obj: any): obj is BlogPost {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.slug === 'string' &&
    isBlogPostFrontmatter(obj.frontmatter) &&
    typeof obj.content === 'string' &&
    typeof obj.readingTime === 'number'
  );
}
