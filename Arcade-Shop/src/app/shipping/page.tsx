export default function Shipping() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">SHIPPING INFO</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          Digital delivery for most titles, physical copies shipped worldwide.
        </p>
      </div>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12 mb-8">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">DIGITAL DELIVERY</h2>
        <ul className="space-y-2 text-body-md text-arcade-fg-muted">
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            <p>Most games download instantly to your library after purchase.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            <p>Compatible with PC, PlayStation, Xbox, and Switch.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            <p>Free digital delivery on all orders.</p>
          </li>
        </ul>
      </section>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">PHYSICAL SHIPPING</h2>
        <table className="w-full text-body-md text-arcade-fg-muted">
          <thead>
            <tr className="border-b border-arcade-accent-pink/30">
              <th className="text-left py-2">Region</th>
              <th className="text-left py-2">Delivery time</th>
              <th className="text-left py-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-arcade-accent-pink/20">
              <td className="py-2">North America</td>
              <td className="py-2">5–7 business days</td>
              <td className="py-2">$6.99 or free over $50</td>
            </tr>
            <tr className="border-b border-arcade-accent-pink/20">
              <td className="py-2">Europe</td>
              <td className="py-2">7–12 business days</td>
              <td className="py-2">$8.99 or free over $50</td>
            </tr>
            <tr>
              <td className="py-2">Worldwide</td>
              <td className="py-2">10–21 business days</td>
              <td className="py-2">$12.99 or free over $50</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
