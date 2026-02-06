"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const validImages = images?.filter((img) => img && img !== "") || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estados do Lightbox (Tela Cheia)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Estados de Swipe (Arrastar)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reseta ao trocar de produto
  useEffect(() => {
    setCurrentIndex(0);
    setIsLightboxOpen(false);
    setIsZoomed(false);
  }, [images]);

  // Bloqueia o scroll da página quando o lightbox está aberto
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLightboxOpen]);

  // Navegação por Teclado
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    },
    [isLightboxOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (validImages.length === 0) return null;

  // --- FUNÇÕES DE NAVEGAÇÃO ---
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  const openLightbox = () => setIsLightboxOpen(true);

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  // Efeito de "Lupa" (Mover a imagem com o mouse quando zoom ativado)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // --- SWIPE LOGIC ---
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextImage();
    else if (distance < -minSwipeDistance) prevImage();
  };

  return (
    <>
      {/* --- GALERIA PRINCIPAL (PÁGINA) --- */}
      <div className="flex flex-col gap-4 h-full select-none group/gallery">
        <div
          className="relative aspect-square md:aspect-auto md:h-125 rounded-4xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm cursor-zoom-in"
          onClick={openLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Imagem Atual */}
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {validImages.map((img, index) => (
              <div key={index} className="min-w-full h-full relative">
                <Image
                  src={img}
                  alt={`${productName} - Foto ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Botão Flutuante "Expandir" */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-700 p-2 rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-opacity pointer-events-none">
            <Maximize2 size={20} />
          </div>

          {/* Setas (Desktop) */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-all hover:scale-110 hidden md:flex"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-all hover:scale-110 hidden md:flex"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicadores (Dots) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none">
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
        </div>

        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1 pt-1">
            {validImages.map((img, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={clsx(
                  "relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all focus:outline-none",
                  currentIndex === index
                    ? "border-pink-500 shadow-md scale-105"
                    : "border-slate-100 opacity-70 hover:opacity-100",
                )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX (MODAL TELA CHEIA) --- */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={closeLightbox} // Fecha ao clicar fora
        >
          {/* Botão Fechar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 bg-black/50 hover:bg-white/20 rounded-full transition-all z-50"
          >
            <X size={32} />
          </button>

          {/* Área da Imagem Central */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar na área da imagem
          >
            <div
              className={clsx(
                "relative w-full h-full flex items-center justify-center transition-all duration-300",
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
              )}
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={validImages[currentIndex]}
                alt={productName}
                fill
                quality={100} // Qualidade máxima no zoom
                className={clsx(
                  "transition-transform duration-200 ease-out",
                  isZoomed ? "object-cover scale-150" : "object-contain",
                )}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }
                    : undefined
                }
              />
            </div>
          </div>

          {/* Controles de Navegação (Lightbox) */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50"
              >
                <ChevronLeft size={48} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          {/* Indicador de Zoom (Dica Visual) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm pointer-events-none flex items-center gap-2">
            {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            {isZoomed ? "Clique para reduzir" : "Clique para ampliar"}
          </div>

          {/* Miniaturas no Lightbox (Opcional - só em telas grandes) */}
          <div className="absolute bottom-6 right-6 hidden lg:flex gap-2 z-50">
            <span className="text-white/80 font-mono text-lg bg-black/40 px-3 py-1 rounded-lg backdrop-blur">
              {currentIndex + 1} / {validImages.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
