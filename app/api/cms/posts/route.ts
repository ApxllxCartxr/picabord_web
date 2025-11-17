import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('cms-session');
  return session?.value === 'authenticated';
}

async function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    await fs.promises.mkdir(BLOG_DIR, { recursive: true });
  }

  const files = await fs.promises.readdir(BLOG_DIR);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const content = await fs.promises.readFile(path.join(BLOG_DIR, file), 'utf-8');
      const id = file.replace('.mdx', '');

      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter: any = {};
        frontmatterMatch[1].split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            frontmatter[key.trim()] = value;
          }
        });

        return {
          id,
          slug: frontmatter.slug || id,
          ...frontmatter,
          content: content.replace(frontmatterMatch[0], '').trim()
        };
      }

      return { id, slug: id, content };
    })
  );

  return posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET(request: NextRequest) {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, excerpt, category, tags, image, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const id = randomUUID();
    const slug = generateSlug(title);
    const date = new Date().toISOString().split('T')[0];

    const frontmatter = `---
id: "${id}"
slug: "${slug}"
title: "${title}"
date: "${date}"
excerpt: "${excerpt || ''}"
category: "${category || 'Software'}"
tags: ${tags || '[]'}${image ? `\nimage: "${image}"` : ''}
author: "PICABORD Team"
published: true
---

${content}`;

    const filePath = path.join(BLOG_DIR, `${id}.mdx`);
    await fs.promises.writeFile(filePath, frontmatter);

    return NextResponse.json({ success: true, id, slug, message: 'Post created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
