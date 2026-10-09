"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "neon" | "blue" | "green" | "pixel" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "neon",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider transition-all duration-300 pixel-border overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-bg-deep";

    const variantStyles = {
      neon:
        "bg-transparent text-arcade-accent-pink border-arcade-accent-pink hover:bg-arcade-accent-pink hover:text-arcade-bg-deep hover:neon-glow-pink active:scale-[0.98] active:animate-pixel-bounce disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-arcade-accent-pink",
      blue:
        "bg-transparent text-arcade-accent-blue border-arcade-accent-blue hover:bg-arcade-accent-blue hover:text-arcade-bg-deep hover:neon-glow-blue active:scale-[0.98] active:animate-pixel-bounce disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-arcade-accent-blue",
      green:
        "bg-transparent text-arcade-accent-green border-arcade-accent-green hover:bg-arcade-accent-green hover:text-arcade-bg-deep hover:neon-glow-green active:scale-[0.98] active:animate-pixel-bounce disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-arcade-accent-green",
      pixel:
        "bg-arcade-bg-card text-arcade-fg-primary border-arcade-fg-muted hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink active:scale-[0.98] active:animate-pixel-bounce disabled:opacity-50 disabled:cursor-not-allowed",
      ghost:
        "bg-transparent text-arcade-fg-muted border-transparent hover:text-arcade-accent-pink hover:animate-neon-flicker active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
      xl: "px-10 py-5 text-lg",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-500 hover:translate-x-[100%]" aria-hidden="true" />
      </button>
    );
  }
);

Button.displayName = "Button";

export const ArcadeButton = ({
  children,
  color = "pink",
  size = "md",
  className,
  ...props
}: {
  children: React.ReactNode;
  color?: "pink" | "blue" | "green" | "yellow" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<ButtonProps, "variant">) => {
  const colorMap = {
    pink: "neon",
    blue: "blue",
    green: "green",
    yellow: "neon",
    purple: "neon",
  } as const;

  return (
    <Button variant={colorMap[color]} size={size} className={cn(className)}>
      {children}
    </Button>
  );
};

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps & { "aria-label": string }>(
  ({ className, variant = "ghost", size = "md", "aria-label": ariaLabel, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("p-0 aspect-square", className)}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";