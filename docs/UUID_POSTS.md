# UUID-Based Blog Posts

## ✅ Changes Made

The blog CMS now uses **UUIDs** for post identification instead of slugs for file names.

### How It Works

#### File Structure
- **Filename:** UUID (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890.mdx`)
- **URL Route:** Human-readable slug (e.g., `/blog/my-awesome-post`)

#### Frontmatter Format
```mdx
---
id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
slug: "my-awesome-post"
title: "My Awesome Post"
date: "2025-11-12"
excerpt: "This is an awesome post"
category: "Software"
tags: ["tech", "blog"]
image: "/blog/image.jpg"
author: "PICABORD Team"
published: true
---

Your content here...
```

### Benefits

1. **Unique Identification:** Each post has a permanent UUID
2. **SEO-Friendly URLs:** Slugs remain human-readable
3. **Title Changes:** Can rename posts without breaking links
4. **No Conflicts:** UUIDs prevent filename collisions

### API Endpoints

All CMS endpoints use the **UUID** (not slug):

- `GET /api/cms/posts` - List all posts
- `GET /api/cms/posts/{uuid}` - Get specific post
- `PUT /api/cms/posts/{uuid}` - Update post
- `DELETE /api/cms/posts/{uuid}` - Delete post

### Public Blog Routes

Public blog still uses **slugs** for SEO:

- `/blog` - All posts
- `/blog/{slug}` - Individual post (e.g., `/blog/my-awesome-post`)

### Implementation

1. **Creating Posts:** Auto-generates UUID and slug
2. **Updating Posts:** Preserves UUID, updates slug if title changes
3. **Deleting Posts:** Uses UUID for file operations
4. **Reading Posts:** Finds by slug in frontmatter

### Migration

Existing posts with slug-based filenames will still work! The system:
- Uses `slug` from frontmatter if available
- Falls back to filename if no slug in frontmatter
- Supports both UUID and slug-based files

---

**No migration needed - both formats work simultaneously!** 🎉
