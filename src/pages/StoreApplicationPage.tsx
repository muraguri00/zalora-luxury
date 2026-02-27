import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle } from "lucide-react";

const StoreApplicationPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-accent" />
          <h1 className="mt-6 font-display text-3xl font-light text-foreground">
            Application Submitted
          </h1>
          <p className="mt-3 max-w-md font-body text-sm text-muted-foreground">
            Your KYC application is under review. Our team will verify your documents 
            and get back to you within 2-3 business days.
          </p>
          <Button variant="default" className="mt-8" onClick={() => navigate("/profile")}>
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-cream px-6 py-16 text-center">
        <p className="font-body text-xs uppercase tracking-luxury text-muted-foreground">
          Partner Application
        </p>
        <h1 className="mt-3 font-display text-4xl font-light text-foreground">
          Store KYC Verification
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-accent" />
        <p className="mx-auto mt-4 max-w-lg font-body text-sm text-muted-foreground">
          Complete the verification process to open your Zalora partner store.
          All information is encrypted and securely stored.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-8"
        >
          {/* Identity Verification */}
          <section>
            <h2 className="font-display text-xl font-medium text-foreground">Identity Verification</h2>
            <div className="mt-1 h-px w-full bg-border" />
            <div className="mt-6 grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FileUploadField label="Selfie Photo" />
                <FileUploadField label="Front of ID" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FileUploadField label="Back of ID" />
                <div>
                  <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                    SSN / ID Number
                  </label>
                  <Input className="border-border bg-background font-body" placeholder="Enter ID number" />
                </div>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section>
            <h2 className="font-display text-xl font-medium text-foreground">Personal Information</h2>
            <div className="mt-1 h-px w-full bg-border" />
            <div className="mt-6 grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                    Date of Birth
                  </label>
                  <Input type="date" className="border-border bg-background font-body" />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                    Occupation
                  </label>
                  <Input className="border-border bg-background font-body" placeholder="Your occupation" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                  Full Address
                </label>
                <Input className="border-border bg-background font-body" placeholder="Street, City, State, ZIP" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                    Monthly Salary (USD)
                  </label>
                  <Input type="number" className="border-border bg-background font-body" placeholder="5000" />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
                    Car Ownership
                  </label>
                  <select className="flex h-10 w-full border border-border bg-background px-3 py-2 font-body text-sm focus:outline-none">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
              <FileUploadField label="Proof of Occupation (Optional)" />
            </div>
          </section>

          <Button variant="gold" size="lg" className="w-full" type="submit">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
};

const FileUploadField = ({ label }: { label: string }) => (
  <div>
    <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
      {label}
    </label>
    <div className="flex h-28 cursor-pointer items-center justify-center border border-dashed border-border bg-secondary transition-colors hover:border-accent">
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <Upload className="h-5 w-5" />
        <span className="font-body text-xs">Click to upload</span>
      </div>
    </div>
  </div>
);

export default StoreApplicationPage;
