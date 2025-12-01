import { NextRequest, NextResponse } from 'next/server';
// Force Node runtime (this route uses `fs` for reading/writing files)
export const runtime = 'nodejs';
import { cookies } from 'next/headers';
import * as fs from 'fs';
import * as path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

type RouteContext = { params: Promise<{ slug: string }> };
type PostData = Record<string, string> & {
	id: string;
	slug: string;
	content: string;
};

async function checkAuth() {
	const cookieStore = await cookies();
	const session = cookieStore.get('cms-session');
	return session?.value === 'authenticated';
}

async function ensureBlogDir() {
	if (!fs.existsSync(BLOG_DIR)) {
		await fs.promises.mkdir(BLOG_DIR, { recursive: true });
	}
}

function parseFrontmatter(content: string) {
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (!frontmatterMatch) {
		return { frontmatter: {} as Record<string, string>, body: content.trim() };
	}

	const frontmatter: Record<string, string> = {};
	frontmatterMatch[1].split('\n').forEach(line => {
		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length) {
			const value = valueParts.join(':').trim().replace(/^"|"$/g, '');
			frontmatter[key.trim()] = value;
		}
	});

	const body = content.replace(frontmatterMatch[0], '').trim();
	return { frontmatter, body };
}

async function readPostFile(filePath: string): Promise<PostData> {
	const raw = await fs.promises.readFile(filePath, 'utf-8');
	const { frontmatter, body } = parseFrontmatter(raw);
	const id = frontmatter.id || path.basename(filePath, '.mdx');
	const slug = frontmatter.slug || id;

	return {
		id,
		slug,
		...frontmatter,
		content: body,
	};
}

async function findPostBySlug(slug: string): Promise<{ filePath: string; data: PostData } | null> {
	await ensureBlogDir();

	const directPath = path.join(BLOG_DIR, `${slug}.mdx`);
	if (fs.existsSync(directPath)) {
		const data = await readPostFile(directPath);
		return { filePath: directPath, data };
	}

	const files = await fs.promises.readdir(BLOG_DIR);
	for (const file of files) {
		if (!file.endsWith('.mdx')) continue;

		const filePath = path.join(BLOG_DIR, file);
		const data = await readPostFile(filePath);
		if (data.slug === slug || data.id === slug) {
			return { filePath, data };
		}
	}

	return null;
}

function generateSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

function escapeQuotes(value: string) {
	return value.replace(/\r?\n/g, ' ').replace(/"/g, '\\"');
}

export async function GET(_: NextRequest, { params }: RouteContext) {
	const isAuth = await checkAuth();
	if (!isAuth) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { slug } = await params;
		const match = await findPostBySlug(slug);
		if (!match) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}

		return NextResponse.json(match.data);
	} catch (error) {
		console.error('GET /api/cms/posts/[slug] error:', error);
		return NextResponse.json({ error: 'Failed to retrieve post' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
	const isAuth = await checkAuth();
	if (!isAuth) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { slug: paramSlug } = await params;
		const match = await findPostBySlug(paramSlug);
		if (!match) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}

		const { title, excerpt, category, tags, image, content } = await request.json();

		if (!title || !content) {
			return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
		}

		const id = match.data.id;
		const slug = generateSlug(title);
		const date = match.data.date || new Date().toISOString().split('T')[0];

		const frontmatter = `---\nid: "${escapeQuotes(id)}"\nslug: "${escapeQuotes(slug)}"\ntitle: "${escapeQuotes(title)}"\ndate: "${escapeQuotes(date)}"\nexcerpt: "${escapeQuotes(excerpt || '')}"\ncategory: "${escapeQuotes(category || 'Software')}"\ntags: ${tags || '[]'}${image ? `\nimage: "${escapeQuotes(image)}"` : ''}\nauthor: "${escapeQuotes(match.data.author || 'PICABORD Team')}"\npublished: ${match.data.published === 'false' ? 'false' : 'true'}\n---\n\n${content}`;

		await fs.promises.writeFile(match.filePath, frontmatter, 'utf-8');

		return NextResponse.json({ success: true, id, slug, message: 'Post updated successfully' });
	} catch (error) {
		console.error('PUT /api/cms/posts/[slug] error:', error);
		return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
	}
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
	const isAuth = await checkAuth();
	if (!isAuth) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { slug } = await params;
		const match = await findPostBySlug(slug);
		if (!match) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}

		await fs.promises.unlink(match.filePath);
		return NextResponse.json({ success: true, message: 'Post deleted successfully' });
	} catch (error) {
		console.error('DELETE /api/cms/posts/[slug] error:', error);
		return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
	}
}

