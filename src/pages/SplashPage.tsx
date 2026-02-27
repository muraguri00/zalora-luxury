import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-splash.jpg";
import { ArrowRight } from "lucide-react";

const SplashPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Full-screen hero */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury fashion"
          className="absolute inset-0 h-full w-full object-cover animate-fade-in-slow"
        />
        <div className="absolute inset-0 bg-primary/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <p className="animate-slide-up font-body text-xs uppercase tracking-luxury text-primary-foreground/70 mb-6">
            Established 2025
          </p>
          <h1 className="animate-slide-up font-display text-6xl font-light tracking-luxury text-primary-foreground sm:text-8xl lg:text-9xl">
            ZALORA
          </h1>
          <div className="animate-slide-up-delay mt-2 h-px w-24 bg-accent" />
          <p className="animate-slide-up-delay mt-8 max-w-md font-body text-sm font-light leading-relaxed text-primary-foreground/80 tracking-wide">
            Where luxury meets distinction. Curated collections from the world's
            most prestigious ateliers.
          </p>
          <div className="animate-slide-up-delay-2 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <Link to="/catalog">
                Enter the Boutique
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-12 border-t border-primary-foreground/10 bg-primary/30 px-6 py-4 backdrop-blur-sm">
        {["Free Worldwide Shipping", "Authenticity Guaranteed", "Exclusive Collections"].map((text) => (
          <span key={text} className="hidden font-body text-[10px] uppercase tracking-luxury text-primary-foreground/60 sm:block">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SplashPage;
