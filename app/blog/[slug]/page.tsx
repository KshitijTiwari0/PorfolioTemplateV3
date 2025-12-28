import { getPostBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, 'blog');

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
        
        <article>
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              {post.meta.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <time>{post.meta.date}</time>
              <span>•</span>
              <span>{post.meta.category || 'General'}</span>
            </div>
          </header>

          {/* CRITICAL FIX: 
            'prose' styles the markdown. 
            'dark:prose-invert' flips the text color to white in dark mode.
          */}
          <div className="prose prose-neutral dark:prose-invert max-w-none 
            prose-headings:font-serif prose-headings:font-bold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:shadow-md">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}