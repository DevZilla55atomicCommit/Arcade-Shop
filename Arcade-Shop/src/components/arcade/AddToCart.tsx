"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface AddToCartProps {
  gameId: string;
  title: string;
  price: number;
  inCart?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "compact" | "icon";
}

export function AddToCart({
  gameId,
  title,
  price,
  inCart = false,
  disabled = false,
  className,
  variant = "default",
}: AddToCartProps) {
  const { addItem, state } = useCart();
  const isInCart = inCart || state.items.some((item) => item.gameId === gameId);
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async () => {
    if (disabled || isInCart) return;
    setIsAdding(true);
    addItem({ gameId, quantity: 1, price });
    await new Promise((r) => setTimeout(r, 300));
    setIsAdding(false);
  };

  const variants = {
    default: "px-6 py-3 text-sm",
    compact: "px-4 py-2 text-xs",
    icon: "p-2 aspect-square",
  };

  if (variant === "icon") {
    return (
      <Button
        variant={isInCart ? "green" : "neon"}
        size="sm"
        onClick={handleClick}
        disabled={disabled || isAdding || isInCart}
        className={cn("relative", className)}
        aria-label={isInCart ? `Remove ${title} from cart` : `Add ${title} to cart`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {isInCart ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          )}
        </svg>
        {isAdding && <span className="sr-only">Adding to cart...</span>}
      </Button>
    );
  }

  return (
    <Button
      variant={isInCart ? "green" : "neon"}
      size={variant === "compact" ? "sm" : "md"}
      onClick={handleClick}
      disabled={disabled || isAdding || isInCart}
      className={cn(variants[variant], className)}
    >
      {isAdding ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          ADDING...
        </>
      ) : isInCart ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          IN CART
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          ADD TO CART
        </>
      )}
    </Button>
  );
}

export function BuyNow({ gameId, title, price, className }: { gameId: string; title: string; price: number; className?: string }) {
  const { addItem, openCart } = useCart();

  const handleClick = () => {
    addItem({ gameId, quantity: 1, price });
    openCart();
  };

  return (
    <Button variant="blue" size="md" onClick={handleClick} className={cn("w-full", className)}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      BUY NOW
    </Button>
  );
}

import { useState } from "react";
import { useCart } from "@/context/CartContext";