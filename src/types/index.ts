export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  thumbnail: string;
  category: GameCategory;
  tags: string[];
  rating: number;
  reviewCount: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  platforms: Platform[];
  genres: string[];
  features: string[];
  systemRequirements?: SystemRequirements;
  screenshots: string[];
  trailerUrl?: string;
}

export type GameCategory =
  | "action"
  | "adventure"
  | "rpg"
  | "strategy"
  | "simulation"
  | "sports"
  | "racing"
  | "fighting"
  | "puzzle"
  | "horror"
  | "indie"
  | "arcade"
  | "multiplayer"
  | "vr";

export type Platform = "pc" | "ps5" | "xbox" | "switch" | "mobile" | "vr";

export interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  gameCount: number;
  color: string;
  gradient: string;
}

export interface CartItem {
  gameId: string;
  quantity: number;
  price: number;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  wishlist: string[];
  library: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "dark" | "light" | "system";
  reducedMotion: boolean;
  notifications: boolean;
  currency: string;
  language: string;
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  username: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  preferences: string[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  social: {
    twitter: string;
    discord: string;
    youtube: string;
    twitch: string;
    github: string;
  };
  navigation: NavigationItem[];
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface AnimationConfig {
  reducedMotion: boolean;
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    spring: number[];
    bounce: number[];
    easeOutExpo: number[];
  };
}

export const ARCADE_ANIMATION_CONFIG: AnimationConfig = {
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
};

export const GAME_CATEGORIES: Category[] = [
  {
    id: "action",
    slug: "action",
    name: "Action",
    description: "Fast-paced combat and reflex-based gameplay",
    icon: "zap",
    gameCount: 0,
    color: "#ff006e",
    gradient: "linear-gradient(135deg, #ff006e, #bc13fe)",
  },
  {
    id: "adventure",
    slug: "adventure",
    name: "Adventure",
    description: "Story-driven exploration and discovery",
    icon: "map",
    gameCount: 0,
    color: "#00d4ff",
    gradient: "linear-gradient(135deg, #00d4ff, #39ff14)",
  },
  {
    id: "rpg",
    slug: "rpg",
    name: "RPG",
    description: "Character progression and deep narratives",
    icon: "gem",
    gameCount: 0,
    color: "#ffea00",
    gradient: "linear-gradient(135deg, #ffea00, #ff006e)",
  },
  {
    id: "strategy",
    slug: "strategy",
    name: "Strategy",
    description: "Tactical thinking and resource management",
    icon: "cpu",
    gameCount: 0,
    color: "#bc13fe",
    gradient: "linear-gradient(135deg, #bc13fe, #00d4ff)",
  },
  {
    id: "arcade",
    slug: "arcade",
    name: "Arcade",
    description: "Classic arcade action and high scores",
    icon: "gamepad-2",
    gameCount: 0,
    color: "#39ff14",
    gradient: "linear-gradient(135deg, #39ff14, #ffea00)",
  },
  {
    id: "indie",
    slug: "indie",
    name: "Indie",
    description: "Unique creative experiences from small teams",
    icon: "sparkles",
    gameCount: 0,
    color: "#ff006e",
    gradient: "linear-gradient(135deg, #ff006e, #39ff14)",
  },
];

export const PLATFORM_ICONS: Record<Platform, string> = {
  pc: "monitor",
  ps5: "playstation",
  xbox: "xbox",
  switch: "gamepad-2",
  mobile: "smartphone",
  vr: "headset",
};

export const ARCADE_COLORS = {
  pink: "#ff006e",
  blue: "#00d4ff",
  green: "#39ff14",
  yellow: "#ffea00",
  purple: "#bc13fe",
  deep: "#0a0a0f",
  elevated: "#12121a",
  card: "#1a1a24",
  fg: "#f0f0f5",
  muted: "#8b8b9a",
} as const;

export type ArcadeColorKey = keyof typeof ARCADE_COLORS;