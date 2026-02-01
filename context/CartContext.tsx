"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, WholesaleOption } from "@/types";

// --- INTERFACES ---

export interface CartItem {
  cartId: string; // ID único (ex: "123-LetraA")
  product: Product;
  quantity: number;
  selectedLetter?: string; // Substitui variants para personalização simples
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addItemToCart: (
    product: Product,
    quantity: number,
    selectedLetter?: string,
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemPrice: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("@ecommerce:cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("@ecommerce:cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Função auxiliar para calcular preço baseado na quantidade (Atacado)
  const getItemPrice = (item: CartItem) => {
    const { product, quantity } = item;

    if (!product.wholesaleOptions || product.wholesaleOptions.length === 0) {
      return product.price;
    }

    // Ordena regras (maior quantidade primeiro)
    const options = [...product.wholesaleOptions].sort(
      (a, b) => b.minQuantity - a.minQuantity,
    );

    // Encontra regra aplicável
    const activeOption = options.find((opt) => quantity >= opt.minQuantity);

    return activeOption ? activeOption.unitPrice : product.price;
  };

  const addItemToCart = (
    product: CartProduct,
    quantity: number,
    selectedLetter?: string,
  ) => {
    // Cria um ID único para o item no carrinho
    // Se tiver letra selecionada, ela faz parte da unicidade
    const uniqueId = selectedLetter
      ? `${product.id}-${selectedLetter}`
      : `${product.id}`;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.cartId === uniqueId);

      if (existingItem) {
        return prev.map((item) =>
          item.cartId === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          cartId: uniqueId,
          product,
          quantity,
          selectedLetter,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const clearCart = () => setCartItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + getItemPrice(item) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        cartCount,
        cartTotal,
        addItemToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        getItemPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
