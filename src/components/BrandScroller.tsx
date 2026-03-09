/* =============================================
   BRAND LOGO AUTO SCROLLER
   Replace the placeholder brand names / logos below.
   To use images, replace the text spans with <img> tags.
   ============================================= */

const brands = [
  "Kyo Active",
  "Volera Beauty",
  "808 Clothing",
  "Peso Clothing",
  "Brand Five",
  "Brand Six",
  "Brand Seven",
  "Brand Eight",
];

const BrandScroller = () => {
  /* Duplicate array for seamless infinite scroll */
  const doubled = [...brands, ...brands];

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="flex scroll-track" style={{ width: "max-content" }}>
        {doubled.map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            className="flex items-center justify-center px-10 md:px-16"
          >
            {/* Replace with <img src="..." alt={brand} className="h-8 opacity-50 hover:opacity-100 transition-opacity" /> */}
            <span className="text-muted-foreground font-heading text-lg md:text-xl font-semibold whitespace-nowrap opacity-40 hover:opacity-80 transition-opacity duration-300">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandScroller;
