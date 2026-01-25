"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// Se não tiver clsx instalado (npm install clsx), pode usar template string normal
import clsx from "clsx";

// --- CORREÇÃO AQUI NAS PROPS ---
interface ProductGalleryProps {
  images: string[]; // Agora aceita um ARRAY de strings (plural)
  productName: string;
  // Removemos 'category' que não era usada aqui
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  // Estado para a imagem selecionada atualmente
  // Inicia com a primeira imagem do array, ou string vazia se não houver
  const [selectedImage, setSelectedImage] = useState<string>(images?.[0] || "");

  // Efeito para atualizar a imagem selecionada se a lista de imagens mudar (ex: trocou de produto)
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage("");
    }
  }, [images]);

  // Se não houver imagens válidas, mostra um placeholder para não quebrar o layout
  const hasValidImage = selectedImage && selectedImage !== "";

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* --- IMAGEM PRINCIPAL GRANDE --- */}
      <div className="relative aspect-square md:aspect-auto md:h-125 rounded-4xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group">
        {hasValidImage ? (
          <Image
            src={selectedImage}
            alt={`Imagem principal de ${productName}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority // Carrega a imagem principal mais rápido
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          // Placeholder se não tiver imagem
          <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* --- MINIATURAS (THUMBNAILS) --- */}
      {/* Só mostra a lista se tiver mais de uma imagem válida */}
      {images && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x px-1">
          {images.map((img, index) => {
            // Pula imagens vazias
            if (!img) return null;

            const isSelected = selectedImage === img;

            return (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={clsx(
                  "relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start focus:outline-none focus:ring-2 focus:ring-pink-500",
                  isSelected
                    ? "border-pink-500 shadow-md shadow-pink-100 scale-105 z-10" // Estilo se selecionado
                    : "border-slate-100 hover:border-pink-300 bg-slate-50 opacity-70 hover:opacity-100", // Estilo padrão
                )}
                aria-label={`Ver imagem ${index + 1} de ${productName}`}
                aria-current={isSelected ? "true" : "false"}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1} de ${productName}`}
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
