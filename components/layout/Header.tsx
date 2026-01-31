"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
// 1. Importamos o hook
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Pegamos a função de abrir e a contagem do contexto
  const { openCart, cartCount } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // --- FUNÇÃO DE ROLAGEM "MILIMÉTRICA" ---
  const scrollToFooter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Impede o pulo padrão

    const footerElement = document.getElementById("contato-footer");
    // Busca o próprio elemento <header> para medir sua altura
    const headerElement = document.querySelector("header");

    if (footerElement && headerElement) {
      // 1. Pega a altura exata do header no momento do clique
      const headerHeight = headerElement.getBoundingClientRect().height;

      // 2. Pega a posição do topo do footer em relação à viewport
      const footerTopRect = footerElement.getBoundingClientRect().top;

      // 3. Calcula a posição absoluta atual de rolagem da página
      const currentScrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      // 4. Calcula a posição final desejada:
      // (Onde estamos) + (Distância até o footer) - (Altura do header para compensar)
      const targetPosition =
        currentScrollPosition + footerTopRect - headerHeight;

      // 5. Executa a rolagem suave para a posição calculada
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Fecha o menu mobile se estiver aberto
    closeMobileMenu();
  };

  return (
    <>
      {/* Adicionei um ID ao header para facilitar a seleção, embora querySelector('header') também funcione */}
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 w-full bg-linear-to-r from-pink-100 via-purple-50 to-blue-100 shadow-sm z-50"
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* LADO ESQUERDO (Mantido) */}
          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden -ml-2 p-2 rounded-lg text-slate-600 hover:bg-pink-200/50 transition-colors"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <Link
              href="/"
              className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-white shadow-sm border border-white/50 block"
            >
              <Image
                priority={true}
                src="https://res.cloudinary.com/dheamyys5/image/upload/v1769814238/logo_ox0dyy.jpg"
                alt="Logo Ray Resina"
                className="object-cover"
                fill
                sizes="48px"
                priority
              />
            </Link>

            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-800 leading-tight whitespace-nowrap">
                Ray Resina Art
              </h1>
              <span className="text-xs text-slate-500 font-medium">
                Peças Premium
              </span>
            </div>
          </div>

          {/* --- MENU DESKTOP (Mantido) --- */}
          <nav className="hidden md:flex items-center gap-8 text-slate-600 font-semibold text-sm absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="hover:text-pink-600 transition-colors">
              Início
            </Link>
            <Link
              href="/catalogo"
              className="hover:text-pink-600 transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/sobre"
              className="hover:text-pink-600 transition-colors"
            >
              Sobre
            </Link>
            {/* Link de Contato Desktop usando a nova função */}
            <a
              href="#contato-footer"
              onClick={scrollToFooter}
              className="hover:text-pink-600 transition-colors cursor-pointer"
            >
              Contato
            </a>
          </nav>

          {/* Lado Direito: Carrinho (Mantido) */}
          <div className="flex items-center relative z-10">
            <button
              aria-label="Carrinho de compras"
              onClick={openCart} // 3. ADICIONADO AQUI: Abre o carrinho ao clicar
              className="group bg-white p-2.5 rounded-xl hover:bg-pink-300 transition-all duration-200 shadow-sm relative cursor-pointer"
            >
              <Image
                priority={true}
                src="https://res.cloudinary.com/dheamyys5/image/upload/v1769814238/cart_kwv1nl.png"
                alt="Carrinho de compras"
                width={28}
                height={28}
                className="w-7 h-7 object-contain group-hover:scale-105 transition-transform duration-200"
                style={{ transform: "scaleX(-1)" }}
              />

              {/* 4. ADICIONADO AQUI: Lógica para mostrar o número apenas se tiver itens */}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- OVERLAY DO MENU MOBILE (Mantido) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>
          <nav className="fixed top-17.5 left-0 right-0 bg-white p-6 shadow-xl rounded-b-3xl border-t border-pink-50 animate-in slide-in-from-top-2 z-50">
            <ul className="flex flex-col gap-6 items-center text-slate-700 font-bold text-lg">
              <li>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="hover:text-pink-600 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  onClick={closeMobileMenu}
                  className="hover:text-pink-600 transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  onClick={closeMobileMenu}
                  className="hover:text-pink-600 transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                {/* Link de Contato Mobile usando a nova função */}
                <a
                  href="#contato-footer"
                  onClick={scrollToFooter}
                  className="hover:text-pink-600 transition-colors cursor-pointer"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
