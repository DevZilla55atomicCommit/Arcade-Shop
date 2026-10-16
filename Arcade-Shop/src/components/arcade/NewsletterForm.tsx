"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
  variant?: "default" | "inline" | "footer";
}

export function NewsletterForm({ onSubmit, className, variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setStatus("submitting");
    try {
      await onSubmit(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const variants = {
    default: "max-w-md mx-auto",
    inline: "flex flex-col sm:flex-row gap-3",
    footer: "flex flex-col gap-3",
  };

  if (status === "success") {
    return (
      <motion.div
        className={cn("text-center p-8 bg-arcade-bg-card rounded-arcade-lg card-glow border border-arcade-accent-green/30", className)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-arcade-accent-green/20 flex items-center justify-center"
          animate={{ scale: [0, 1.2, 1] }}
        >
          <svg className="w-8 h-8 text-arcade-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="font-display text-heading-md text-arcade-fg-primary mb-2">YOU&#39;RE IN!</h3>
        <p className="text-body-md text-arcade-fg-muted">Thanks for subscribing. Get ready for exclusive deals and updates.</p>
        <Button variant="ghost" size="sm" onClick={() => setStatus("idle")} className="mt-4">
          SUBSCRIBE ANOTHER EMAIL
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn(variants[variant], className)} noValidate>
      <div className={variant === "inline" ? "flex-1" : "w-full"}>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <Input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER YOUR EMAIL"
          error={status === "error" ? error : undefined}
          className={cn("font-mono text-sm uppercase tracking-wider", variant === "inline" && "flex-1")}
          disabled={status === "submitting"}
        />
      </div>
      <Button variant="neon" size="md" type="submit" disabled={status === "submitting"} className={variant === "inline" ? "whitespace-nowrap" : "w-full sm:w-auto"}>
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            SUBSCRIBING...
          </>
        ) : (
          "SUBSCRIBE"
        )}
      </Button>
      <p className="font-mono text-[10px] text-arcade-fg-muted/50 text-center sm:text-left">
        No spam. Unsubscribe anytime. <a href="/privacy" className="text-arcade-accent-pink hover:underline">Privacy Policy</a>
      </p>
    </form>
  );
}

import { useState } from "react";