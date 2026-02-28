import { Link } from "react-router-dom";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-splash.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const SplashPage = () => {
  return (
    <div className="min-h-screen bg-primary luxury-grid-pattern">
      {/* Top gold gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Crown icon */}
        <div className="animate-scale-in">
          <Crown className="h-16 w-16 text-accent" strokeWidth={1} />
        </div>

        {/* Logo */}
        <h1 className="animate-slide-up mt-8 font-serif text-8xl font-light tracking-luxury text-primary-foreground md:text-9xl">
          ZALORA
        </h1>

        {/* Gold divider */}
        <div className="animate-slide-up-delay mt-6 h-[1px] w-32 bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* Tagline */}
        <p className="animate-slide-up-delay mt-6 font-sans text-sm tracking-[0.4em] text-accent md:text-base">
          HAUTE COUTURE & TIMELESS ELEGANCE
        </p>

        {/* 3-column image grid */}
        <div className="animate-scale-in-delay mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { src: heroImage, label: "Fashion" },
            { src: product1, label: "Leather" },
            { src: product3, label: "Silk" },
          ].map((img) => (
            <div
              key={img.label}
              className="group relative aspect-[3/4] overflow-hidden border border-accent/30 md:aspect-[2/3]"
            >
              <img
                src={img.src}
                alt={img.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Sparkles className="mx-auto h-5 w-5 text-accent" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up-delay-4 mt-16">
          <Link
            to="/catalog"
            className="group relative inline-flex items-center gap-3 overflow-hidden border-2 border-accent px-16 py-5 font-sans text-sm font-bold tracking-luxury text-primary-foreground transition-all duration-500 hover:shadow-gold"
            style={{
              background: "linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)), hsl(var(--gold-dark)))",
              backgroundSize: "200% 100%",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.backgroundPosition = "100% 0");
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.backgroundPosition = "0 0");
            }}
          >
            <Crown className="h-4 w-4" />
            <span className="text-primary">ENTER BOUTIQUE</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>

        {/* Footer tagline */}
        <p className="animate-slide-up-delay-4 mt-12 font-sans text-xs tracking-[0.3em] text-primary-foreground/40">
          LUXURY REDEFINED · SINCE 2025
        </p>
      </div>

      {/* Bottom gold gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Footer */}
      <div className="border-t border-accent/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="font-sans text-[10px] tracking-[0.2em] text-primary-foreground/30">
            © 2025 ZALORA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <span
                key={link}
                className="cursor-pointer font-sans text-[10px] tracking-[0.2em] text-primary-foreground/30 transition-colors hover:text-accent"
              >
                {link.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
