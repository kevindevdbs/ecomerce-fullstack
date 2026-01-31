"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  // Garantir que images seja um array válido e sem strings vazias
  const validImages = images?.filter((img) => img && img !== "") || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reseta para a primeira foto se a lista de imagens mudar (ex: mudou de produto)
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Se não tiver imagens, mostra placeholder
  if (validImages.length === 0) {
    return (
      <div className="aspect-square md:aspect-auto md:h-125 rounded-4xl bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    );
  }

  // --- NAVEGAÇÃO ---
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // --- LÓGICA DE SWIPE (ARRASTAR) ---
  const minSwipeDistance = 50; // Distância mínima para considerar um "arraste"

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full select-none">
      {/* --- ÁREA PRINCIPAL (CARROSSEL) --- */}
      <div
        className="relative aspect-square md:aspect-auto md:h-125 rounded-4xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Container Deslizante */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {validImages.map((img, index) => (
            <div key={index} className="min-w-full h-full relative">
              <Image
                src={img}
                alt={`Imagem ${index + 1} de ${productName}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                draggable={false} // Evita arrastar o elemento img nativo
              />
            </div>
          ))}
        </div>

        {/* SETAS DE NAVEGAÇÃO (Só aparecem se tiver + de 1 foto) */}
        {validImages.length > 1 && (
          <>
            {/* Seta Esquerda */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10 hidden md:flex"
              aria-label="Imagem Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Seta Direita */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10 hidden md:flex"
              aria-label="Próxima Imagem"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicador de Bolinhas (Mobile e Desktop) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {validImages.map((_, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "w-2 h-2 rounded-full transition-all shadow-sm",
                    idx === currentIndex ? "bg-white w-4" : "bg-white/50",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* --- MINIATURAS (THUMBNAILS) --- */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1 pt-1">
          {validImages.map((img, index) => {
            const isSelected = currentIndex === index;

            return (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={clsx(
                  "relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all focus:outline-none",
                  isSelected
                    ? "border-pink-500 shadow-md shadow-pink-100 scale-105 z-10"
                    : "border-slate-100 hover:border-pink-300 bg-slate-50 opacity-70 hover:opacity-100",
                )}
                aria-label={`Ir para imagem ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
