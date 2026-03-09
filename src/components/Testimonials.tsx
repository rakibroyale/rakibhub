import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { useState } from "react";

/* =============================================
   TESTIMONIALS DATA
   Replace placeholder content with real testimonials.
   For video testimonials, add a `videoUrl` field.
   ============================================= */
const testimonials = [
  {
    name: "Alex Johnson",
    company: "Kyo Active",
    text: "Exceptional work on our Shopify store. The attention to detail and performance optimization exceeded our expectations. Sales increased 40% within the first month.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    company: "Volera Beauty",
    text: "Professional, responsive, and incredibly talented. Our new website perfectly captures our brand identity and has dramatically improved our online presence.",
    rating: 5,
  },
  {
    name: "David Chen",
    company: "808 Clothing",
    text: "From concept to launch, the entire process was seamless. The custom features and clean design set us apart from competitors. Highly recommended.",
    rating: 5,
  },
  {
    name: "Maria Lopez",
    company: "Peso Clothing",
    text: "Outstanding Shopify development. The store is fast, beautiful, and easy to manage. Customer feedback has been overwhelmingly positive.",
    rating: 5,
    /* Example video testimonial — uncomment and add URL:
    videoUrl: "https://www.youtube.com/embed/..." */
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Hear what our clients have to say about working with us.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed mb-6 text-sm md:text-base">
                "{t.text}"
              </p>

              {/* Video button (if available) */}
              {(t as any).videoUrl && (
                <button
                  onClick={() => setActiveVideo((t as any).videoUrl)}
                  className="inline-flex items-center gap-2 text-primary text-sm mb-4 hover:underline"
                >
                  <Play size={14} />
                  Watch Video Testimonial
                </button>
              )}

              <div>
                <p className="font-heading font-semibold text-foreground">
                  {t.name}
                </p>
                {t.company && (
                  <p className="text-muted-foreground text-sm">{t.company}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video testimonial"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
