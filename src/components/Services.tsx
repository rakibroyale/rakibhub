import { motion } from "framer-motion";
import {
  ShoppingBag,
  Globe,
  Layers,
  Code2,
  Layout,
  Figma,
} from "lucide-react";

const services = [
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    description:
      "Custom Shopify stores built for conversion. Theme development, app integration, and performance optimization.",
  },
  {
    icon: Globe,
    title: "WordPress Development",
    description:
      "Scalable WordPress sites with custom themes, plugins, and seamless CMS experiences tailored to your brand.",
  },
  {
    icon: Layers,
    title: "Webflow Development",
    description:
      "Pixel-perfect Webflow sites with stunning animations, CMS integration, and responsive design.",
  },
  {
    icon: Code2,
    title: "Custom Development",
    description:
      "Bespoke web applications built with modern frameworks for unique requirements and complex functionality.",
  },
  {
    icon: Layout,
    title: "Wix Development",
    description:
      "Professional Wix websites with custom functionality, Velo integrations, and optimized performance.",
  },
  {
    icon: Figma,
    title: "Squarespace Development",
    description:
      "Elegant Squarespace sites with custom CSS, third-party integrations, and brand-aligned design.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            End-to-end web development services to bring your digital vision to
            life.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group glass-card rounded-xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:neon-glow-sm transition-shadow duration-300">
                <service.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
