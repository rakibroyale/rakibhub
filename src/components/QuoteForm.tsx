import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { z } from "zod";

/* =============================================
   GET A QUOTE — Multi-step dynamic form
   Sends all data via mailto to mdbadruddozarakib@gmail.com
   ============================================= */

const websiteTypes = ["Business", "Ecommerce", "Agency", "B2B", "Others"];
const platforms = ["Shopify", "WordPress", "Webflow", "Wix", "Squarespace", "Custom"];

/* Pages-based platforms vs products-based */
const pagesPlatforms = ["WordPress", "Webflow", "Wix", "Squarespace"];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(5, "Phone number is required").max(30),
});

interface FormData {
  websiteType: string;
  customType: string;
  platform: string;
  pages: string;
  products: string;
  references: string;
  name: string;
  email: string;
  phone: string;
}

const initialData: FormData = {
  websiteType: "",
  customType: "",
  platform: "",
  pages: "",
  products: "",
  references: "",
  name: "",
  email: "",
  phone: "",
};

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  /* Determine total steps */
  const needsConditional = data.platform && data.platform !== "Custom";
  const totalSteps = 5; // type → platform → conditional → references → contact

  const canNext = (): boolean => {
    switch (step) {
      case 0:
        return data.websiteType !== "" && (data.websiteType !== "Others" || data.customType.trim() !== "");
      case 1:
        return data.platform !== "";
      case 2:
        if (!needsConditional) return true;
        if (data.platform === "Shopify") return data.products !== "";
        return data.pages !== "";
      case 3:
        return true; // references optional
      case 4: {
        const result = contactSchema.safeParse({ name: data.name, email: data.email, phone: data.phone });
        return result.success;
      }
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const result = contactSchema.safeParse({ name: data.name, email: data.email, phone: data.phone });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const type = data.websiteType === "Others" ? data.customType : data.websiteType;
    const conditional =
      data.platform === "Shopify"
        ? `Products: ${data.products}`
        : pagesPlatforms.includes(data.platform)
        ? `Pages: ${data.pages}`
        : "N/A";

    const body = [
      `Website Type: ${type}`,
      `Platform: ${data.platform}`,
      conditional,
      `Design References: ${data.references || "None provided"}`,
      ``,
      `Client Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
    ].join("\n");

    const subject = encodeURIComponent(`Quote Request from ${data.name}`);
    const mailBody = encodeURIComponent(body);

    window.open(
      `mailto:mdbadruddozarakib@gmail.com?subject=${subject}&body=${mailBody}`,
      "_self"
    );

    setSubmitted(true);
  };

  const next = () => {
    /* Skip conditional step if platform is Custom */
    if (step === 1 && data.platform === "Custom") {
      setStep(3);
    } else if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step === 3 && data.platform === "Custom") {
      setStep(1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  if (submitted) {
    return (
      <section id="quote" className="section-padding">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-10 md:p-14"
          >
            <CheckCircle className="mx-auto text-primary mb-6" size={48} />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Thank You!
            </h2>
            <p className="text-muted-foreground">
              Your quote request has been prepared. Please send the email that was
              opened to complete your submission. I'll get back to you within 24
              hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="section-padding">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get a <span className="gradient-text">Quote</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell me about your project and I'll get back to you with a custom
            proposal.
          </p>
        </motion.div>

        <div className="glass-card rounded-2xl p-6 md:p-10">
          {/* Progress bar */}
          <div className="flex gap-1.5 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Website Type */}
              {step === 0 && (
                <div>
                  <label className="block font-heading font-semibold text-lg mb-4">
                    What type of website do you need?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {websiteTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => update("websiteType", type)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          data.websiteType === type
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {data.websiteType === "Others" && (
                    <input
                      type="text"
                      placeholder="Describe your website type"
                      value={data.customType}
                      onChange={(e) => update("customType", e.target.value)}
                      maxLength={100}
                      className="mt-4 w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}
                </div>
              )}

              {/* Step 1: Platform */}
              {step === 1 && (
                <div>
                  <label className="block font-heading font-semibold text-lg mb-4">
                    Preferred platform?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {platforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => update("platform", p)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          data.platform === p
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Conditional — pages or products */}
              {step === 2 && (
                <div>
                  {data.platform === "Shopify" ? (
                    <>
                      <label className="block font-heading font-semibold text-lg mb-4">
                        How many products? (1–500)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={data.products}
                        onChange={(e) => update("products", e.target.value)}
                        placeholder="e.g. 50"
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </>
                  ) : (
                    <>
                      <label className="block font-heading font-semibold text-lg mb-4">
                        How many pages? (1–20)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={data.pages}
                        onChange={(e) => update("pages", e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Design References */}
              {step === 3 && (
                <div>
                  <label className="block font-heading font-semibold text-lg mb-4">
                    Any design references? (optional)
                  </label>
                  <textarea
                    rows={4}
                    value={data.references}
                    onChange={(e) => update("references", e.target.value)}
                    placeholder="Paste website URLs you like for inspiration..."
                    maxLength={1000}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <div className="space-y-4">
                  <label className="block font-heading font-semibold text-lg mb-2">
                    Your contact details
                  </label>
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      maxLength={100}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      maxLength={255}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      maxLength={30}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {step < totalSteps - 1 ? (
              <button
                onClick={next}
                disabled={!canNext()}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium neon-glow-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext()}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium neon-glow-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
