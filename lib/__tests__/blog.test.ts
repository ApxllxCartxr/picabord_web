/**
 * Tests for blog retrieval functions
 */

import { describe, it, expect } from 'vitest';
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getRelatedPosts,
} from '../blog';

describe('Blog Retrieval Functions', () => {
  describe('getAllPosts', () => {
    it('should return an array of blog posts', () => {
      const posts = getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should return posts sorted by date (newest first)', () => {
      const posts = getAllPosts();
      if (posts.length > 1) {
        const firstDate = new Date(posts[0].frontmatter.date).getTime();
        const secondDate = new Date(posts[1].frontmatter.date).getTime();
        expect(firstDate).toBeGreaterThanOrEqual(secondDate);
      }
    });

    it('should include required frontmatter fields', () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        const post = posts[0];
        expect(post.frontmatter).toHaveProperty('title');
        expect(post.frontmatter).toHaveProperty('excerpt');
        expect(post.frontmatter).toHaveProperty('date');
        expect(post.frontmatter).toHaveProperty('author');
        expect(post.frontmatter).toHaveProperty('category');
        expect(post.frontmatter).toHaveProperty('featuredImage');
        expect(post.frontmatter).toHaveProperty('published');
      }
    });

    it('should calculate reading time', () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        expect(posts[0].readingTime).toBeGreaterThan(0);
        expect(Number.isInteger(posts[0].readingTime)).toBe(true);
      }
    });
  });

  describe('getPostBySlug', () => {
    it('should return a post when given a valid slug', () => {
      const post = getPostBySlug('test-post');
      expect(post).not.toBeNull();
      if (post) {
        expect(post.slug).toBe('test-post');
        expect(post.frontmatter.title).toBeDefined();
      }
    });

    it('should return null for non-existent slug', () => {
      const post = getPostBySlug('non-existent-post');
      expect(post).toBeNull();
    });

    it('should include content and reading time', () => {
      const post = getPostBySlug('test-post');
      if (post) {
        expect(post.content).toBeDefined();
        expect(post.content.length).toBeGreaterThan(0);
        expect(post.readingTime).toBeGreaterThan(0);
      }
    });
  });

  describe('getPostsByCategory', () => {
    it('should return posts filtered by category', () => {
      const softwarePosts = getPostsByCategory('Software');
      expect(Array.isArray(softwarePosts)).toBe(true);
      
      softwarePosts.forEach(post => {
        expect(post.frontmatter.category).toBe('Software');
      });
    });

    it('should return empty array for category with no posts', () => {
      const posts = getPostsByCategory('NonExistentCategory');
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBe(0);
    });

    it('should return posts sorted by date', () => {
      const posts = getPostsByCategory('Software');
      if (posts.length > 1) {
        const firstDate = new Date(posts[0].frontmatter.date).getTime();
        const secondDate = new Date(posts[1].frontmatter.date).getTime();
        expect(firstDate).toBeGreaterThanOrEqual(secondDate);
      }
    });
  });

  describe('getRelatedPosts', () => {
    it('should return related posts from the same category', () => {
      const post = getPostBySlug('test-post');
      if (post) {
        const relatedPosts = getRelatedPosts(
          post.slug,
          post.frontmatter.category,
          3
        );
        
        expect(Array.isArray(relatedPosts)).toBe(true);
        relatedPosts.forEach(relatedPost => {
          expect(relatedPost.frontmatter.category).toBe(post.frontmatter.category);
          expect(relatedPost.slug).not.toBe(post.slug);
        });
      }
    });

    it('should exclude the current post', () => {
      const post = getPostBySlug('test-post');
      if (post) {
        const relatedPosts = getRelatedPosts(
          post.slug,
          post.frontmatter.category,
          10
        );
        
        const currentPostInResults = relatedPosts.find(p => p.slug === post.slug);
        expect(currentPostInResults).toBeUndefined();
      }
    });

    it('should respect the limit parameter', () => {
      const post = getPostBySlug('test-post');
      if (post) {
        const relatedPosts = getRelatedPosts(
          post.slug,
          post.frontmatter.category,
          2
        );
        
        expect(relatedPosts.length).toBeLessThanOrEqual(2);
      }
    });

    it('should return empty array when no related posts exist', () => {
      const relatedPosts = getRelatedPosts(
        'only-post-in-category',
        'UniqueCategory',
        3
      );
      
      expect(Array.isArray(relatedPosts)).toBe(true);
      expect(relatedPosts.length).toBe(0);
    });
  });
});
