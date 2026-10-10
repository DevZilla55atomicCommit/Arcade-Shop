"use client";

import { useState, useEffect, useCallback } from "react";
import type { Game, GameCategory, Platform } from "@/types";

// Hydrate the full game catalog from static content at module load, then
// expose a typed, filterable store for the UI. This keeps pages server-free
// while matching the client-side GameContext API the components expect.
const RAW = typeof window !== "undefined" ? window.__arcadeGames ?? null : null;

export function loadGamesData(): { games: Game[]; categories: GameCategory[] } {
  if (RAW) {
    return { games: RAW.games as Game[], categories: RAW.categories as GameCategory[] };
  }
  // Fallback: return an empty-but-typed shape so components never crash on the
  // server prerender. The client hydrates on mount.
  return { games: [], categories: [] };
}

export function useGamesData() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const data = loadGamesData();
    setGames(data.games);
    setCategories(data.categories);
    setReady(true);
  }, []);

  const getGamesByCategory = useCallback(
    (category: string) => games.filter((g) => g.category === category),
    [games]
  );
  const getGameBySlug = useCallback(
    (slug: string) => games.find((g) => g.slug === slug),
    [games]
  );

  // Bridge for server-side hydration: a parent can pre-seed the store.
  if (ready && !games.length && typeof window !== "undefined") {
    const data = loadGamesData();
    if (data.games.length) {
      setGames(data.games);
      setCategories(data.categories);
    }
  }

  return { games, categories, ready, getGamesByCategory, getGameBySlug };
}

// Helpers used across pages.
export function getFeaturedGames(games: Game[]) {
  return games.slice(0, 4);
}

export function getNewReleases(games: Game[]) {
  return [...games].sort((a, b) =>
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 8);
}

export function getTopRated(games: Game[]) {
  return [...games].sort((a, b) => b.rating - a.rating).slice(0, 8);
}

export function getOnSale(games: Game[]) {
  return games.filter((g) => g.discount && g.discount > 0).slice(0, 8);
}

export function searchGames(games: Game[], query: string) {
  if (!query.trim()) return games;
  const q = query.toLowerCase();
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q))
  );
}
