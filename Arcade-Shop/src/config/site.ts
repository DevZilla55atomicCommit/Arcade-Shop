import { GAME_CATEGORIES, PLATFORM_ICONS, ARCADE_COLORS, type Category, type Platform } from "@/types";

export { GAME_CATEGORIES };
export { PLATFORM_ICONS, ARCADE_COLORS };

export const siteConfig = {
  name: "ARCADE VAULT",
  description: "Your retro gaming destination. Discover, collect, and play the best arcade classics and modern indie gems.",
  url: "https://arcadevault.gg",
  ogImage: "/images/og-image.jpg",
  social: {
    twitter: "https://twitter.com/arcadevault",
    discord: "https://discord.gg/arcadevault",
    youtube: "https://youtube.com/@arcadevault",
    twitch: "https://twitch.tv/arcadevault",
    github: "https://github.com/arcadevault",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "New Releases", href: "/new-releases" },
    { label: "Top Rated", href: "/top-rated" },
    { label: "About", href: "/about" },
  ],
  footer: {
    shop: [
      { label: "All Games", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "New Releases", href: "/new-releases" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "On Sale", href: "/sale" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Support", href: "/support" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  categories: GAME_CATEGORIES,
  platforms: Object.keys(PLATFORM_ICONS) as Platform[],
  platformIcons: PLATFORM_ICONS,
  colors: ARCADE_COLORS,
  animation: {
    reducedMotion: false,
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      spring: [0.16, 1, 0.3, 1],
      bounce: [0.68, -0.55, 0.27, 1.55],
      easeOutExpo: [0.16, 1, 0.3, 1],
    },
  },
  pagination: {
    defaultPageSize: 24,
    maxPageSize: 100,
  },
  currency: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },
  features: {
    wishlist: true,
    reviews: true,
    recommendations: true,
    newsletter: true,
    loyaltyProgram: false,
    giftCards: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;