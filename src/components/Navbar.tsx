import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Crown, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/catalog", label: "Shop" },
    { to: "/catalog?category=Bags", label: "Bags" },
    { to: "/catalog?category=Watches", label: "Watches" },
    { to: "/catalog?category=Accessories", label: "Accessories" },
    { to: "/catalog?category=Audio", label: "Audio" },
    { to: "/catalog?category=Televisions", label: "TVs" },
  ];

  if (location.pathname === "/") return null;

  return (
    <>
      {/* Shipping banner */}
      <div className="flex items-center justify-center gap-3 bg-primary px-6 py-2">
        <Sparkles className="h-3 w-3 text-accent" />
        <p className="font-sans text-[10px] tracking-[0.2em] text-primary-foreground/60">
          COMPLIMENTARY SHIPPING ON ALL ORDERS
        </p>
        <Sparkles className="h-3 w-3 text-accent" />
      </div>

      <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <Crown className="h-7 w-7 text-accent" strokeWidth={1.5} />
            <span className="font-serif text-2xl tracking-luxury text-foreground">
              ZALORA
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-sans text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link to="/profile" className="group">
              <User className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" strokeWidth={1.5} />
            </Link>
            <Link to="/catalog" className="group relative">
              <ShoppingBag className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" strokeWidth={1.5} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center border-2 border-background font-sans text-[9px] font-semibold text-primary-foreground gold-gradient">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <Crown className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <span className="font-serif text-2xl tracking-luxury">ZALORA</span>
            </div>
            <button onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-8 pt-20">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl font-light tracking-luxury text-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-8 font-sans text-xs tracking-luxury text-muted-foreground"
            >
              SIGN IN
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
