import Nav from '@/components/landing/Nav';
import Ticker from '@/components/landing/Ticker';
import Hero from '@/components/landing/Hero';
import { Press, Stats, Markets, Platform, Tiers, Testimonials, Company, CTA, Footer } from '@/components/landing/Sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-pearl">
      <Ticker />
      <Nav />
      <Hero />
      <Press />
      <Stats />
      <Markets />
      <Platform />
      <Tiers />
      <Testimonials />
      <Company />
      <CTA />
      <Footer />
    </main>
  );
}
