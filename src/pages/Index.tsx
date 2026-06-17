import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Below-the-fold components lazy-loaded for faster LCP
const Services = lazy(() => import("@/components/Services"));
const Projects = lazy(() => import("@/components/Projects"));
const BrandScroller = lazy(() => import("@/components/BrandScroller"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const About = lazy(() => import("@/components/About"));
const QuoteForm = lazy(() => import("@/components/QuoteForm"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Services />
          <Projects />
          <BrandScroller />
          <Testimonials />
          <About />
          <QuoteForm />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
