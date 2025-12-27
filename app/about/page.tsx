import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'GraphQL',
  'REST APIs',
  'UI/UX Design',
  'Web Performance',
  'DevOps',
  'AWS',
];

const experience = [
  {
    year: '2022 - Present',
    role: 'Senior Product Designer',
    company: 'Tech Innovations Co.',
    description:
      'Leading design systems and product strategy for a team of 15 designers and engineers, driving user-centered design across 5+ products.',
  },
  {
    year: '2020 - 2022',
    role: 'Full Stack Developer',
    company: 'Digital Solutions Inc.',
    description:
      'Built and maintained scalable web applications using React and Node.js, improving performance by 40% and reducing load times.',
  },
  {
    year: '2018 - 2020',
    role: 'Frontend Developer',
    company: 'Creative Studio',
    description:
      'Developed responsive web interfaces and collaborated with UX designers to implement pixel-perfect designs across multiple projects.',
  },
];

export const metadata = {
  title: 'About',
  description: 'Learn more about my experience and skills.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-24 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-6">
              About Me
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              I'm a creative professional with over 5 years of experience in design and full-stack
              development. I specialize in building beautiful, scalable digital products that solve
              real-world problems.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              My passion lies at the intersection of design and technology. I believe in creating
              intuitive user experiences backed by clean, maintainable code. Every project is an
              opportunity to push boundaries and deliver exceptional results.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              When I'm not working, you'll find me exploring new design trends, contributing to
              open-source projects, or sharing knowledge with the community.
            </p>
          </div>

          <div className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <Image
              src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg"
              alt="About section"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-8">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-4 py-2 text-sm font-medium dark:text-neutral-300 dark:border-neutral-600"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-neutral-900 dark:bg-white mt-2"></div>
                  {index !== experience.length - 1 && (
                    <div className="w-1 h-24 bg-neutral-200 dark:bg-neutral-700 mt-4"></div>
                  )}
                </div>

                <div className="pb-8">
                  <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">{item.role}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-3">{item.company}</p>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
