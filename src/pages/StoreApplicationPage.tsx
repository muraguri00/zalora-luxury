import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import LuxuryHeader from "@/components/LuxuryHeader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const StoreApplicationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to apply");
      navigate('/auth');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase
      .from('store_applications')
      .insert({
        user_id: user.id,
        business_name: formData.businessName,
        business_email: formData.businessEmail,
        business_phone: formData.businessPhone,
        business_address: formData.businessAddress,
        status: 'pending',
      });

    setIsLoading(false);

    if (error) {
      toast.error("Failed to submit application");
    } else {
      toast.success("Application submitted successfully!");
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <LuxuryHeader title="Application Submitted" subtitle="PARTNER PROGRAM" backTo="/profile" backLabel="PROFILE" />
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-accent" />
            <h1 className="mt-6 font-display text-3xl font-light text-foreground">
              Application Submitted
            </h1>
            <p className="mt-3 max-w-md font-sans text-sm text-muted-foreground">
              Your store application is under review. Our team will verify your information
              and get back to you within 2-3 business days.
            </p>
            <Button variant="gold" className="mt-8" onClick={() => navigate("/profile")}>
              Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LuxuryHeader title="Store Application" subtitle="PARTNER PROGRAM" backTo="/profile" backLabel="PROFILE" />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <Shield className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-light text-foreground">Become a Store Partner</h2>
          <p className="mt-2 font-sans text-xs tracking-luxury text-muted-foreground">
            JOIN OUR EXCLUSIVE MARKETPLACE
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
              BUSINESS NAME
            </label>
            <Input
              className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                BUSINESS EMAIL
              </label>
              <Input
                type="email"
                className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                placeholder="business@email.com"
                value={formData.businessEmail}
                onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                BUSINESS PHONE
              </label>
              <Input
                type="tel"
                className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                placeholder="+1 (555) 000-0000"
                value={formData.businessPhone}
                onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
              BUSINESS ADDRESS
            </label>
            <Input
              className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
              placeholder="Street, City, State, ZIP"
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              required
            />
          </div>

          <div className="border-l-4 border-accent bg-gradient-to-r from-accent/10 to-transparent p-8">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <h4 className="font-display text-lg font-medium text-foreground">Terms & Conditions</h4>
                <p className="mt-2 font-sans text-sm leading-relaxed tracking-wide-luxury text-muted-foreground">
                  By submitting this application, I confirm that all information provided is accurate
                  and I agree to the Zalora Partner Program terms and conditions.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 border-2 border-accent px-8 py-5 font-sans text-xs font-bold tracking-luxury text-primary transition-all duration-500 hover:shadow-gold gold-gradient disabled:opacity-50"
          >
            <Crown className="h-4 w-4" />
            {isLoading ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreApplicationPage;
