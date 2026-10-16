export default function Careers() {
  const roles = [
    { title: "Frontend Engineer", dept: "Product", type: "Full-time" },
    { title: "Backend Engineer", dept: "Infrastructure", type: "Full-time" },
    { title: "Community Manager", dept: "Community", type: "Part-time" },
    { title: "Game Curator", dept: "Acquisition", type: "Full-time" },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md text-arcade-fg-primary mb-3">CAREERS</h1>
        <p className="text-body-md text-arcade-fg-muted max-w-2xl mx-auto">
          Join the team behind Arcade Vault and help gamers discover their next obsession.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.title} className="bg-arcade-bg-card rounded-arcade-lg p-6 card-glow">
            <h2 className="font-display text-heading-md text-arcade-fg-primary mb-2">{role.title}</h2>
            <div className="flex flex-wrap gap-2 text-body-sm text-arcade-fg-muted mb-4">
              <span className="px-2 py-1 rounded-arcade-sm bg-arcade-accent-pink/10">{role.dept}</span>
              <span className="px-2 py-1 rounded-arcade-sm bg-arcade-accent-green/10">{role.type}</span>
            </div>
            <a href="mailto:careers@arcadevault.gg" className="font-mono text-sm text-arcade-accent-pink hover:underline">
              Apply now →
            </a>
          </div>
        ))}
      </div>

      <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 sm:p-12 mt-8">
        <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">WHY WORK HERE</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-md text-arcade-fg-muted">
          <li className="flex items-start gap-3">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            Remote-first, global team
          </li>
          <li className="flex items-start gap-3">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            Play everything you touch
          </li>
          <li className="flex items-start gap-3">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            Competitive equity and benefits
          </li>
          <li className="flex items-start gap-3">
            <span className="font-display text-arcade-accent-green flex-shrink-0">✓</span>
            Flexible hours and PTO
          </li>
        </ul>
      </section>
    </div>
  );
}
