"use client";

import { ProductVariant } from "@/data/Products";
import clsx from "clsx";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  // Se só tiver uma variante, nem mostra o seletor
  if (variants.length <= 1) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
        Escolha a Variação:
      </h3>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              onClick={() => onSelect(variant.id)}
              className={clsx(
                "group relative flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border-2 transition-all",
                isSelected
                  ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm shadow-pink-100"
                  : "border-slate-200 bg-white text-slate-600 hover:border-pink-200 hover:text-pink-600",
              )}
            >
              {/* Bolinha colorida */}
              <span
                className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: variant.colorHex }}
              ></span>
              <span className="font-bold text-sm">{variant.name}</span>

              {/* Anel de seleção externo */}
              {isSelected && (
                <span className="absolute -inset-1 rounded-full border-2 border-pink-500/30 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
