import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle, Shield, FileCheck, Crown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import LuxuryHeader from "@/components/LuxuryHeader";

const STEPS = [
  { label: "IDENTITY", fields: ["selfie", "frontId", "backId", "ssnId"] },
  { label: "PERSONAL", fields: ["dob", "address", "occupation", "salary", "car"] },
  { label: "FINAL", fields: ["proof", "terms"] },
];

const StoreApplicationPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<Record<string, string>>({});

  const handleFileChange = (key: string, fileName: string) => {
    setFiles((prev) => ({ ...prev, [key]: fileName }));
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
              Your KYC application is under review. Our team will verify your documents
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
        {/* Title */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <Shield className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-light text-foreground">KYC Verification</h2>
          <p className="mt-2 font-sans text-xs tracking-luxury text-muted-foreground">
            SECURE · ENCRYPTED · CONFIDENTIAL
          </p>
        </div>

        {/* Progress bar card */}
        <div className="mb-10 border border-accent/30 bg-card p-8 shadow-gold-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-sans text-[10px] font-semibold tracking-luxury text-accent">
              STEP {step + 1} OF 3
            </span>
            <span className="font-sans text-[10px] tracking-luxury text-muted-foreground">
              {Math.round(((step + 1) / 3) * 100)}% COMPLETE
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full border border-accent/20 bg-secondary">
            <div
              className="h-full transition-all duration-500 gold-gradient"
              style={{
                width: `${((step + 1) / 3) * 100}%`,
                boxShadow: "0 0 10px hsl(var(--gold) / 0.5)",
              }}
            />
          </div>

          {/* Step labels */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {STEPS.map((s, i) => (
              <div
                key={s.label}
                className={`border p-3 text-center transition-all duration-300 ${
                  i <= step
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border text-muted-foreground"
                }`}
              >
                <span className="font-sans text-[11px] font-semibold tracking-[0.15em]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) {
              setStep(step + 1);
            } else {
              setSubmitted(true);
            }
          }}
          className="space-y-8"
        >
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FileUploadField label="Selfie Photo" fileKey="selfie" files={files} onChange={handleFileChange} />
                <FileUploadField label="Front of ID" fileKey="frontId" files={files} onChange={handleFileChange} />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FileUploadField label="Back of ID" fileKey="backId" files={files} onChange={handleFileChange} />
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                    SSN / ID NUMBER
                  </label>
                  <Input
                    className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                    DATE OF BIRTH
                  </label>
                  <Input
                    type="date"
                    className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                    OCCUPATION
                  </label>
                  <Input
                    className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                    placeholder="Your occupation"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                  FULL ADDRESS
                </label>
                <Input
                  className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                  placeholder="Street, City, State, ZIP"
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                    MONTHLY SALARY (USD)
                  </label>
                  <Input
                    type="number"
                    className="border-2 border-border bg-secondary/50 px-6 py-4 font-sans tracking-wide transition-colors focus:border-accent"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
                    CAR OWNERSHIP
                  </label>
                  <div className="flex gap-4 pt-3">
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 font-sans text-sm tracking-wide text-foreground transition-colors hover:text-accent cursor-pointer">
                        <input type="radio" name="car" value={opt} className="accent-[hsl(var(--gold))]" style={{ width: 20, height: 20 }} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <FileUploadField label="Proof of Occupation (Optional)" fileKey="proof" files={files} onChange={handleFileChange} />

              {/* Terms */}
              <div className="border-l-4 border-accent bg-gradient-to-r from-accent/10 to-transparent p-8">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-display text-lg font-medium text-foreground">Terms & Conditions</h4>
                    <p className="mt-2 font-sans text-sm leading-relaxed tracking-wide-luxury text-muted-foreground">
                      By submitting this application, I confirm that all information provided is accurate
                      and I agree to the Zalora Partner Program terms and conditions.
                    </p>
                    <label className="mt-4 flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" required className="accent-[hsl(var(--gold))]" style={{ width: 20, height: 20 }} />
                      <span className="font-sans text-sm text-foreground">I agree to the terms</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 pt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex flex-1 items-center justify-center gap-2 border-2 border-border px-8 py-5 font-sans text-xs font-semibold tracking-luxury text-foreground transition-all hover:border-accent"
              >
                <ChevronLeft className="h-4 w-4" />
                PREVIOUS
              </button>
            )}
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 border-2 border-accent px-8 py-5 font-sans text-xs font-bold tracking-luxury text-primary transition-all duration-500 hover:shadow-gold gold-gradient"
            >
              {step < 2 ? (
                <>
                  NEXT STEP
                  <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  <Crown className="h-4 w-4" />
                  SUBMIT APPLICATION
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface FileUploadFieldProps {
  label: string;
  fileKey: string;
  files: Record<string, string>;
  onChange: (key: string, name: string) => void;
}

const FileUploadField = ({ label, fileKey, files, onChange }: FileUploadFieldProps) => {
  const hasFile = files[fileKey];

  return (
    <div>
      <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
        {label.toUpperCase()}
      </label>
      <label className={`flex h-32 cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-all duration-300 ${
        hasFile
          ? "border-accent bg-accent/5"
          : "border-accent/40 bg-gradient-to-b from-accent/5 to-transparent hover:border-accent hover:bg-accent/10"
      }`}>
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(fileKey, file.name);
          }}
        />
        {hasFile ? (
          <div className="flex flex-col items-center gap-2 text-accent">
            <FileCheck className="h-8 w-8" />
            <span className="font-sans text-xs font-medium tracking-wide">{files[fileKey]}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-accent/60">
            <Upload className="h-8 w-8" strokeWidth={1.5} />
            <span className="font-sans text-xs tracking-wide">Click to upload</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default StoreApplicationPage;
