import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Portfolio',
  description: 'Explore our case studies and project work',
};

export default function ProjectsPage() {
  const projects = getAllPosts('content/projects');

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-neutral-600">
            Case studies and projects we're proud of
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
              <Card className="h-full overflow-hidden hover:border-neutral-400 transition-all duration-300 hover:shadow-lg">
                {project.metadata.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={project.metadata.coverImage}
                      alt={project.metadata.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-neutral-600 transition-colors mb-2">
                        {project.metadata.title}
                      </CardTitle>
                      {project.metadata.category && (
                        <Badge variant="outline" className="mb-2">
                          {project.metadata.category}
                        </Badge>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <CardDescription className="text-sm">
                    {formatDate(project.metadata.date)}
                    {project.metadata.client && ` • ${project.metadata.client}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 line-clamp-2">
                    {project.metadata.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-neutral-600">No projects yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
