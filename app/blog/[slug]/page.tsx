import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

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
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <article className="w-full pt-24">
        {post.metadata.coverImage && (
          <div className="relative h-96 w-full overflow-hidden bg-muted">
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
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {post.metadata.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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

          <div className="prose prose-lg max-w-none prose-neutral dark:prose-invert">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}