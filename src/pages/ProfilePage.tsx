import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Package, Heart, CreditCard, Store } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-cream px-6 py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center bg-primary">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-light text-foreground">
          Alexandra Smith
        </h1>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          alexandra@email.com · Member since 2025
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Package, label: "My Orders", desc: "Track your purchases", to: "#" },
            { icon: Heart, label: "Wishlist", desc: "Your saved items", to: "#" },
            { icon: CreditCard, label: "Payment", desc: "Manage payment methods", to: "#" },
            { icon: User, label: "Account", desc: "Edit personal details", to: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group flex items-center gap-4 border border-border p-6 transition-all hover:border-accent hover:luxury-shadow"
            >
              <item.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
              <div>
                <h3 className="font-body text-sm font-medium text-foreground">{item.label}</h3>
                <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Become a dropshipper */}
        <div className="mt-16 border border-border p-10 text-center">
          <Store className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-4 font-display text-2xl font-light text-foreground">
            Become a Zalora Partner
          </h2>
          <p className="mx-auto mt-2 max-w-md font-body text-sm text-muted-foreground">
            Apply to open your own store and earn 20% commission on every sale. 
            Start your luxury dropshipping business today.
          </p>
          <Button variant="gold" size="lg" className="mt-6" asChild>
            <Link to="/apply">Apply for a Store</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
