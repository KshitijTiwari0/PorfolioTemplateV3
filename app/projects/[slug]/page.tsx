import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs, getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ArrowRight } from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs('content/projects');
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getPostBySlug(params.slug, 'content/projects');
  return {
    title: project.metadata.title,
    description: project.metadata.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getPostBySlug(params.slug, 'content/projects');
  const allProjects = getAllPosts('content/projects');
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="w-full">
        {project.metadata.coverImage && (
          <div className="relative h-96 w-full overflow-hidden bg-neutral-200">
            <Image
              src={project.metadata.coverImage}
              alt={project.metadata.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
                  {project.metadata.title}
                </h1>
                {project.metadata.category && (
                  <Badge variant="outline" className="mb-4">
                    {project.metadata.category}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              {project.metadata.client && (
                <div>
                  <span className="font-medium text-neutral-900">Client:</span>
                  <span className="ml-2">{project.metadata.client}</span>
                </div>
              )}
              <time dateTime={project.metadata.date}>
                {formatDate(project.metadata.date)}
              </time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none prose-neutral mb-16">
            <MDXRemote source={project.content} />
          </div>

          <div className="border-t border-neutral-200 pt-12">
            <p className="text-sm text-neutral-600 mb-4">Next Case Study</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group block p-6 border border-neutral-200 rounded-lg hover:border-neutral-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {nextProject.metadata.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {nextProject.metadata.category}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" />
              </div>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
