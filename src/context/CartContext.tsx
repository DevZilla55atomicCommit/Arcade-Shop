import { createContext, useContext, useReducer, ReactNode } from "react";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { gameId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex((item) => item.gameId === action.payload.gameId);
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item.gameId !== action.payload) };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.gameId !== action.payload.gameId) };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.gameId === action.payload.gameId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, "addedAt">) => void;
  removeItem: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, "addedAt">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, addedAt: new Date().toISOString() } });
  };

  const removeItem = (gameId: string) => dispatch({ type: "REMOVE_ITEM", payload: gameId });
  const updateQuantity = (gameId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { gameId, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}