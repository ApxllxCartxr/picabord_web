const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const PORT = process.env.CMS_PORT || 3001;

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'picabord2025' // Change this to a secure password
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'picabord-cms-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Path to blog posts directory
const BLOG_DIR = path.join(__dirname, '../content/blog');

// Ensure blog directory exists
async function ensureBlogDir() {
  try {
    await fs.access(BLOG_DIR);
  } catch {
    await fs.mkdir(BLOG_DIR, { recursive: true });
  }
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to read all blog posts
async function getAllPosts() {
  await ensureBlogDir();
  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));
  
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const content = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
      const slug = file.replace('.mdx', '');
      
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = {};
        frontmatterMatch[1].split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            frontmatter[key.trim()] = value;
          }
        });
        
        return {
          slug,
          ...frontmatter,
          content: content.replace(frontmatterMatch[0], '').trim()
        };
      }
      
      return { slug, content };
    })
  );
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Routes

// Login page
app.get('/login', (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect('/admin');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    req.session.isAuthenticated = true;
    req.session.user = { username };
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout API
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Check auth status
app.get('/api/auth/status', (req, res) => {
  res.json({ 
    isAuthenticated: !!req.session.isAuthenticated,
    user: req.session.user || null
  });
});

// Admin dashboard
app.get('/admin', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Get all posts
app.get('/api/posts', requireAuth, async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post
app.get('/api/posts/:slug', requireAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = {};
      frontmatterMatch[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
          frontmatter[key.trim()] = value;
        }
      });
      
      res.json({
        slug,
        ...frontmatter,
        content: content.replace(frontmatterMatch[0], '').trim()
      });
    } else {
      res.json({ slug, content });
    }
  } catch (error) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Create new post
app.post('/api/posts', requireAuth, async (req, res) => {
  try {
    const { title, excerpt, category, tags, image, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const slug = generateSlug(title);
    const date = new Date().toISOString().split('T')[0];
    
    const frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt || ''}"
category: "${category || 'Technology'}"
tags: ${tags || '[]'}
image: "${image || '/blog/default-post.jpg'}"
author: "PICABORD Team"
---

${content}`;
    
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    await fs.writeFile(filePath, frontmatter);
    
    res.json({ success: true, slug, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
app.put('/api/posts/:slug', requireAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, excerpt, category, tags, image, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const oldFilePath = path.join(BLOG_DIR, `${slug}.mdx`);
    
    // Read existing post to preserve date
    let existingDate = new Date().toISOString().split('T')[0];
    try {
      const existingContent = await fs.readFile(oldFilePath, 'utf-8');
      const dateMatch = existingContent.match(/date: "(.+?)"/);
      if (dateMatch) {
        existingDate = dateMatch[1];
      }
    } catch (e) {
      // File doesn't exist, use current date
    }
    
    const newSlug = generateSlug(title);
    const frontmatter = `---
title: "${title}"
date: "${existingDate}"
excerpt: "${excerpt || ''}"
category: "${category || 'Technology'}"
tags: ${tags || '[]'}
image: "${image || '/blog/default-post.jpg'}"
author: "PICABORD Team"
---

${content}`;
    
    const newFilePath = path.join(BLOG_DIR, `${newSlug}.mdx`);
    await fs.writeFile(newFilePath, frontmatter);
    
    // If slug changed, delete old file
    if (slug !== newSlug) {
      try {
        await fs.unlink(oldFilePath);
      } catch (e) {
        // Old file might not exist
      }
    }
    
    res.json({ success: true, slug: newSlug, message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
app.delete('/api/posts/:slug', requireAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    await fs.unlink(filePath);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload image (basic implementation)
app.post('/api/upload', requireAuth, async (req, res) => {
  try {
    const { image, filename } = req.body;
    
    if (!image || !filename) {
      return res.status(400).json({ error: 'Image and filename are required' });
    }
    
    // Remove data:image/xxx;base64, prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    const uploadDir = path.join(__dirname, '../public/blog/uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const uniqueFilename = `${Date.now()}-${filename}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    await fs.writeFile(filePath, buffer);
    
    const publicPath = `/blog/uploads/${uniqueFilename}`;
    res.json({ success: true, url: publicPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`CMS Server running on http://localhost:${PORT}`);
  console.log(`Admin Login: http://localhost:${PORT}/login`);
  console.log(`Username: ${ADMIN_CREDENTIALS.username}`);
  console.log(`Password: ${ADMIN_CREDENTIALS.password}`);
});
