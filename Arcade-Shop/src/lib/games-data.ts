import { useGamesData as useGameCatalog } from "@/context/GameCatalogContext";
import type { Game } from "@/types";

// The live catalog is provided through React context by the server component
// (game-catalog.server.tsx), which reads content/games and
// content/categories at build time. `useGamesData` is re-exported from that
// context so every page import keeps working unchanged.

export { useGamesData } from "@/context/GameCatalogContext";

// Pure catalog helpers. These operate on an already-loaded `Game[]` and are
// imported by pages/components for filtering/sorting/deriving collections.
export function getFeaturedGames(games: Game[]): Game[] {
  return games.slice(0, 4);
}

export function getNewReleases(games: Game[]): Game[] {
  return [...games].sort((a, b) =>
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 8);
}

export function getTopRated(games: Game[]): Game[] {
  return [...games].sort((a, b) => b.rating - a.rating).slice(0, 8);
}

export function getOnSale(games: Game[]): Game[] {
  type WithDiscount = Game & { discount: number };
  return games
    .filter((g): g is WithDiscount => typeof g.discount === "number" && g.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 8);
}

export function getGamesByCategory(games: Game[], slug: string): Game[] {
  return games.filter((g) => g.category === slug);
}

export function getGameBySlug(games: Game[], slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function searchGames(games: Game[], query: string): Game[] {
  if (!query.trim()) return games;
  const q = query.toLowerCase();
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t: string) => t.toLowerCase().includes(q))
  );
}
