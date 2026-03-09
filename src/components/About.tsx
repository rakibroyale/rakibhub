import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm MD Badruddoza Rakib, a passionate web developer and digital
                craftsman with over five years of experience building modern,
                high-performance websites for businesses worldwide.
              </p>
              <p>
                My expertise spans across Shopify, WordPress, Webflow, Wix,
                Squarespace, and custom-coded solutions. I focus on creating
                websites that don't just look stunning — they drive measurable
                business results.
              </p>
              <p>
                Every project I take on is built with clean code, optimized for
                speed, and designed for conversion. I believe in transparent
                communication, timely delivery, and exceeding expectations.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Shopify",
                "WordPress",
                "Webflow",
                "Wix",
                "Squarespace",
                "React",
                "Tailwind CSS",
                "UI/UX Design",
                "SEO",
                "Performance Optimization",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-6 text-center"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
