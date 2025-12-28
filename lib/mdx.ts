import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();

export async function getPostBySlug(slug: string, type: 'blog' | 'projects') {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(root, 'content', type, `${realSlug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      meta: {
        ...data,
        slug: realSlug,
      },
      content,
    };
  } catch (e) {
    return null;
  }
}

export async function getAllPosts(type: 'blog' | 'projects') {
  const files = fs.readdirSync(path.join(root, 'content', type));

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const filePath = path.join(root, 'content', type, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      meta: {
        ...data,
        slug,
      },
    };
  });

  return posts.sort((a: any, b: any) => {
    if (a.meta.date > b.meta.date) return -1;
    return 1;
  });
}