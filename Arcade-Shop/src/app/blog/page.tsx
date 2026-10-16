import { siteConfig } from "@/config/site";

const posts = [
  {
    title: "The Rise of the Modern Arcade",
    excerpt: "How a retro-futuristic storefront is bringing classic gameplay to a new generation.",
    date: "2024-03-01",
  },
  {
    title: "Top 10 Synthwave Racers",
    excerpt: "Drift through neon highways with our hand-picked list of the best synthwave racing games.",
    date: "2024-02-15",
  },
  {
    title: "Building a Collector&rsquo;s Library",
    excerpt: "Tips and tricks for organizing and playing your growing Arcade Vault collection.",
    date: "2024-01-20",
  },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">BLOG</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          News, guides, and deep dives from the Arcade Vault team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.title} className="bg-arcade-bg-card rounded-arcade-lg overflow-hidden card-glow">
            <div className="h-40 bg-arcade-accent-pink/10 flex items-center justify-center">
              <span className="font-mono text-arcade-accent-pink text-sm">GAME ART</span>
            </div>
            <div className="p-6">
              <time className="font-mono text-xs text-arcade-fg-muted">{post.date}</time>
              <h2 className="font-display text-heading-md text-arcade-fg-primary mb-2">{post.title}</h2>
              <p className="text-body-sm text-arcade-fg-muted leading-relaxed">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <a href={siteConfig.social.twitter} className="inline-block font-mono text-sm text-arcade-accent-pink hover:underline" target="_blank" rel="noreferrer">
          Follow us on Twitter
        </a>
      </div>
    </div>
  );
}
