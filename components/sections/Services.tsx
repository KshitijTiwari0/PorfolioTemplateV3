import { Zap, Shield, BarChart3, Users, Clock, Award } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Lightning-fast solutions optimized for speed and efficiency, ensuring your business stays ahead.',
    },
    {
      icon: Shield,
      title: 'Secure Solutions',
      description: 'Enterprise-grade security measures to protect your data and maintain user trust.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Data-driven insights that help you make informed decisions and grow your business.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless collaboration tools designed to enhance productivity and teamwork.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to ensure your operations run smoothly.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Award-winning quality standards maintained across all deliverables and services.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to elevate your business and drive sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-neutral-800 p-8 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg dark:hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-white dark:text-neutral-900" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
