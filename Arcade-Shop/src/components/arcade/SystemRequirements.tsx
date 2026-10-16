"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SystemRequirementsProps {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  className?: string;
}

const REQUIREMENTS = [
  { key: "os", label: "OS" },
  { key: "processor", label: "PROCESSOR" },
  { key: "memory", label: "MEMORY" },
  { key: "graphics", label: "GRAPHICS" },
  { key: "storage", label: "STORAGE" },
] as const;

export function SystemRequirements({ minimum, recommended, className }: SystemRequirementsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="font-display text-heading-md text-arcade-accent-green mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-pixel bg-arcade-accent-green/20 flex items-center justify-center text-arcade-accent-green font-mono text-xs">MIN</span>
          MINIMUM REQUIREMENTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-arcade-bg-card rounded-arcade p-4 card-glow">
          {REQUIREMENTS.map((req) => (
            <motion.div
              key={req.key}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: REQUIREMENTS.indexOf(req) * 0.05 }}
            >
              <span className="font-mono text-xs uppercase tracking-wider text-arcade-fg-muted">{req.label}</span>
              <span className="font-mono text-sm text-arcade-fg-primary">{minimum[req.key as keyof typeof minimum]}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-heading-md text-arcade-accent-blue mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-pixel bg-arcade-accent-blue/20 flex items-center justify-center text-arcade-accent-blue font-mono text-xs">REC</span>
          RECOMMENDED REQUIREMENTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-arcade-bg-card rounded-arcade p-4 card-glow">
          {REQUIREMENTS.map((req) => (
            <motion.div
              key={req.key}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: REQUIREMENTS.indexOf(req) * 0.05 }}
            >
              <span className="font-mono text-xs uppercase tracking-wider text-arcade-fg-muted">{req.label}</span>
              <span className="font-mono text-sm text-arcade-fg-primary">{recommended[req.key as keyof typeof recommended]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}