// context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Definição dos tipos
interface ProductVariant {
  id: string;
  name: string;
  images: string[];
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  variants?: ProductVariant[];
  [key: string]: any;
}

export interface CartItem {
  cartId: string; // ID único para o item no carrinho (produto + variante)
  product: CartProduct;
  variantId: string;
  variantName?: string;
  variantImage?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addItemToCart: (
    product: CartProduct,
    quantity: number,
    variantId?: string,
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Carregar do LocalStorage ao iniciar
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

  // 2. Salvar no LocalStorage sempre que mudar
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("@ecommerce:cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Adicionar item
  const addItemToCart = (
    product: CartProduct,
    quantity: number,
    variantId: string = "",
  ) => {
    // Encontrar informações da variante se houver
    let variantName = "";
    let variantImage = "";

    if (variantId && product.variants) {
      const variant = product.variants.find((v: any) => v.id === variantId);
      if (variant) {
        variantName = variant.name;
        // Pega a primeira imagem da variante ou usa a do produto
        variantImage =
          variant.images && variant.images.length > 0
            ? variant.images[0]
            : product.image;
      }
    }

    const uniqueId = `${product.id}-${variantId}`;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.cartId === uniqueId);

      if (existingItem) {
        // Se já existe, apenas aumenta a quantidade
        return prev.map((item) =>
          item.cartId === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // Se não existe, adiciona novo
      return [
        ...prev,
        {
          cartId: uniqueId,
          product,
          variantId,
          variantName,
          variantImage: variantImage || product.image,
          quantity,
        },
      ];
    });

    setIsCartOpen(true); // Abre o carrinho automaticamente
  };

  // Remover item
  const removeFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Atualizar quantidade
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

  // Controles do Drawer
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Cálculos
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
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
