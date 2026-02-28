import { Crown, Sparkles, X } from "lucide-react";

interface EmailPromptModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
}

const EmailPromptModal = ({ open, onClose, email, setEmail, onSubmit }: EmailPromptModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg border-2 border-accent/30 bg-background p-12 shadow-gold-lg md:p-16">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-muted-foreground transition-colors hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <Crown className="h-12 w-12 text-accent" strokeWidth={1.5} />

          <h2 className="mt-6 font-display text-5xl font-light tracking-wide text-foreground">
            Welcome
          </h2>

          {/* Dividers with sparkle */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <div className="h-px w-12 bg-accent" />
          </div>

          <p className="mt-6 font-sans text-sm leading-relaxed tracking-wide-luxury text-muted-foreground">
            Enter your email to join our exclusive circle and unlock your shopping experience.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="mt-8 w-full border-2 border-border bg-secondary/50 px-6 py-4 font-sans text-sm tracking-wide-luxury text-foreground transition-colors focus:border-accent focus:outline-none"
          />

          <button
            onClick={onSubmit}
            className="mt-6 w-full border-2 border-accent px-8 py-4 font-sans text-xs font-semibold tracking-luxury transition-all duration-500 hover:shadow-gold gold-gradient text-primary"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPromptModal;
