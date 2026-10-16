import { createContext, useContext, useState, useReducer, ReactNode, useCallback } from "react";
import type { Game, GameCategory } from "@/types";

interface GameState {
  games: Game[];
  categories: GameCategory[];
  featuredGames: Game[];
  newReleases: Game[];
  topRated: Game[];
  onSale: Game[];
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    platform: string | null;
    priceRange: [number, number];
    search: string;
    sort: "newest" | "price-asc" | "price-desc" | "rating" | "popular";
  };
}

type GameAction =
  | { type: "SET_GAMES"; payload: Game[] }
  | { type: "SET_CATEGORIES"; payload: GameCategory[] }
  | { type: "SET_FEATURED"; payload: Game[] }
  | { type: "SET_NEW_RELEASES"; payload: Game[] }
  | { type: "SET_TOP_RATED"; payload: Game[] }
  | { type: "SET_ON_SALE"; payload: Game[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CATEGORY_FILTER"; payload: string | null }
  | { type: "SET_PLATFORM_FILTER"; payload: string | null }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: GameState["filters"]["sort"] }
  | { type: "RESET_FILTERS" };

const initialState: GameState = {
  games: [],
  categories: [],
  featuredGames: [],
  newReleases: [],
  topRated: [],
  onSale: [],
  isLoading: false,
  error: null,
  filters: {
    category: null,
    platform: null,
    priceRange: [0, 100],
    search: "",
    sort: "newest",
  },
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_GAMES":
      return { ...state, games: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_FEATURED":
      return { ...state, featuredGames: action.payload };
    case "SET_NEW_RELEASES":
      return { ...state, newReleases: action.payload };
    case "SET_TOP_RATED":
      return { ...state, topRated: action.payload };
    case "SET_ON_SALE":
      return { ...state, onSale: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_CATEGORY_FILTER":
      return { ...state, filters: { ...state.filters, category: action.payload } };
    case "SET_PLATFORM_FILTER":
      return { ...state, filters: { ...state.filters, platform: action.payload } };
    case "SET_PRICE_RANGE":
      return { ...state, filters: { ...state.filters, priceRange: action.payload } };
    case "SET_SEARCH":
      return { ...state, filters: { ...state.filters, search: action.payload } };
    case "SET_SORT":
      return { ...state, filters: { ...state.filters, sort: action.payload } };
    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  filteredGames: Game[];
  getGameBySlug: (slug: string) => Game | undefined;
  getGamesByCategory: (category: string) => Game[];
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const filteredGames = state.games.filter((game) => {
    if (state.filters.category && game.category !== state.filters.category) return false;
    if (state.filters.platform && !game.platforms.includes(state.filters.platform as any)) return false;
    if (game.price < state.filters.priceRange[0] || game.price > state.filters.priceRange[1]) return false;
    if (state.filters.search && !game.title.toLowerCase().includes(state.filters.search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    switch (state.filters.sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "popular": return b.reviewCount - a.reviewCount;
      default: return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
  });

  const getGameBySlug = useCallback((slug: string) => state.games.find((g) => g.slug === slug), [state.games]);
  const getGamesByCategory = useCallback((category: string) => state.games.filter((g) => g.category === category), [state.games]);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        filteredGames,
        getGameBySlug,
        getGamesByCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGames must be used within GameProvider");
  return context;
}