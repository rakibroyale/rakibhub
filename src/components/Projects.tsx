import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* =============================================
   PROJECTS DATA
   Replace the `image` values with actual screenshots.
   ============================================= */
const projects: { title: string; url: string; image: string; tag: string; video?: string }[] = [
  {
    title: "Kyo Active",
    url: "https://kyoactive.com/en",
    video: "/videos/kyo-active-showcase.mp4",
    image: "/placeholder.svg",
    tag: "Shopify",
  },
  {
    title: "Volera Beauty",
    url: "https://volerabeauty.com",
    image: "/placeholder.svg",
    tag: "Shopify",
  },
  {
    title: "DFYNE",
    url: "https://uk.dfyne.com/",
    image: "/placeholder.svg",
    tag: "Shopify",
  },
  {
    title: "Peso Clothing",
    url: "https://pesoclo.com/en-row",
    image: "/placeholder.svg",
    tag: "Shopify",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A selection of recent work showcasing premium design and development.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={item}
              className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Project image — replace placeholder.svg with real screenshots */}
              <div className="relative aspect-video bg-secondary overflow-hidden">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {project.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  aria-label={`Visit ${project.title}`}
                >
                  Visit Site
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
