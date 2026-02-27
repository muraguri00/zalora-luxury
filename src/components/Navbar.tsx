import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/catalog", label: "Shop" },
    { to: "/catalog?category=Bags", label: "Bags" },
    { to: "/catalog?category=Watches", label: "Watches" },
    { to: "/catalog?category=Accessories", label: "Accessories" },
    { to: "/catalog?category=Shoes", label: "Shoes" },
    { to: "/catalog?category=Fragrance", label: "Fragrance" },
  ];

  if (location.pathname === "/") return null;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="font-display text-2xl font-semibold tracking-luxury">
            ZALORA
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-body text-xs uppercase tracking-luxury text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Search className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
            <Link to="/profile">
              <User className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link to="/catalog" className="relative">
              <ShoppingBag className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-accent font-body text-[10px] text-accent-foreground">
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
            <span className="font-display text-2xl font-semibold tracking-luxury">ZALORA</span>
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
                className="font-display text-2xl font-light tracking-luxury text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-8 font-body text-xs uppercase tracking-luxury text-muted-foreground"
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
