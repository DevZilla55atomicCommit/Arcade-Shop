"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useGamesData } from "@/lib/games-data";
import { PlatformBadges } from "@/components/arcade/PlatformBadges";
import { RatingStars } from "@/components/arcade/RatingStars";
import { ReviewList } from "@/components/arcade/ReviewCard";
import { RelatedGames } from "@/components/arcade/RelatedGames";
import { AddToCart, BuyNow } from "@/components/arcade/AddToCart";
import { WishlistButton } from "@/components/arcade/WishlistButton";
import { ShareButton } from "@/components/arcade/ShareButton";
import { formatPrice } from "@/lib/utils";

interface Game {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  thumbnail: string;
  category: string;
  rating: number;
  reviewCount: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  platforms: string[];
  genres: string[];
  features: string[];
}

const locationStore = {
  subscribe: (onStoreChange: () => void) => {
    let active = true;
    return () => {
      active = false;
    };
  },
  getSnapshot: () => window.location.pathname,
};

export default function GameDetail() {
  const { games, getGameBySlug } = useGamesData();
  const [selectedImage, setSelectedImage] = useState(0);

  const path: string = useSyncExternalStore(locationStore.subscribe, locationStore.getSnapshot);
  const slug = path.split("/")[1] ?? "";
  const game = getGameBySlug(slug);
  const related = game
    ? games.filter((g) => g.category === game.category && g.slug !== game.slug).slice(0, 4)
    : [];

  if (!game) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">GAME NOT FOUND</h1>
        <p className="text-body-md text-arcade-fg-muted">
          We couldn&rsquo;t find that title. <a href="/shop" className="text-arcade-accent-pink hover:underline">Browse the shop</a>.
        </p>
      </div>
    );
  }

  const images = game.images.length ? game.images : [game.thumbnail];
  const releaseDate = new Date(game.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="mb-6 font-mono text-sm text-arcade-fg-muted">
        <Link href="/" className="hover:text-arcade-accent-pink">Home</Link>
        <span className="mx-2">/</span>
        <a href="/shop" className="hover:text-arcade-accent-pink">Shop</a>
        <span className="mx-2">/</span>
        <span className="text-arcade-fg-primary">{game.category}</span>
      </nav>

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-[16/10] rounded-arcade-lg overflow-hidden bg-arcade-bg-elevated">
            <Image src={images[selectedImage]} alt={game.title} fill className="w-full h-full object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setSelectedImage(i)}
                className={
                  "w-20 h-28 rounded-arcade overflow-hidden bg-arcade-bg-elevated border-2 transition-colors " +
                  (i === selectedImage ? "border-arcade-accent-pink" : "border-transparent opacity-60")
                }
              >
                <Image src={img} alt="" fill width={80} height={112} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-sm text-arcade-accent-pink uppercase tracking-wider">
            <span>{game.category}</span>
            <span>•</span>
            <span>{game.releaseDate}</span>
          </div>
          <h1 className="font-display text-display-md text-arcade-fg-primary mb-4">{game.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <RatingStars rating={game.rating} size="lg" showValue />
            <span className="font-mono text-sm text-arcade-fg-muted">({game.reviewCount} reviews)</span>
          </div>

          <p className="text-body-lg text-arcade-fg-muted leading-relaxed mb-6">{game.description}</p>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-display text-display-sm text-arcade-accent-green">
              {formatPrice(game.price)}
            </span>
            {game.originalPrice && (
              <span className="font-mono text-sm text-arcade-fg-muted line-through">
                {formatPrice(game.originalPrice)}
              </span>
            )}
            {game.discount && (
              <span className="font-mono text-xs uppercase tracking-wider bg-arcade-accent-green text-arcade-bg-deep px-2 py-1 rounded-pixel">
                -{game.discount}%
              </span>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-display text-heading-md text-arcade-fg-primary mb-3">PLATFORMS</h3>
            <PlatformBadges platforms={game.platforms} showLabels size="md" />
          </div>

          <div className="mb-8">
            <h3 className="font-display text-heading-md text-arcade-fg-primary mb-3">GENRES</h3>
            <div className="flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 font-mono text-xs uppercase tracking-wider bg-arcade-bg-elevated border border-arcade-fg-muted/20 rounded-pixel text-arcade-fg-muted"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-display text-heading-md text-arcade-fg-primary mb-3">FEATURES</h3>
            <ul className="grid grid-cols-2 gap-2 text-body-md text-arcade-fg-muted">
              {game.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-arcade-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <section className="sticky top-24 z-20 mb-8 rounded-arcade-lg bg-arcade-bg-card/90 p-4 backdrop-blur border border-arcade-fg-muted/20">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <AddToCart gameId={game.slug} title={game.title} price={game.price} />
          <BuyNow gameId={game.slug} title={game.title} price={game.price} />
          <WishlistButton gameId={game.slug} size="lg" className="flex-1" />
          <ShareButton />
        </div>
      </section>

      <section className="py-12">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-8">REVIEWS</h2>
        <ReviewList reviews={buildReviews(game)} />
      </section>

      <RelatedGames games={related} />
    </div>
  );
}

function buildReviews(game: Game) {
  const seed = game.reviewCount || 1;
  return Array.from({ length: seed }).map((_, i) => ({
    id: `${game.slug}-review-${i}`,
    username: ["NeonNinja", "PixelPilot", "RetroRex", "GlitchQueen"][i % 4],
    rating: 4 + (i % 2),
    title: ["Great visuals", "Fun gameplay", "Solid experience", "Loved the story"][i % 4],
    content: `A solid entry in the ${game.category} genre. The ${game.title} delivers on its promise with juicy feedback and tight controls.`,
    helpful: 12 + i * 3,
    createdAt: "2024-06-15",
  }));
}
