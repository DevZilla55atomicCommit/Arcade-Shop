"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShareButtonProps {
  url?: string;
  title?: string;
  className?: string;
}

export function ShareButton({ url = typeof window !== "undefined" ? window.location.href : "", title = document.title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const shareData = { title, url };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank", "width=550,height=420");
  };

  const handleDiscord = () => {
    window.open(`https://discord.com/share?url=${encodeURIComponent(url)}`, "_blank", "width=550,height=420");
  };

  const handleReddit = () => {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, "_blank", "width=640,height=480");
  };

  const shares = [
    { label: "TWITTER", icon: "twitter", onClick: handleTwitter, color: "#1DA1F2" },
    { label: "DISCORD", icon: "discord", onClick: handleDiscord, color: "#5865F2" },
    { label: "REDDIT", icon: "reddit", onClick: handleReddit, color: "#FF4500" },
    { label: "COPY LINK", icon: "link", onClick: handleCopy, color: "#ff006e" },
  ];

  return (
    <div className={cn("relative inline-block", className)}>
      <Button variant="ghost" size="sm" onClick={() => setShowShare(!showShare)} aria-expanded={showShare} aria-haspopup="true">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="ml-1 font-mono text-xs uppercase">SHARE</span>
      </Button>

      <AnimatePresence>
        {showShare && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-40 bg-arcade-bg-card border-2 border-arcade-accent-pink/30 rounded-arcade overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="menu"
          >
            <div className="p-2">
              <button
                onClick={handleNativeShare}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider rounded-pixel transition-all",
                  "text-arcade-fg-primary hover:bg-arcade-accent-pink/10 hover:text-arcade-accent-pink"
                )}
                role="menuitem"
              >
                <svg className="w-4 h-4 text-arcade-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                NATIVE SHARE
              </button>
            </div>
            <div className="border-t border-arcade-fg-muted/10 p-2 space-y-1">
              {shares.map((share) => (
                <button
                  key={share.label}
                  onClick={share.onClick}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider rounded-pixel transition-all",
                    "text-arcade-fg-primary hover:bg-arcade-accent-pink/10 hover:text-arcade-accent-pink"
                  )}
                  role="menuitem"
                >
                  <span className="w-5 h-5 flex items-center justify-center" style={{ color: share.color }}>
                    {share.icon === "twitter" && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>}
                    {share.icon === "discord" && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.676 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 00.031.055 19.9 19.9 0 005.997 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.007-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.04.107c-.36.688-.772 1.35-1.225 1.993a.076.076 0 00.032.125 19.839 19.839 0 006.01-3.03.077.077 0 00.032-.054C23.852 13.547 23.12 9.12 20.348 4.397a.061.061 0 00-.031-.027zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>}
                    {share.icon === "reddit" && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6a6 6 0 110 12 6 6 0 010-12zm4.5 11a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>}
                    {share.icon === "link" && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>}
                  </span>
                  {share.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {copied && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-arcade-accent-green text-arcade-bg-deep font-mono text-xs uppercase rounded-pixel neon-glow-green"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          COPIED!
        </motion.div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatePresence } from "framer-motion";