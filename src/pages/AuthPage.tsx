import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/catalog");
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
            <Input type="email" className="border-border bg-background font-body" placeholder="your@email.com" />
          </div>
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
              Password
            </label>
            <Input type="password" className="border-border bg-background font-body" placeholder="••••••••" />
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
      </div>
    </div>
  );
};

export default AuthPage;
