"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext";
import { useGamesData } from "@/lib/games-data";
import { GameGrid } from "@/components/arcade/GameGrid";

export default function AccountPage() {
  const { state, login, register, logout, updatePreferences } = useUser();
  const isLoading = state.isLoading;
  const { count } = useWishlist();
  const { games, ready } = useGamesData();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await login(email, password);
    } else {
      await register(email, username, password);
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-display-md text-arcade-fg-primary mb-8">ACCOUNT</h1>

      {state.isAuthenticated && state.user ? (
        <div className="space-y-8">
          <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8">
            <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">WELCOME BACK</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-arcade-accent-pink/20 flex items-center justify-center text-arcade-accent-pink font-display font-bold text-2xl">
                {state.user.username[0].toUpperCase()}
              </div>
              <div>
                <p className="font-mono text-xs text-arcade-fg-muted uppercase tracking-wider">Signed in as</p>
                <p className="font-display text-heading-lg text-arcade-fg-primary">{state.user.username}</p>
                <p className="font-mono text-sm text-arcade-fg-muted mt-1">{state.user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-arcade-bg-elevated rounded-arcade p-4 text-center">
                <div className="font-display text-display-sm text-arcade-accent-pink">{count}</div>
                <div className="font-mono text-xs text-arcade-fg-muted mt-1">Wishlist</div>
              </div>
              <div className="bg-arcade-bg-elevated rounded-arcade p-4 text-center">
                <div className="font-display text-display-sm text-arcade-accent-pink">0</div>
                <div className="font-mono text-xs text-arcade-fg-muted mt-1">Library</div>
              </div>
              <div className="bg-arcade-bg-elevated rounded-arcade p-4 text-center">
                <div className="font-display text-display-sm text-arcade-accent-pink">∞</div>
                <div className="font-mono text-xs text-arcade-fg-muted mt-1">Credits</div>
              </div>
            </div>
          </section>

          <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8">
            <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">LIBRARY</h2>
            <p className="font-mono text-sm text-arcade-fg-muted mb-4">Your purchased games</p>
            {games.length === 0 ? (
              <p className="font-mono text-sm text-arcade-fg-muted">You haven&rsquo;t purchased any games yet.</p>
            ) : (
              <GameGrid games={games} columns={4} />
            )}
          </section>

          <section className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8">
            <h2 className="font-display text-heading-lg text-arcade-fg-primary mb-6">PREFERENCES</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-arcade-fg-muted">Currency</span>
                <select className="bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-3 py-2 rounded-pixel focus:outline-none focus:border-arcade-accent-pink">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-mono text-sm text-arcade-fg-muted">Reduced motion</span>
                <input
                  type="checkbox"
                  checked={state.preferences.reducedMotion}
                  onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                  className="w-5 h-5 accent-arcade-accent-pink"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-mono text-sm text-arcade-fg-muted">Notifications</span>
                <input
                  type="checkbox"
                  checked={state.preferences.notifications}
                  onChange={(e) => updatePreferences({ notifications: e.target.checked })}
                  className="w-5 h-5 accent-arcade-accent-pink"
                />
              </label>
            </div>
          </section>

          <button
            onClick={logout}
            className="w-full py-3 font-mono text-sm uppercase tracking-wider bg-arcade-bg-elevated border border-arcade-fg-muted/30 text-arcade-fg-primary rounded-arcade hover:border-arcade-accent-pink transition-all"
          >
            Log out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-arcade-bg-card rounded-arcade-lg card-glow p-8 max-w-md">
          <div className="flex mb-6 bg-arcade-bg-elevated rounded-arcade p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={
                "flex-1 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all " +
                (mode === "login" ? "bg-arcade-accent-pink text-arcade-bg-deep" : "text-arcade-fg-muted hover:text-arcade-fg-primary")
              }
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={
                "flex-1 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all " +
                (mode === "register" ? "bg-arcade-accent-pink text-arcade-bg-deep" : "text-arcade-fg-muted hover:text-arcade-fg-primary")
              }
            >
              Register
            </button>
          </div>

          {isLoading ? (
            <p className="font-mono text-sm text-arcade-fg-muted text-center">Loading...</p>
          ) : mode === "login" ? (
            <>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL"
                  required
                  className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  required
                  className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink"
                />
                <button
                  type="submit"
                  className="w-full py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all"
                >
                  Log in
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL"
                  required
                  className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME"
                  required
                  className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  required
                  className="w-full bg-arcade-bg-elevated border-2 border-arcade-fg-muted/30 text-arcade-fg-primary font-mono text-sm px-4 py-3 rounded-arcade focus:outline-none focus:border-arcade-accent-pink"
                />
                <button
                  type="submit"
                  className="w-full py-3 font-mono text-sm uppercase tracking-wider bg-arcade-accent-pink text-arcade-bg-deep rounded-arcade hover:neon-glow-pink transition-all"
                >
                  Create account
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}
