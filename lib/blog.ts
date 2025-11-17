/**
 * Blog API - Main entry point for blog functionality
 * 
 * This module provides functions for retrieving and managing blog posts:
 * - getAllPosts(): Get all published blog posts sorted by date
 * - getPostBySlug(): Get a single blog post by its slug
 * - getPostsByCategory(): Get all posts in a specific category
 * - getRelatedPosts(): Get related posts based on category matching
 */

export {
  getAllBlogPosts as getAllPosts,
  getBlogPostBySlug as getPostBySlug,
  getBlogPostsByCategory as getPostsByCategory,
  getRelatedBlogPosts as getRelatedPosts,
  getAllCategories,
  getAllTags,
} from './blog.utils';

export type {
  BlogPost,
  BlogPostFrontmatter,
  BlogCategory,
} from './blog.types';

export {
  isBlogPost,
  isBlogPostFrontmatter,
} from './blog.types';
