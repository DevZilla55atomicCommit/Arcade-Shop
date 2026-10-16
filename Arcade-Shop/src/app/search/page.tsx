"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGamesData } from "@/lib/games-data";
import { GameGrid } from "@/components/arcade/GameGrid";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center">...</div>}>
      <InnerSearchPage />
    </Suspense>
  );
}

function InnerSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { games, ready } = useGamesData();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="font-mono text-arcade-fg-muted">LOADING...</div>
      </div>
    );
  }

  const results = query
    ? games.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-2">SEARCH</h1>
        <p className="font-mono text-sm text-arcade-fg-muted">
          {query ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"` : "Search the vault"}
        </p>
      </div>

      {query && results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-body-md text-arcade-fg-muted mb-6">No games match &ldquo;{query}&rdquo;</p>
          <a href="/shop" className="font-mono text-sm uppercase tracking-wider text-arcade-accent-pink hover:underline">
            Browse all games
          </a>
        </div>
      ) : (
        <GameGrid games={results} columns={4} />
      )}
    </div>
  );
}
