"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Importamos o contexto

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Pegamos o estado do carrinho
  const { isCartOpen } = useCart();

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão se rolar mais de 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Lógica de Renderização:
  // Se não estiver visível (scroll < 300) OU se o carrinho estiver aberto, não renderiza nada.
  if (!isVisible || isCartOpen) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in"
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} />
    </button>
  );
}
