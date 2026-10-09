import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import type { User, UserPreferences } from "@/types";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  preferences: UserPreferences;
}

type UserAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PREFERENCES"; payload: Partial<UserPreferences> }
  | { type: "LOGOUT" };

const defaultPreferences: UserPreferences = {
  theme: "dark",
  reducedMotion: false,
  notifications: true,
  currency: "USD",
  language: "en",
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  preferences: defaultPreferences,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_PREFERENCES":
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: UserState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
} | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedPrefs = localStorage.getItem("arcade-preferences");
    if (storedPrefs) {
      try {
        dispatch({ type: "SET_PREFERENCES", payload: JSON.parse(storedPrefs) });
      } catch {
        // ignore parse errors
      }
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    dispatch({ type: "SET_PREFERENCES", payload: prefs });
    localStorage.setItem("arcade-preferences", JSON.stringify({ ...state.preferences, ...prefs }));
  }, [state.preferences]);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: Implement actual auth
    dispatch({ type: "SET_USER", payload: { id: "1", email, username: email.split("@")[0], preferences: state.preferences } });
  }, [state.preferences]);

  const register = useCallback(async (email: string, username: string, password: string) => {
    // TODO: Implement actual auth
    dispatch({ type: "SET_USER", payload: { id: "1", email, username, preferences: state.preferences } });
  }, [state.preferences]);

  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        updatePreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}