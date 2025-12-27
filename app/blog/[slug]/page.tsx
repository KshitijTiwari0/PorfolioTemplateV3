import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs('content/blog');
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug, 'content/blog');
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug, 'content/blog');

  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="w-full">
        {post.metadata.coverImage && (
          <div className="relative h-96 w-full overflow-hidden bg-neutral-200">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
              {post.metadata.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
              <time dateTime={post.metadata.date}>
                {formatDate(post.metadata.date)}
              </time>
              {post.metadata.author && (
                <>
                  <span>•</span>
                  <span>By {post.metadata.author}</span>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-lg max-w-none prose-neutral">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
}
