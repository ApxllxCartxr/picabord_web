import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as fs from 'fs';
import * as path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('cms-session');
  return session?.value === 'authenticated';
}

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const isAuth = await checkAuth();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { slug: id } = await params;
  try {
    const content = await fs.promises.readFile(path.join(BLOG_DIR, `${id}.mdx`), 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter: any = {};
      frontmatterMatch[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      });
      return NextResponse.json({ id, ...frontmatter, content: content.replace(frontmatterMatch[0], '').trim() });
    }
    return NextResponse.json({ id, content });
  } catch (error) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const isAuth = await checkAuth();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { slug: id } = await params;
  const { title, excerpt, category, tags, image, content } = await request.json();
  if (!title || !content) return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  
  const filePath = path.join(BLOG_DIR, `${id}.mdx`);
  let existingDate = new Date().toISOString().split('T')[0];
  let existingId = id;
  
  try {
    const existing = await fs.promises.readFile(filePath, 'utf-8');
    const dateMatch = existing.match(/date: "(.+?)"/);
    if (dateMatch) existingDate = dateMatch[1];
    const idMatch = existing.match(/id: "(.+?)"/);
    if (idMatch) existingId = idMatch[1];
  } catch (e) {}
  
  const slug = generateSlug(title);
  const imageField = image ? `\nimage: "${image}"` : '';
  const newContent = `---
id: "${existingId}"
slug: "${slug}"
title: "${title}"
date: "${existingDate}"
excerpt: "${excerpt || ''}"
category: "${category || 'Software'}"
tags: ${tags || '[]'}${imageField}
author: "PICABORD Team"
published: true
---

${content}`;
  
  await fs.promises.writeFile(filePath, newContent);
  return NextResponse.json({ success: true, id: existingId, slug, message: 'Post updated successfully' });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const isAuth = await checkAuth();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { slug: id } = await params;
  try {
    await fs.promises.unlink(path.join(BLOG_DIR, `${id}.mdx`));
    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
