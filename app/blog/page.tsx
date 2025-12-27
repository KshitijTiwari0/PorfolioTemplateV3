import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest articles and insights',
};

export default function BlogPage() {
  const posts = getAllPosts('content/blog');

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-neutral-600">
            Insights, tutorials, and stories from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full overflow-hidden hover:border-neutral-400 transition-all duration-300 hover:shadow-lg">
                {post.metadata.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={post.metadata.coverImage}
                      alt={post.metadata.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <CardTitle className="text-xl group-hover:text-neutral-600 transition-colors">
                      {post.metadata.title}
                    </CardTitle>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <CardDescription className="text-sm">
                    {formatDate(post.metadata.date)}
                    {post.metadata.author && ` • By ${post.metadata.author}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 line-clamp-2">
                    {post.metadata.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-neutral-600">No blog posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
