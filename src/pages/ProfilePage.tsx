import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Mail, ShoppingBag, Crown, Sparkles } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Title section */}
      <div className="bg-secondary px-6 py-16 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-accent" />
          <User className="h-6 w-6 text-accent" strokeWidth={1.5} />
          <div className="h-px w-12 bg-accent" />
        </div>
        <h2 className="mt-4 font-display text-4xl font-light text-foreground">Your Profile</h2>
        <p className="mt-2 font-sans text-xs tracking-luxury text-muted-foreground">
          EXCLUSIVE MEMBER AREA
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-10">
        {/* Account Info Card */}
        <div className="relative border-2 border-accent/30 bg-card p-12 shadow-gold-lg overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 h-32 w-32 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl from-accent/5 to-transparent" />

          <div className="relative">
            <div className="mb-8 flex items-center gap-3 border-b-2 border-accent/20 pb-4">
              <div className="h-px w-12 bg-accent" />
              <h3 className="font-display text-2xl font-light text-foreground">Account Information</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-xs tracking-wide text-muted-foreground">FULL NAME</p>
                  <p className="font-sans text-sm text-foreground">Alexandra Smith</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-xs tracking-wide text-muted-foreground">EMAIL</p>
                  <p className="font-sans text-sm text-foreground">alexandra@email.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Overview Card */}
        <div className="relative border-2 border-accent bg-gradient-to-br from-charcoal to-primary p-12 shadow-gold-lg overflow-hidden">
          {/* Glowing orbs */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative flex items-center gap-8">
            <div className="border border-accent/30 bg-accent/10 p-4">
              <ShoppingBag className="h-8 w-8 text-accent" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-sans text-xs tracking-wide text-primary-foreground/60">YOUR BAG</p>
              <p className="mt-1 font-display text-4xl font-light text-primary-foreground">0 <span className="text-lg">items</span></p>
            </div>
            <Button className="border-2 border-accent font-sans text-xs font-semibold tracking-[0.15em] text-primary gold-gradient hover:shadow-gold">
              VIEW CART
            </Button>
          </div>
        </div>

        {/* Store Application CTA */}
        <div className="bg-gradient-to-b from-accent/10 to-transparent p-2 md:p-4">
          <div className="relative border-4 border-accent bg-card p-16 text-center shadow-gold-xl overflow-hidden">
            <div className="relative">
              {/* Crown with sparkle */}
              <div className="relative mx-auto w-fit">
                <Crown className="h-[72px] w-[72px] text-accent" strokeWidth={1} />
                <Sparkles className="absolute -right-2 -top-2 h-6 w-6 animate-pulse text-accent" />
              </div>

              <h2 className="mt-8 font-display text-4xl font-light text-foreground md:text-5xl">
                Become a Store Owner
              </h2>

              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-accent" />
                <Sparkles className="h-4 w-4 text-accent" />
                <div className="h-px w-16 bg-accent" />
              </div>

              <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed tracking-wide text-muted-foreground">
                Apply to open your own store and earn 20% commission on every sale.
                Start your luxury dropshipping business today.
              </p>

              <Link
                to="/apply"
                className="mt-10 inline-block border-2 border-accent px-16 py-6 font-sans text-xs font-bold tracking-luxury text-primary transition-all duration-500 hover:shadow-gold gold-gradient"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)), hsl(var(--gold-dark)))",
                  backgroundSize: "200% 100%",
                }}
              >
                APPLY FOR A STORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
