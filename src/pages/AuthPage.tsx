import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Crown, User, Store, ShieldCheck } from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    email: "customer@zalora.com",
    password: "password123",
    role: "Customer",
    icon: User,
    description: "Browse and shop products",
    redirectTo: "/catalog",
  },
  {
    email: "store@zalora.com",
    password: "password123",
    role: "Store Owner",
    icon: Store,
    description: "Manage your store and orders",
    redirectTo: "/store",
  },
  {
    email: "admin@zalora.com",
    password: "password123",
    role: "Admin",
    icon: ShieldCheck,
    description: "Access admin dashboard",
    redirectTo: "/admin",
  },
];

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = DEMO_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
    if (account) {
      navigate(account.redirectTo);
    } else {
      navigate("/catalog");
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string, redirectTo: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setTimeout(() => navigate(redirectTo), 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link to="/" className="font-display text-3xl font-semibold tracking-luxury text-foreground">
            ZALORA
          </Link>
          <div className="mx-auto mt-4 h-px w-12 bg-accent" />
          <h2 className="mt-8 font-display text-2xl font-light text-foreground">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            {isSignUp
              ? "Join our exclusive community"
              : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                  First Name
                </label>
                <Input className="border-border bg-background font-body" placeholder="First name" />
              </div>
              <div>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                  Last Name
                </label>
                <Input className="border-border bg-background font-body" placeholder="Last name" />
              </div>
            </div>
          )}
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
              Email Address
            </label>
            <Input
              type="email"
              className="border-border bg-background font-body"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
              Password
            </label>
            <Input
              type="password"
              className="border-border bg-background font-body"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button variant="default" size="lg" className="w-full" type="submit">
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="mt-8 text-center font-body text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gold underline-offset-4 hover:underline"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>

        {!isSignUp && (
          <div className="mt-10 border-t border-accent/20 pt-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <Crown className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <div className="h-px w-8 bg-accent" />
              </div>
              <h3 className="mt-3 font-display text-lg font-light text-foreground">
                Demo Accounts
              </h3>
              <p className="mt-1 font-sans text-xs tracking-wide text-muted-foreground">
                Click to login and explore different roles
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email, account.password, account.redirectTo)}
                  className="group w-full border border-accent/20 p-4 text-left transition-all hover:border-accent hover:shadow-gold-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="border border-accent/30 bg-accent/5 p-3 transition-all group-hover:bg-accent/10">
                      <account.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans text-sm font-medium text-foreground">
                          {account.role}
                        </h4>
                        <span className="font-sans text-xs text-muted-foreground">
                          ({account.email})
                        </span>
                      </div>
                      <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                        {account.description}
                      </p>
                    </div>
                    <div className="font-sans text-xs tracking-wide text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      LOGIN →
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 border border-accent/10 bg-accent/5 p-4">
              <p className="text-center font-sans text-xs leading-relaxed text-muted-foreground">
                All demo accounts use password: <span className="font-medium text-accent">password123</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
