const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-heading text-lg font-bold mb-2">
              MD Badruddoza <span className="text-primary">Rakib</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium web development agency crafting high-performance digital
              experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-heading font-semibold text-sm mb-3">
              Quick Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-heading font-semibold text-sm mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:mdbadruddozarakib@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  mdbadruddozarakib@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801914394765"
                  className="hover:text-primary transition-colors"
                >
                  +880 1914 394765
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} MD Badruddoza Rakib. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
