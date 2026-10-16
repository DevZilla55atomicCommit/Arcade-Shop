import Link from "next/link";

const bestSellers = [
  { slug: "neon-drifter", title: "NEON DRIFTER", rating: 4.8 },
  { slug: "void-station", title: "VOID STATION", rating: 4.9 },
  { slug: "pixel-warrior", title: "PIXEL WARRIOR", rating: 4.7 },
  { slug: "cyber-knight", title: "CYBER KNIGHT", rating: 4.6 },
  { slug: "arcade-legends", title: "ARCADE LEGENDS", rating: 4.5 },
];

export default function BestSellers() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">BEST SELLERS</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          The most loved titles in the Arcade Vault — voted by thousands of gamers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestSellers.map((game) => (
          <Link key={game.slug} href={`/g/${game.slug}`} className="group block bg-arcade-bg-card rounded-arcade-lg overflow-hidden card-glow">
            <div className="h-44 bg-arcade-accent-pink/10 flex items-center justify-center">
              <span className="font-mono text-arcade-accent-pink text-sm group-hover:text-arcade-accent-green transition-colors">
                {game.title}
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-display text-heading-md text-arcade-fg-primary mb-2">{game.title}</h2>
              <div className="flex items-center gap-2">
                <span className="text-arcade-accent-green font-mono text-sm">★ {game.rating}</span>
                <span className="font-mono text-xs text-arcade-fg-muted">Best Seller</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
