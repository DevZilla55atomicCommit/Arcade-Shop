"use client";

import { useGamesData } from "@/lib/games-data";
import { GameGrid } from "@/components/arcade/GameGrid";

export default function TopRated() {
  const { games, ready } = useGamesData();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="font-mono text-arcade-fg-muted">LOADING...</div>
      </div>
    );
  }

  const rated = [...games].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">TOP RATED</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-xl mx-auto">
          The highest-rated titles the community has crowned.
        </p>
      </div>
      <GameGrid games={rated} columns={4} />
    </div>
  );
}
