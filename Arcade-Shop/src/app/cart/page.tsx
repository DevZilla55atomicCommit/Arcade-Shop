"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useGamesData } from "@/lib/games-data";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalItems, subtotal, clearCart } = useCart();
  const items = state.items;
  const { games } = useGamesData();

  if (!totalItems) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">YOUR CART</h1>
        <p className="text-body-md text-arcade-fg-muted mb-6">Your cart is empty.</p>
        <a href="/shop" className="font-mono text-sm uppercase tracking-wider text-arcade-accent-pink hover:underline">
          Browse games
        </a>
      </div>
    );
  }

  const lookup = games.reduce((acc, g) => {
    acc[g.id] = g;
    return acc;
  }, {} as Record<string, any>);

  const gamesInCart = items
    .map((item) => lookup[item.gameId])
    .filter(Boolean) as any[];

  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">YOUR CART</h1>
        <p className="text-body-md text-arcade-fg-muted">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {gamesInCart.map((game) => {
            const item = items.find((i) => i.gameId === game.id);
            if (!item) return null;
            return (
              <div key={game.id} className="flex gap-4 bg-arcade-bg-card rounded-arcade p-4">
                <div className="w-24 h-28 flex-shrink-0 rounded-arcade overflow-hidden bg-arcade-bg-elevated">
                  <Image src={game.thumbnail} alt={game.title} fill width={96} height={112} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-heading-sm text-arcade-fg-primary">{game.title}</h3>
                  <p className="font-mono text-xs text-arcade-fg-muted mt-1">
                    {formatPrice(game.price)} &times; {item.quantity}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(game.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-pixel bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary hover:border-arcade-accent-pink"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-mono text-sm w-6 text-center text-arcade-fg-primary">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(game.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-pixel bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary hover:border-arcade-accent-pink"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(game.id)}
                      className="ml-auto font-mono text-xs text-arcade-fg-muted hover:text-arcade-accent-pink"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="bg-arcade-bg-card rounded-arcade-lg p-6 h-fit">
          <h3 className="font-display text-heading-md text-arcade-fg-primary mb-6">ORDER SUMMARY</h3>
          <div className="space-y-3 text-sm">
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
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button className="w-full mt-6 py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all">
            CHECKOUT
          </button>
          <button
            onClick={clearCart}
            className="w-full mt-3 py-2 font-mono text-xs uppercase tracking-wider text-arcade-fg-muted hover:text-arcade-accent-pink transition-colors"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
