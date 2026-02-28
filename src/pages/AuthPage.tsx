import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const fullNameValue = `${firstName} ${lastName}`.trim();
        const { error } = await signUp(email, password, fullNameValue);

        if (error) {
          toast.error(error.message || "Failed to create account");
        } else {
          toast.success("Account created successfully! Please sign in.");
          setIsSignUp(false);
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
        }
      } else {
        const { error } = await signIn(email, password);

        if (error) {
          toast.error(error.message || "Invalid email or password");
        } else {
          toast.success("Signed in successfully!");
          navigate("/catalog");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
                <Input
                  className="border-border bg-background font-body"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                  Last Name
                </label>
                <Input
                  className="border-border bg-background font-body"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
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
              required
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
              required
              minLength={6}
            />
          </div>

          <Button
            variant="default"
            size="lg"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="mt-8 text-center font-body text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gold underline-offset-4 hover:underline"
            type="button"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
