"use client";

import { useState, useMemo } from "react";
import { useGamesData } from "@/lib/games-data";
import { GAME_CATEGORIES } from "@/config/site";
import { Platform } from "@/types";
import { GameFilter } from "@/components/arcade/GameFilter";
import { GameSort } from "@/components/arcade/GameSort";
import { GameGrid } from "@/components/arcade/GameGrid";
import { formatPrice } from "@/lib/utils";

const PLATFORMS: Platform[] = ["pc", "ps5", "xbox", "switch", "mobile", "vr"];

export default function Shop() {
  const { games, categories } = useGamesData();
  const categoryList = useMemo(
    () => categories.map((c) => ({ slug: c.slug, name: c.name, count: c.gameCount })),
    [categories]
  );
  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PLATFORMS) counts[p] = games.filter((g) => g.platforms.includes(p)).length;
    return counts;
  }, [games]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "price-asc" | "price-desc" | "rating" | "popular"
  >("newest");

  const filtered = useMemo(() => {
    let list = games.filter((g) => {
      if (selectedCategory && g.category !== selectedCategory) return false;
      if (selectedPlatform && !g.platforms.includes(selectedPlatform as Platform)) return false;
      if (g.price < priceRange[0] || g.price > priceRange[1]) return false;
      if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list = [...list].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    }
    return list;
  }, [games, selectedCategory, selectedPlatform, priceRange, search, sortBy]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) + (selectedPlatform ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">GAME SHOP</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-xl mx-auto">
          {games.length.toLocaleString()} titles in the vault. Filter, sort, and load up.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <GameFilter
            categories={categoryList}
            platforms={PLATFORMS}
            selectedCategory={selectedCategory}
            selectedPlatform={selectedPlatform}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategory}
            onPlatformChange={setSelectedPlatform}
            onPriceChange={setPriceRange}
            onReset={() => {
              setSelectedCategory(null);
              setSelectedPlatform(null);
              setPriceRange([0, 100]);
              setSearch("");
            }}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="font-mono text-sm text-arcade-fg-muted">
              {activeFiltersCount} active filter{activeFiltersCount !== 1 ? "s" : ""} • {filtered.length} result
              {filtered.length !== 1 ? "s" : ""}
            </div>
            <div className="w-full sm:w-auto">
              <GameSort selected={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH GAMES..."
              className="w-full bg-arcade-bg-card border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink"
            />
          </div>

          <GameGrid games={filtered} columns={3} />
        </div>
      </div>
    </div>
  );
}
