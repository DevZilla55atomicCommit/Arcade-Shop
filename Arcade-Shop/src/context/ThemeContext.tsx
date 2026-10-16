import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "dark" | "light";
}

const ThemeContext = createContext<{
  state: ThemeState;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children, defaultTheme = "dark", enableSystem = true }: { children: ReactNode; defaultTheme?: Theme; enableSystem?: boolean }) {
  const [state, setState] = useState<ThemeState>({
    theme: defaultTheme,
    resolvedTheme: "dark",
  });

  const setTheme = useCallback((theme: Theme) => {
    setState((prev) => ({ ...prev, theme }));
    localStorage.setItem("arcade-theme", theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => {
      const nextTheme = prev.resolvedTheme === "dark" ? "light" : "dark";
      localStorage.setItem("arcade-theme", nextTheme);
      return { ...prev, theme: nextTheme, resolvedTheme: nextTheme };
    });
  }, []);

  // Hydration + system-theme subscription on mount. Restoring theme from
  // localStorage and listening for `prefers-color-scheme` changes are the
  // documented use cases for setState-in-effect (synchronizing React state with
  // external systems), so it is intentionally allowed.
  useEffect(() => {
    const stored = localStorage.getItem("arcade-theme") as Theme | null;
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((prev) => ({ ...prev, theme: stored }));
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (state.theme === "system") {
        setState((prev) => ({ ...prev, resolvedTheme: mediaQuery.matches ? "dark" : "light" }));
      }
    };

    if (enableSystem) {
      const initialResolved = state.theme === "system" ? (mediaQuery.matches ? "dark" : "light") : state.theme;
      setState((prev) => ({ ...prev, resolvedTheme: initialResolved }));
      mediaQuery.addEventListener("change", handleChange);
    } else {
      setState((prev) => ({ ...prev, resolvedTheme: prev.theme === "light" ? "light" : "dark" }));
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [state.theme, enableSystem]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(state.resolvedTheme);
  }, [state.resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ state, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}