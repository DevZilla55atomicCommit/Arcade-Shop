import Link from "next/link";

export function LegalPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-display-md text-arcade-fg-primary mb-4">{title}</h1>
      <p className="font-mono text-sm text-arcade-fg-muted mb-8">{description}</p>
      <div className="prose-invert font-mono text-body-sm text-arcade-fg-muted space-y-4 leading-relaxed">
        <p>
          Welcome to Arcade Vault. This {["Privacy","Terms","Cookie"]
            // eslint-disable-next-line react/no-unescaped-entities
            .includes(title) ? 'service' : 'page'} ('Site') provides access to a curated catalog of arcade and indie
          titles. By using our Site, you agree to comply with and be bound by the following terms.
        </p>
        <p>
          <span className="text-arcade-accent-pink">Last updated:</span> {new Date().toISOString().slice(0, 10)}
        </p>
        <p>
          Arcade Vault is operated by Arcade Vault Games, LLC. All product images and listings are for demonstration
          purposes. Pricing, availability, and ownership of the underlying games remain with their respective rights
          holders.
        </p>
        <p>
          This is a demo build. Authentication, payments, and order processing are not yet connected to a live backend.
        </p>
      </div>
    </div>
  );
}

export function LegalNav() {
  return (
    <nav className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 pb-12">
      <ul className="flex flex-wrap gap-6 font-mono text-sm text-arcade-fg-muted">
        <li><Link href="/privacy" className="hover:text-arcade-accent-pink transition-colors">Privacy</Link></li>
        <li><Link href="/terms" className="hover:text-arcade-accent-pink transition-colors">Terms</Link></li>
        <li><Link href="/cookies" className="hover:text-arcade-accent-pink transition-colors">Cookies</Link></li>
        <li><Link href="/accessibility" className="hover:text-arcade-accent-pink transition-colors">Accessibility</Link></li>
        <li><Link href="/help" className="hover:text-arcade-accent-pink transition-colors">Help</Link></li>
      </ul>
    </nav>
  );
}
