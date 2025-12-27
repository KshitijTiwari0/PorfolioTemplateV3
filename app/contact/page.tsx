'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-24 pb-20 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Have a question or project in mind? I'd love to hear from you.
          </p>
        </div>

        {isSubmitted && (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-300">Message sent successfully</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-neutral-900 dark:text-white font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register('name')}
              className="mt-2 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
            />
            {errors.name && (
              <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-neutral-900 dark:text-white font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
              className="mt-2 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
            />
            {errors.email && (
              <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="subject" className="text-neutral-900 dark:text-white font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="What is this about?"
              {...register('subject')}
              className="mt-2 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
            />
            {errors.subject && (
              <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.subject.message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="message" className="text-neutral-900 dark:text-white font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell me more about your project..."
              rows={6}
              {...register('message')}
              className="mt-2 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 resize-none"
            />
            {errors.message && (
              <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.message.message}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-medium py-3"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Email</h3>
              <a href="mailto:hello@example.com" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                hello@example.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Location</h3>
              <p className="text-neutral-600 dark:text-neutral-400">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
