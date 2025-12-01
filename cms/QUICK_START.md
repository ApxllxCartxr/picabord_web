# 🚀 PICABORD Blog CMS - Quick Start Guide

## ✅ CMS is Now Running!

The CMS server is running on **http://localhost:3001**

## 📝 Login Credentials

- **URL:** http://localhost:3001/login
- **Username:** `admin`
- **Password:** `picabord2025`

## 🎯 Quick Start

### 1. Access the Admin Panel
Open your browser and go to: http://localhost:3001/login

### 2. Login
Use the credentials above to login

### 3. Manage Blog Posts
Once logged in, you can:
- ✅ View all blog posts
- ✅ Create new posts
- ✅ Edit existing posts
- ✅ Delete posts

## 📁 File Structure

All blog posts are stored as MDX files in:
```
content/blog/*.mdx
```

## 🔧 CMS Features

### Blog Post Management
- **Create Posts:** Click "Create New Post" button
- **Edit Posts:** Click "Edit" on any post card
- **Delete Posts:** Click "Delete" on any post card
- **Categories:** Technology, Hardware, Software, IoT, AI/ML, Tutorials, News
- **Tags:** Add custom tags in JSON array format
- **Images:** Add image URLs for post thumbnails
- **MDX Content:** Write rich content with MDX syntax

### Post Format
```mdx
---
title: "Your Post Title"
date: "2025-11-12"
excerpt: "Brief description of your post"
category: "Technology"
tags: ["web", "technology", "tutorial"]
image: "/blog/your-image.jpg"
author: "PICABORD Team"
---

Your content here...

## Heading
Content...
```

## 🔐 Security

### Change Default Password
Edit `cms/server.js`:
```javascript
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'your-new-secure-password'
};
```

### Change Session Secret
Edit `cms/server.js`:
```javascript
session({
  secret: 'your-new-secret-key-here',
  // ...
})
```

## 🚀 Deployment

### Development
```bash
cd cms
npm run dev  # Auto-reload on changes
```

### Production
```bash
cd cms
npm start
```

Or use PM2:
```bash
pm2 start cms/server.js --name picabord-cms
```

## 📊 API Endpoints

All endpoints require authentication (except login):

### Authentication
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/auth/status` - Check auth status

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:slug` - Update post
- `DELETE /api/posts/:slug` - Delete post

### Media
- `POST /api/upload` - Upload image (base64)

## 🛠️ Troubleshooting

### Port Already in Use
Change the port in server.js or use environment variable:
```bash
CMS_PORT=3002 npm start
```

### Can't Login
1. Check credentials in `cms/server.js`
2. Clear browser cookies
3. Restart the server

### Posts Not Showing
1. Ensure `content/blog` directory exists
2. Check file permissions
3. Verify MDX file format

## 📚 Next Steps

1. **Change the default password** in `cms/server.js`
2. **Create your first blog post** via the admin panel
3. **Customize categories** in `cms/public/admin.html`
4. **Add images** to `public/blog/` directory
5. **Set up HTTPS** for production deployment

## 🎨 Customization

### Add New Categories
Edit `cms/public/admin.html`, find the category select:
```html
<select id="category">
  <option value="YourCategory">Your Category</option>
</select>
```

### Styling
Edit the `<style>` sections in:
- `cms/public/login.html` - Login page
- `cms/public/admin.html` - Admin dashboard

## 🔄 Integration with Main Site

The blog posts created in the CMS are automatically available at:
```
http://localhost:3000/blog
```

The Next.js site reads from the same `content/blog/*.mdx` files.

## 📞 Support

For issues or questions:
1. Check the README.md
2. Review server logs in the terminal
3. Check browser console for errors

---

**Happy Blogging! 🎉**
