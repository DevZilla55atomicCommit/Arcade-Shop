"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useGamesData } from "@/lib/games-data";
import { GameGrid } from "@/components/arcade/GameGrid";

export default function WishlistPage() {
  const { state, toggleItem, count } = useWishlist();
  const items = state.items;
  const { games, ready } = useGamesData();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="font-mono text-arcade-fg-muted">LOADING...</div>
      </div>
    );
  }

  const wishlisted = items
    .map((id) => games.find((g) => g.id === id))
    .filter(Boolean) as any[];

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">WISHLIST</h1>
        <p className="text-body-md text-arcade-fg-muted">{count} game{count !== 1 ? "s" : ""} saved</p>
      </div>

      {wishlisted.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-body-md text-arcade-fg-muted mb-6">No games saved yet.</p>
          <a href="/shop" className="font-mono text-sm uppercase tracking-wider text-arcade-accent-pink hover:underline">
            Browse the shop
          </a>
        </div>
      ) : (
        <GameGrid games={wishlisted} columns={4} />
      )}
    </div>
  );
}
