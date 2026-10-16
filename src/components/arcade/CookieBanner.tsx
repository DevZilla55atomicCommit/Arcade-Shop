"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
  className?: string;
}

export function CookieBanner({ onAccept, onDecline, className }: CookieBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("arcade-cookies");
    if (!accepted) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("arcade-cookies", "accepted");
    setShow(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("arcade-cookies", "declined");
    setShow(false);
    onDecline();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            "fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-96 z-50",
            className
          )}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          role="dialog"
          aria-label="Cookie preferences"
        >
          <div className="bg-arcade-bg-card rounded-arcade-lg card-glow border border-arcade-accent-pink/30 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-pixel bg-arcade-accent-pink/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-arcade-accent-pink" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V17H11V7ZM11 9V15H13V9H11Z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-heading-sm text-arcade-fg-primary mb-1">COOKIE NOTICE</h3>
                <p className="text-body-sm text-arcade-fg-muted">
                  We use cookies to enhance your experience, analyze traffic, and personalize content.
                  By clicking "ACCEPT", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button variant="neon" size="sm" onClick={handleAccept} className="w-full sm:w-auto flex-1">
                ACCEPT ALL
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDecline} className="w-full sm:w-auto flex-1">
                DECLINE
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShow(false)} className="w-full sm:w-auto flex-1">
                CUSTOMIZE
              </Button>
            </div>
            <p className="font-mono text-[10px] text-arcade-fg-muted/50 mt-3 text-center">
              <a href="/privacy" className="text-arcade-accent-pink hover:underline">Privacy Policy</a> |{" "}
              <a href="/cookies" className="text-arcade-accent-pink hover:underline">Cookie Settings</a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";