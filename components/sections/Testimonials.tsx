'use client';

import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'Tech Startups Inc.',
    role: 'CEO',
    content:
      'Working with this team transformed our digital presence. Their attention to detail and innovative approach exceeded all expectations.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Digital Marketing Co.',
    role: 'Marketing Director',
    content:
      'The results speak for themselves. We saw a 150% increase in engagement and our customers love the new interface.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3762284/pexels-photo-3762284.jpeg',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    company: 'Creative Agency',
    role: 'Founder',
    content:
      'A true partner in our growth journey. Professional, responsive, and always willing to go the extra mile.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3785935/pexels-photo-3785935.jpeg',
  },
  {
    id: 4,
    name: 'David Park',
    company: 'E-commerce Solutions',
    role: 'Product Manager',
    content:
      'Outstanding work on our platform redesign. The performance improvements alone saved us thousands monthly.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollLeft(emblaApi.canScrollPrev());
      setCanScrollRight(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handlePrev = () => emblaApi?.scrollPrev();
  const handleNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Hear from the teams and companies we've had the pleasure of working with
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            className="absolute -left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className="absolute -right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
