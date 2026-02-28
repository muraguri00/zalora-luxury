import { Crown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface LuxuryHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
}

const LuxuryHeader = ({ title, subtitle, backTo, backLabel }: LuxuryHeaderProps) => {
  return (
    <header className="relative border-b border-accent/20 bg-gradient-to-r from-primary via-charcoal to-primary overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        {backTo ? (
          <Link
            to={backTo}
            className="flex items-center gap-2 font-sans text-xs tracking-wide-luxury text-accent transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel || "BACK"}
          </Link>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-accent" strokeWidth={1.5} />
          <span className="font-serif text-2xl tracking-luxury text-primary-foreground">ZALORA</span>
        </div>

        <div />
      </div>

      <div className="pb-8 text-center">
        {subtitle && (
          <p className="font-sans text-xs tracking-luxury text-primary-foreground/50">
            {subtitle}
          </p>
        )}
        <h1 className="mt-1 font-display text-3xl font-light text-primary-foreground">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default LuxuryHeader;
