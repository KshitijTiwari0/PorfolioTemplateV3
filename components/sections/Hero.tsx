import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            Transform Your Vision Into Reality
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
            We deliver innovative solutions that drive growth and create lasting impact for businesses worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              Contact Me
            </Link>
            <Link 
              href="/projects"
              className="px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium rounded-md border-2 border-neutral-900 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              View Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}