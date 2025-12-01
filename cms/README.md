# PICABORD Blog CMS

A simple Express-based Content Management System for managing blog posts.

## Features

- ✅ Secure admin authentication with hardcoded credentials
- ✅ Create, read, update, and delete blog posts
- ✅ MDX file format support
- ✅ Image upload support
- ✅ Session-based authentication
- ✅ Beautiful admin interface
- ✅ Categories and tags management

## Installation

1. Navigate to the cms directory:
```bash
cd cms
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Usage

1. **Access the CMS:**
   - Open your browser and navigate to: `http://localhost:3001/login`

2. **Login Credentials:**
   - Username: `admin`
   - Password: `picabord2025`

3. **Admin Dashboard:**
   - After login, you'll be redirected to `/admin`
   - View all blog posts
   - Create new posts
   - Edit existing posts
   - Delete posts

## API Endpoints

### Authentication
- `POST /api/login` - Login with credentials
- `POST /api/logout` - Logout current session
- `GET /api/auth/status` - Check authentication status

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:slug` - Update post
- `DELETE /api/posts/:slug` - Delete post

### Media
- `POST /api/upload` - Upload image

## File Structure

```
cms/
├── server.js           # Express server
├── package.json        # Dependencies
└── public/
    ├── login.html     # Login page
    └── admin.html     # Admin dashboard
```

## Security Notes

⚠️ **IMPORTANT:** 
- Change the default admin password in `server.js`
- Change the session secret in production
- Enable HTTPS in production
- Consider using environment variables for sensitive data

## Configuration

Edit `server.js` to customize:

```javascript
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'your-secure-password-here'
};
```

## Blog Post Format

Posts are stored as MDX files with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-11-12"
excerpt: "Brief description"
category: "Technology"
tags: ["tag1", "tag2"]
image: "/blog/image.jpg"
author: "PICABORD Team"
---

Your content here in MDX format...
```

## Production Deployment

1. Set environment variables:
```bash
export NODE_ENV=production
export CMS_PORT=3001
```

2. Use a process manager like PM2:
```bash
pm2 start server.js --name picabord-cms
```

3. Set up a reverse proxy (nginx/Apache) for HTTPS

## Troubleshooting

- **Can't login:** Check credentials in server.js
- **Posts not showing:** Ensure `content/blog` directory exists
- **Port conflict:** Change CMS_PORT in server.js or use environment variable
