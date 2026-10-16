import type { Game, Category } from "@/types";

// Hydration payload injected client-side (see games-data.ts / next.config).
declare global {
  interface Window {
    __arcadeGames?: {
      games: Game[];
      categories: Category[];
    };
  }
}

export {};
