import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/sections/Navbar'; // Added Navbar to ensure consistency
import Footer from '@/components/sections/Footer'; // Added Footer

export const metadata = {
  title: 'Blog',
  description: 'Read our latest articles and insights',
};

export default function BlogPage() {
  const posts = getAllPosts('content/blog');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights, tutorials, and stories from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-card text-card-foreground">
                {post.metadata.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
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
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.metadata.title}
                    </CardTitle>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {formatDate(post.metadata.date)}
                    {post.metadata.author && ` • By ${post.metadata.author}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.metadata.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No blog posts yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}