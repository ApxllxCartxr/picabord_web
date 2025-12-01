'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, LogOut } from 'lucide-react';

interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
  tags: string;
  content: string;
}

export default function CMSAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Software',
    tags: '[]',
    image: '',
    content: '',
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/cms/auth/status');
      const data = await response.json();
      if (!data.isAuthenticated) {
        router.push('/cms/login');
      }
    } catch (error) {
      router.push('/cms/login');
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/cms/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/cms/logout', { method: 'POST' });
    router.push('/cms/login');
  };

  const openCreateModal = () => {
    setEditingSlug(null);
    setFormData({
      title: '',
      excerpt: '',
      category: 'Software',
      tags: '[]',
      image: '',
      content: '',
    });
    setShowModal(true);
  };

  const openEditModal = async (id: string) => {
    try {
      const response = await fetch(`/api/cms/posts/${id}`);
      const data = await response.json();
      setEditingSlug(id);
      setFormData({
        title: data.title || '',
        excerpt: data.excerpt || '',
        category: data.category || 'Software',
        tags: data.tags || '[]',
        image: data.image || '',
        content: data.content || '',
      });
      setShowModal(true);
    } catch (error) {
      alert('Failed to load post');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingSlug ? `/api/cms/posts/${editingSlug}` : '/api/cms/posts';
      const method = editingSlug ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingSlug ? 'Post updated!' : 'Post created!');
        setShowModal(false);
        loadPosts();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to save post');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/cms/posts/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        alert('Post deleted!');
        loadPosts();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5MB.');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        alert('Image uploaded successfully!');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent font-picabord">
                PICABORD CMS
              </h1>
              <p className="text-sm text-muted-foreground">Blog Management</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push('/')}>
                ← Website
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Blog Posts</h2>
          <Button onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No posts yet</p>
              <Button onClick={openCreateModal}>Create your first post</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <Badge variant="secondary">{post.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(post.id)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(post.id, post.title)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingSlug ? 'Edit Post' : 'Create New Post'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Post title"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Industry Insights">Industry Insights</option>
                      <option value="Company News">Company News</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Featured Image</label>
                    <div className="space-y-3">
                      {/* Image Preview */}
                      {formData.image && (
                        <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-muted">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '' })}
                            className="absolute top-2 right-2 bg-destructive text-white px-3 py-1 rounded-md text-sm hover:bg-destructive/90"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      
                      {/* Upload Button */}
                      <div className="flex gap-2">
                        <label className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                          />
                          <div className="w-full px-4 py-2 border border-dashed rounded-lg text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                            {uploading ? 'Uploading...' : '📤 Upload Image'}
                          </div>
                        </label>
                      </div>

                      {/* Manual URL Input */}
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Or paste image URL"
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload an image or paste a URL. Leave empty for no image.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Brief description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (JSON array)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder='["tag1", "tag2"]'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content (MDX) *</label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    rows={12}
                    placeholder="Write your MDX content here..."
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingSlug ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
