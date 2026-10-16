"use client";

import { useGamesData } from "@/lib/games-data";
import { CategoryCard } from "@/components/ui/Card";

export default function Categories() {
  const { categories, games, ready } = useGamesData();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="font-mono text-arcade-fg-muted">LOADING...</div>
      </div>
    );
  }

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.slug] = games.filter((g) => g.category === cat.slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">CATEGORIES</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-xl mx-auto">
          Explore the vault by genre. Find your next favorite title.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={{ ...category, gameCount: categoryCounts[category.slug] }}
          />
        ))}
      </div>
    </div>
  );
}
