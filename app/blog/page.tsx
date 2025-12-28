import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import FadeIn from '@/components/ui/fade-in';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog - Apex Portfolio',
  description: 'Thoughts, ideas, and guides on software development.',
};

export default async function BlogPage() {
  const posts = await getAllPosts('blog');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-serif font-bold mb-4">The Blog</h1>
            <p className="text-muted-foreground text-lg">
              Insights, tutorials, and updates from my journey.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any, index: number) => (
            <FadeIn key={post.meta.slug} delay={index * 0.1}>
              <Link href={`/blog/${post.meta.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 bg-card dark:bg-neutral-900 border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="mb-2">
                        {post.meta.category || 'Article'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.meta.date}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-xl leading-tight">
                      {post.meta.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.meta.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}