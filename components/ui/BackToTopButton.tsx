"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // --- AJUSTE 1: Diminuí para 50px para testar fácil ---
    if (window.scrollY > 50) {
      setIsVisible(true);
      console.log("Botão deve aparecer agora (scroll > 50px)"); // Log para ajudar
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Adicionei um log para saber se o componente foi montado na tela
  console.log("BackToTopButton montado. Visível?", isVisible);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={clsx(
        // --- AJUSTE 2: Mudei z-40 para z-[999] para garantir que fique no topo de tudo ---
        "fixed bottom-6 right-6 z-999 p-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 ease-in-out",

        // --- AJUSTE 3: COMENTEI ISSO PARA TESTAR NO DESKTOP TAMBÉM ---
        // "md:hidden",

        // Lógica de visibilidade
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-10 pointer-events-none scale-75",
      )}
      // Adicionei um estilo inline temporário para garantir que o CSS não está quebrando
      style={{ display: isVisible ? "block" : "none" }}
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  );
}
