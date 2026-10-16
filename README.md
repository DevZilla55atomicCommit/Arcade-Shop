# ARCADE VAULT 🕹️

A retro-futuristic gaming store website built with Next.js 15, featuring smooth scroll animations, 3D graphics, and an authentic arcade aesthetic.

## ✨ Features

- **Arcade Theme**: Neon colors, CRT effects, pixel art aesthetics
- **Smooth Scroll**: Locomotive Scroll + GSAP ScrollTrigger
- **3D Background**: React Three Fiber arcade scene with animated elements
- **Professional Animations**: Framer Motion for UI, GSAP for scroll-driven effects
- **Page Transitions**: Smooth transitions between routes
- **Accessibility**: WCAG AA compliant, reduced motion support
- **Performance**: Optimized images, code splitting, lazy loading

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (@theme) |
| Smooth Scroll | Locomotive Scroll |
| Animations | Framer Motion + GSAP ScrollTrigger |
| 3D Graphics | React Three Fiber + Drei |
| State Management | React Context + useReducer |
| Testing | Vitest (unit) + Playwright (E2E) |
| CI/CD | GitHub Actions |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/DevZilla55atomicCommit/Arcade-Shop.git
cd Arcade-Shop

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
arcade-shop/
├── .github/workflows/       # CI/CD pipelines
├── .claude/                 # Claude Code skills & agents
├── content/                 # JSON data (games, categories)
├── public/                  # Static assets
│   ├── images/              # Game images, thumbnails
│   └── fonts/               # Local fonts
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (pages)/         # Route groups
│   │   ├── api/             # API routes
│   │   ├── globals.css      # Global styles + arcade theme
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── ui/              # Base UI components (Button, Card, Input)
│   │   ├── layouts/         # Layout components (Navbar, Footer)
│   │   ├── arcade/          # Arcade-specific components
│   │   └── providers/       # Context providers
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & configurations
│   │   ├── animations.ts    # Framer variants + GSAP helpers
│   │   ├── three-scene.tsx  # R3F arcade scene
│   │   └── utils.ts         # Helper functions
│   ├── types/               # TypeScript types
│   └── config/              # Site configuration
├── tests/                   # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   ├── e2e/                 # Playwright E2E tests
│   └── visual/              # Visual regression tests
└── package.json
```

## 🎮 Arcade Components

| Component | Description |
|-----------|-------------|
| `Hero` | Landing hero with 3D background |
| `GameGrid` | Animated game card grid |
| `NeonMarquee` | Scrolling neon text |
| `PixelLoader` | Retro loading spinners |
| `CRTOverlay` | CRT monitor effects |
| `Scanlines` | Visual effects (scanlines, vignette) |
| `ParallaxSection` | Scroll parallax wrapper |
| `PinSection` | GSAP pin sections |
| `MagneticButton` | Magnetic hover effects |
| `CategoryTabs` | Animated category filters |
| `PlatformBadges` | Platform icons |
| `GameFilter` | Sidebar filter panel |
| `GameSort` | Sort dropdown |
| `PriceDisplay` | Price with discount |
| `RatingStars` | Star ratings |
| `AddToCart` | Cart actions |
| `WishlistButton` | Wishlist toggle |
| `ShareButton` | Social sharing |
| `GameTrailer` | YouTube trailer player |
| `SystemRequirements` | Specs table |
| `RelatedGames` | Cross-sell section |
| `ReviewCard` | Review display |
| `ReviewForm` | Review submission |
| `NewsletterForm` | Email capture |
| `CookieBanner` | GDPR cookie notice |
| `BackToTop` | Scroll to top |
| `ScrollProgress` | Top progress bar |
| `PageTransition` | Route transitions |

## 🎨 Design System

The arcade theme is defined in `tailwind.config.ts` and `src/app/globals.css`:

- **Colors**: Neon pink, blue, green, yellow, purple on deep dark backgrounds
- **Fonts**: Space Grotesk (display), Outfit (body), JetBrains Mono (mono)
- **Animations**: Neon pulse, flicker, float, pixel bounce
- **Effects**: CRT scanlines, vignette, RGB shift, pixel grid

## 📦 Available Scripts

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run test         # Run unit tests
npm run test:watch   # Watch mode for tests
npm run test:e2e     # Run Playwright E2E tests
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
# Install browsers first (once)
npx playwright install --with-deps chromium

# Run tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Build
```bash
npm run build
npm run start
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://arcadevault.gg
NEXT_PUBLIC_API_URL=https://api.arcadevault.gg
```

### Tailwind Theme

Customize the arcade theme in `tailwind.config.ts`:
- Colors: `arcade.accent.*`, `arcade.bg.*`, `arcade.fg.*`
- Fonts: `fontDisplay`, `fontBody`, `fontMono`
- Animations: `animate-neon-pulse`, `animate-float`, etc.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a PR

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Credits

- **Fonts**: Space Grotesk, Outfit, JetBrains Mono (Google Fonts)
- **Icons**: Lucide React
- **3D**: Three.js, React Three Fiber, Drei
- **Animations**: GSAP, Framer Motion, Locomotive Scroll
- **Inspiration**: Classic arcade cabinets, synthwave aesthetics

---

Built with ❤️ for retro gaming enthusiasts