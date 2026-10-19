"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useGamesData } from "@/lib/games-data";
import { formatPrice } from "@/lib/utils";

type Step = "shipping" | "payment" | "review" | "done";

export default function CheckoutPage() {
  const { state, clearCart, totalItems } = useCart();
  const { games } = useGamesData();
  const [step, setStep] = useState<Step>("shipping");

  const items = state.items;
  const lookup = games.reduce((acc, g) => {
    acc[g.id] = g;
    return acc;
  }, {} as Record<string, any>);

  const gamesInCart = items
    .map((item) => lookup[item.gameId])
    .filter(Boolean) as any[];

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;

  if (totalItems === 0) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">YOUR CART</h1>
        <p className="text-body-md text-arcade-fg-muted mb-6">Your cart is empty.</p>
        <Link href="/shop" className="font-mono text-sm uppercase tracking-wider text-arcade-accent-pink hover:underline">
          Browse games
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 font-mono text-sm text-arcade-fg-muted">
        <Link href="/" className="hover:text-arcade-accent-pink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-arcade-accent-pink">Cart</Link>
        <span className="mx-2">/</span>
        <span className="text-arcade-fg-primary">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-arcade-bg-card rounded-arcade-lg card-glow border border-arcade-fg-muted/20 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-wider text-arcade-accent-pink">
              <span className="text-arcade-fg-primary">{step.toUpperCase()}</span>
              <span className="text-arcade-fg-muted">/</span>
              <span>Checkout</span>
            </div>

            {step === "shipping" && (
              <form onSubmit={(e) => { e.preventDefault(); setStep("payment"); }} className="space-y-4">
                <h2 className="font-display text-heading-md text-arcade-fg-primary mb-4">SHIPPING DETAILS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name" id="name" />
                  <Field label="Email" id="email" type="email" />
                  <Field label="Address" id="address" className="sm:col-span-2" />
                  <Field label="City" id="city" />
                  <Field label="ZIP" id="zip" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all">
                    Continue
                  </button>
                  <Link href="/cart" className="py-3 px-6 font-mono text-sm uppercase tracking-wider bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary rounded-arcade hover:border-arcade-accent-pink transition-all">
                    Back
                  </Link>
                </div>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={(e) => { e.preventDefault(); setStep("review"); }} className="space-y-4">
                <h2 className="font-display text-heading-md text-arcade-fg-primary mb-4">PAYMENT</h2>
                <div className="space-y-4">
                  <Field label="Card number" id="card" placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry" id="expiry" placeholder="MM/YY" />
                    <Field label="CVC" id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all">
                    Review order
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="py-3 px-6 font-mono text-sm uppercase tracking-wider bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary rounded-arcade hover:border-arcade-accent-pink transition-all"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {step === "review" && (
              <div className="space-y-4">
                <h2 className="font-display text-heading-md text-arcade-fg-primary mb-4">ORDER REVIEW</h2>
                <div className="bg-arcade-bg-elevated rounded-arcade p-4 space-y-2 text-sm">
                  <div className="flex justify-between font-mono text-xs text-arcade-fg-muted uppercase">
                    <span>Shipping to</span>
                    <span>94303, California</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs text-arcade-fg-muted uppercase">
                    <span>Payment</span>
                    <span>•••• 4242</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("payment")}
                    className="py-3 px-6 font-mono text-sm uppercase tracking-wider bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary rounded-arcade hover:border-arcade-accent-pink transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep("done")}
                    className="flex-1 py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-green text-arcade-bg-deep rounded-arcade hover:neon-glow-green transition-all"
                  >
                    Place order
                  </button>
                </div>
              </div>
            )}

            {step === "done" && (
              <div className="text-center py-10">
                <div className="mx-auto w-16 h-16 rounded-full bg-arcade-accent-green/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-arcade-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-3">PURCHASE COMPLETE</h2>
                <p className="text-body-md text-arcade-fg-muted max-w-sm mx-auto">
                  Thanks for your order! Your download codes are on their way to <span className="text-arcade-accent-pink">your inbox</span>.
                </p>
                <button
                  onClick={clearCart}
                  className="mt-8 px-8 py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="bg-arcade-bg-card rounded-arcade-lg p-6 h-fit">
          <h3 className="font-display text-heading-md text-arcade-fg-primary mb-6">ORDER SUMMARY</h3>
          <div className="space-y-3 text-sm">
            {gamesInCart.map((game) => (
              <div key={game.id} className="flex gap-3">
                <div className="w-12 h-14 flex-shrink-0 rounded-arcade overflow-hidden bg-arcade-bg-elevated">
                  <Image src={game.thumbnail} alt={game.title} fill width={48} height={56} />
                </div>
                <div className="flex-1">
                  <p className="font-display text-xs text-arcade-fg-primary leading-tight">{game.title}</p>
                  <p className="font-mono text-xs text-arcade-fg-muted mt-1">×{items.find((i) => i.gameId === game.id)?.quantity}</p>
                </div>
                <p className="font-mono text-xs text-arcade-fg-muted">{formatPrice(game.price * (items.find((i) => i.gameId === game.id)?.quantity ?? 1))}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm mt-4">
            <div className="flex justify-between text-arcade-fg-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-arcade-fg-muted">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-arcade-fg-muted">
              <span>Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-display text-heading-md text-arcade-fg-primary pt-3 border-t border-arcade-fg-muted/10">
              <span>Total</span>
              <span>{formatPrice(subtotal + shipping + tax)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, id, type = "text", className = "", placeholder }: { label: string; id: string; type?: string; className?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-2">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink placeholder:text-arcade-fg-muted/40"
      />
    </div>
  );
}
