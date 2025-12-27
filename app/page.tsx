import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/sections/Footer';
import FadeIn from '@/components/ui/fade-in';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <FadeIn>
          <Hero />
        </FadeIn>
        <FadeIn delay={0.2}>
          <Services />
        </FadeIn>
        <FadeIn delay={0.3}>
          <Testimonials />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
