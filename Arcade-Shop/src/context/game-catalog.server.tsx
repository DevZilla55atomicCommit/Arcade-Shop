import fs from "fs";
import path from "path";
import type { Game, Category } from "@/types";
import type { ReactNode } from "react";
import { GameCatalogContext } from "./GameCatalogContext";

const GAMES_PATH = path.join(process.cwd(), "content", "games", "games.json");
const CATEGORIES_PATH = path.join(process.cwd(), "content", "categories", "categories.json");

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return null;
  }
}

/**
 * Server component: the single writer of the game catalog. Read once at build
 * time, then provided through React context to every client consumer. Pages
 * consume it via `useGamesData()` / `useGameCatalog()` — they never touch the
 * DOM or make a runtime request.
 */
export function GameCatalog({ children }: { children: ReactNode }) {
  const games = (readJson<{ games: Game[] }>(GAMES_PATH)?.games ?? []) as Game[];
  const categories = (readJson<{ categories: Category[] }>(CATEGORIES_PATH)?.categories ?? []) as Category[];

  const catalog = {
    games,
    categories,
    ready: games.length > 0,
    getGamesByCategory: (category: string) => games.filter((g) => g.category === category),
    getGameBySlug: (slug: string) => games.find((g) => g.slug === slug),
  };

  return (
    <GameCatalogContext.Provider value={catalog}>
      {children}
    </GameCatalogContext.Provider>
  );
}
