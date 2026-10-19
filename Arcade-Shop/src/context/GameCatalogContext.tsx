"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { Game, Category } from "@/types";

export interface GameCatalog {
  games: Game[];
  categories: Category[];
  ready: boolean;
}

export interface GameCatalogContextValue extends GameCatalog {
  getGamesByCategory: (category: string) => Game[];
  getGameBySlug: (slug: string) => Game | undefined;
}

export const GameCatalogContext = createContext<GameCatalogContextValue>({
  games: [],
  categories: [],
  ready: false,
  getGamesByCategory: () => [],
  getGameBySlug: () => undefined,
});

/**
 * The catalog is static content read once at build time by the server
 * component (game-catalog.server.tsx) and provided through context. Consumers
 * never touch the DOM, so change notification is unnecessary: a no-op subscribe
 * satisfies useSyncExternalStore, and getSnapshot reads the snapshot fresh on
 * every access to keep re-renders cheap.
 */
export function useGameCatalog(): GameCatalogContextValue {
  return useContext(GameCatalogContext);
}

/**
 * Catalog accessor used by pages/components. Mirrors the older `useGamesData`
 * hook so existing call sites keep working: returns the catalog snapshot plus
 * the two query helpers.
 */
export function useGamesData(): GameCatalogContextValue {
  return useGameCatalog();
}

export function useGames(): GameCatalogContextValue {
  return useGameCatalog();
}

export function GameCatalogProvider({ children }: { children: ReactNode }) {
  return (
    <GameCatalogContext.Provider value={useGameCatalog()}>
      {children}
    </GameCatalogContext.Provider>
  );
}

export function useGamesContext(): GameCatalogContextValue {
  return useContext(GameCatalogContext);
}
