"use client";

import { useGamesData } from "@/lib/games-data";
import { GAME_CATEGORIES } from "@/types";
import { Hero } from "@/components/arcade/Hero";
import { GameGrid } from "@/components/arcade/GameGrid";
import { CategoryCard } from "@/components/ui/Card";
import { NewsletterForm } from "@/components/arcade/NewsletterForm";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  const { games, categories, ready } = useGamesData();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="font-mono text-arcade-fg-muted">LOADING VAULT...</div>
      </div>
    );
  }

  const featured = games.slice(0, 4);
  const categoriesList = categories.length ? categories : GAME_CATEGORIES.slice(0, 6);

  return (
    <div>
      <Hero />

      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10 text-center">
          <h2 className="font-display text-display-md text-arcade-fg-primary mb-3">BROWSE BY GENRE</h2>
          <p className="text-body-md text-arcade-fg-muted max-w-xl mx-auto">
            From fast reflex action to slow-burn RPGs, find your next fix.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesList.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-display-md text-arcade-fg-primary mb-3">FEATURED TITLES</h2>
            <p className="text-body-md text-arcade-fg-muted">Hand-picked from the vault.</p>
          </div>
          <a href="/shop" className="font-mono text-sm uppercase tracking-wider text-arcade-accent-pink hover:underline">
            View all
          </a>
        </div>
        <GameGrid games={featured} columns={4} />
      </section>

      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <NewsletterForm
          onSubmit={async (email) => {
            try {
              await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
            } catch {
              // client-side only; no backend wired up yet
            }
          }}
          className="bg-arcade-bg-card rounded-arcade-lg card-glow border border-arcade-accent-pink/20 p-8 sm:p-12"
        />
      </section>
    </div>
  );
}
