const brands = [
  { name: "Kyo Active", logo: "/logos/kyo-active.svg" },
  { name: "Helyme", logo: "/logos/helyme.png" },
  { name: "808 Clothing", logo: "/logos/808-clo.png" },
  { name: "Peso Clothing", logo: "/logos/peso.png" },
  { name: "DFYNE", logo: "/logos/dfyne.png" },
  { name: "Lumera", logo: "/logos/lumera.png" },
];

const BrandScroller = () => {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="flex items-center scroll-track" style={{ width: "max-content" }}>
        {doubled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex items-center justify-center px-10 md:px-16"
          >
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-300"
              />
            ) : (
              <span className="text-muted-foreground font-heading text-lg md:text-xl font-semibold whitespace-nowrap opacity-40 hover:opacity-80 transition-opacity duration-300">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandScroller;
