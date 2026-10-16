export default function Press() {
  const quotes = [
    { source: "RetroGamer Weekly", text: "Arcade Vault has redefined how we discover hidden indie gems." },
    { source: "Pixel Pulse", text: "The best-curated retro catalog we've seen all year." },
    { source: "Indie Spotlight", text: "A destination every collector should bookmark." },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">PRESS</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          What people are saying about Arcade Vault.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {quotes.map((q) => (
          <blockquote key={q.source} className="bg-arcade-bg-card rounded-arcade-lg p-6 card-glow">
            <p className="text-body-md text-arcade-fg-muted italic mb-4">&ldquo;{q.text}&rdquo;</p>
            <cite className="not-italic font-mono text-sm text-arcade-accent-pink">— {q.source}</cite>
          </blockquote>
        ))}
      </div>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">MEDIA INQUIRIES</h2>
        <p className="text-body-md text-arcade-fg-muted mb-4">
          For press kits, features, and partnership opportunities, reach out to our press team.
        </p>
        <a href="mailto:press@arcadevault.gg" className="inline-block font-mono text-sm text-arcade-accent-pink hover:underline">
          press@arcadevault.gg
        </a>
      </section>
    </div>
  );
}
