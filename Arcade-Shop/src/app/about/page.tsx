import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">ABOUT ARCADE VAULT</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">{siteConfig.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { title: "Curated Collection", body: "Every title is hand-selected for quality, replayability, and value." },
          { title: "Competitive Pricing", body: "Real-time deals across the vault with transparent, honest pricing." },
          { title: "Instant Delivery", body: "Your library is ready the moment you&rsquo;re in. No waiting at the counter." },
        ].map((feature) => (
          <div key={feature.title} className="bg-arcade-bg-card rounded-arcade-lg p-6 card-glow">
            <h3 className="font-display text-heading-md text-arcade-fg-primary mb-3">{feature.title}</h3>
            <p className="text-body-md text-arcade-fg-muted leading-relaxed">{feature.body}</p>
          </div>
        ))}
      </div>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">WHY GAMESHOPPERS TRUST US</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-lg text-arcade-fg-muted">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-arcade-accent-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free shipping on orders over $50
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-arcade-accent-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            30-day money-back guarantee
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-arcade-accent-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            24/7 dedicated support team
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-arcade-accent-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Secure checkout with encryption
          </li>
        </ul>
      </section>
    </div>
  );
}
