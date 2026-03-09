import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import BrandScroller from "@/components/BrandScroller";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import QuoteForm from "@/components/QuoteForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <BrandScroller />
      <Testimonials />
      <About />
      <QuoteForm />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
