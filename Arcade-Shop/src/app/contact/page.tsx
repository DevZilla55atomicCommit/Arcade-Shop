"use client";

import { useState } from "react";
import { NewsletterForm } from "@/components/arcade/NewsletterForm";
import { CookieBanner } from "@/components/arcade/CookieBanner";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 400));
    setStatus("success");
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">CONTACT US</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-xl mx-auto">
          Questions, feedback, or support? We&rsquo;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 space-y-6">
          <div>
            <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">
              NAME
            </label>
            <input
              id="contact-name"
              type="text"
              required
              className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">
              EMAIL
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">
              SUBJECT
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">
              MESSAGE
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all disabled:opacity-50"
          >
            {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
          </button>
          {status === "success" && (
            <p className="text-center font-mono text-sm text-arcade-accent-green">Message sent! We&rsquo;ll be in touch soon.</p>
          )}
        </form>

        <div className="space-y-6">
          <NewsletterForm
            onSubmit={async () => {
              await new Promise((r) => setTimeout(r, 400));
            }}
            className="bg-arcade-bg-card rounded-arcade-lg card-glow border border-arcade-accent-pink/20 p-8 sm:p-12"
          />

          <CookieBanner
            onAccept={() => window.alert("Consent recorded — analytics would initialize here.")}
            onDecline={() => window.alert("Consent declined — analytics remain disabled.")}
          />

          <div className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8">
            <h2 className="font-display text-heading-md text-arcade-fg-primary mb-6">GET IN TOUCH</h2>
            <ul className="space-y-4 text-body-lg text-arcade-fg-muted">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-arcade-accent-pink flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.21 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@arcadevault.gg
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-arcade-accent-pink flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3l2 6h8a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                </svg>
                100 Game Street, Arcade City
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-arcade-accent-pink flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Available 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
