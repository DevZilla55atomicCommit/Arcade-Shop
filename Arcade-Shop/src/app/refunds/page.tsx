export default function Refunds() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">REFUND POLICY</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          Fair, fast, and hassle-free refunds on every Arcade Vault purchase.
        </p>
      </div>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12 mb-8">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">HOW REFUNDS WORK</h2>
        <ol className="space-y-4 text-body-md text-arcade-fg-muted">
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-pink flex-shrink-0">1</span>
            <p>Request a refund within 30 days of purchase through your account or by contacting support.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-pink flex-shrink-0">2</span>
            <p>We review your request and respond within 2 business days.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-pink flex-shrink-0">3</span>
            <p>Approved refunds are issued to your original payment method within 5–7 business days.</p>
          </li>
        </ol>
      </section>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">NOT ELIGIBLE FOR REFUND</h2>
        <ul className="space-y-2 text-body-md text-arcade-fg-muted">
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-pink flex-shrink-0">•</span>
            <p>Gift cards and in-game currency once redeemed.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-pink flex-shrink-0">•</span>
            <p>Downloads after they&rsquo;ve been opened more than 10 times.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-pink flex-shrink-0">•</span>
            <p>Requests outside the 30-day window.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
