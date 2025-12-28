import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  author?: string;
  category?: string;
  client?: string;
}

export interface Post {
  slug: string;
  content: string;
  metadata: PostMetadata;
}

export function getPostSlugs(directory: string): string[] {
  const postsDirectory = path.join(process.cwd(), directory);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string, directory: string): Post {
  const postsDirectory = path.join(process.cwd(), directory);
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    metadata: data as PostMetadata,
  };
}

export function getAllPosts(directory: string): Post[] {
  const slugs = getPostSlugs(directory);
  const posts = slugs.map((slug) => getPostBySlug(slug, directory));

  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
}
