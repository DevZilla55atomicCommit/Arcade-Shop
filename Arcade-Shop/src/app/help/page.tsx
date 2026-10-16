import { siteConfig } from "@/config/site";

export default function Help() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">HELP CENTER</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          Everything you need to get the most out of Arcade Vault.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            title: "Account",
            topics: ["Log in / Sign up", "Manage your library", "Change your password"],
          },
          {
            title: "Buying",
            topics: ["How to purchase", "Payment methods", "Refunds & returns"],
          },
          {
            title: "Downloads",
            topics: ["Installing games", "Troubleshooting", "Offline play"],
          },
          {
            title: "Contact",
            topics: ["Reach the support team", "Report a bug", "Suggest a title"],
          },
        ].map((group) => (
          <div key={group.title} className="bg-arcade-bg-card rounded-arcade-lg p-6 card-glow">
            <h2 className="font-display text-heading-md text-arcade-fg-primary mb-4">{group.title}</h2>
            <ul className="space-y-2 text-body-md text-arcade-fg-muted">
              {group.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-arcade-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-body-md text-arcade-fg-muted mb-4">Still stuck?</p>
        <a href={siteConfig.social.discord} className="inline-block font-mono text-sm text-arcade-accent-pink hover:underline" target="_blank" rel="noreferrer">
          Chat with us on Discord
        </a>
      </div>
    </div>
  );
}
