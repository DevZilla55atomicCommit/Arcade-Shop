import { siteConfig } from "@/config/site";

const faqs = [
  {
    q: "How do I redeem a game code?",
    a: "Sign in to your account, go to Library, and click 'Add to Library' on the code's page. The game will download automatically.",
  },
  {
    q: "Can I play games offline?",
    a: "Most Arcade Vault games support offline play once downloaded. A few titles require a periodic online check-in.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, PayPal, and gift cards. Purchases are final unless you qualify for a refund.",
  },
  {
    q: "How do I request a refund?",
    a: "Refunds are processed within 30 days of purchase. Visit the Refunds page or contact support to start a request.",
  },
  {
    q: "Do you offer family or team plans?",
    a: "Yes. Family and team plans are available at checkout for sharing games across multiple accounts. Learn more on our About page.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          Quick answers to the questions we get most often.
        </p>
      </div>

      <div className="bg-arcade-bg-card rounded-arcade-lg card-glow p-6 sm:p-8">
        <ul className="space-y-6">
          {faqs.map((item) => (
            <li key={item.q} className="border-b border-arcade-accent-pink/20 last:border-b-0 pb-6 last:pb-0">
              <h2 className="font-display text-heading-md text-arcade-fg-primary mb-2">{item.q}</h2>
              <p className="text-body-md text-arcade-fg-muted leading-relaxed">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <p className="text-body-md text-arcade-fg-muted mb-4">Couldn&rsquo;t find your answer?</p>
        <a href={siteConfig.social.discord} className="inline-block font-mono text-sm text-arcade-accent-pink hover:underline" target="_blank" rel="noreferrer">
          Ask on Discord
        </a>
      </div>
    </div>
  );
}
