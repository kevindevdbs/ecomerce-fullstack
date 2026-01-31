"use client";

import { useState, useMemo } from "react";
import ProductActions from "./ProductActions";
import QuantitySelector from "./QuantitySelector"; // Seletor que já arrumamos

interface ProductWithRelations {
  id: number;
  name: string;
  image: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  additionalImages: string[]; // Novo campo
  hasLetterSelection: boolean | null;
  wholesaleOptions: {
    id: number;
    minQuantity: number;
    unitPrice: number;
  }[];
  category: { name: string } | null;
}

interface ProductDetailsContainerProps {
  product: ProductWithRelations;
}

const ALPHABET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

export default function ProductDetailsContainer({
  product,
}: ProductDetailsContainerProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState<string>("");

  // Preço Dinâmico (Atacado)
  const currentPrice = useMemo(() => {
    if (!product.wholesaleOptions || product.wholesaleOptions.length === 0) {
      return product.price;
    }
    const options = [...product.wholesaleOptions].sort(
      (a, b) => b.minQuantity - a.minQuantity,
    );
    const activeOption = options.find((opt) => quantity >= opt.minQuantity);
    return activeOption ? activeOption.unitPrice : product.price;
  }, [product.price, product.wholesaleOptions, quantity]);

  const isLetterSelectionValid =
    !product.hasLetterSelection ||
    (product.hasLetterSelection && selectedLetter !== "");

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="pb-6 border-b border-slate-100">
        <div className="flex items-end gap-3 mb-2">
          <p className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600">
            R$ {currentPrice.toFixed(2).replace(".", ",")}
          </p>
          <span className="text-slate-400 font-medium mb-1 text-lg">
            unidade
          </span>
        </div>
        {product.shortDescription && (
          <p className="text-base text-slate-600 font-medium mb-2">
            {product.shortDescription}
          </p>
        )}
        {currentPrice < product.price && (
          <p className="text-green-600 font-bold text-sm bg-green-50 inline-block px-3 py-1 rounded-full animate-pulse">
            Opa! Preço de atacado aplicado 🎉
          </p>
        )}
      </div>

      <div className="flex flex-col gap-8 items-start">
        {/* SELETOR DE QUANTIDADE */}
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onChange={(val) => setQuantity(val)}
        />
      </div>

      {product.hasLetterSelection && (
        <div className="border-t border-slate-100 pt-6 w-full">
          <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase flex items-center gap-2">
            Personalização: Escolha a Letra
            <span className="text-pink-500 text-xs normal-case bg-pink-50 px-2 py-0.5 rounded-full">
              Obrigatório
            </span>
          </h3>
          <select
            value={selectedLetter}
            onChange={(e) => setSelectedLetter(e.target.value)}
            className="w-full md:w-64 p-4 border-2 border-slate-200 rounded-2xl bg-white font-bold cursor-pointer outline-none focus:border-pink-500"
          >
            <option value="" disabled>
              Selecione...
            </option>
            {ALPHABET.map((l) => (
              <option key={l} value={l}>
                Letra {l}
              </option>
            ))}
          </select>
          {selectedLetter === "" && (
            <p className="text-pink-600 text-sm font-medium mt-3 animate-pulse">
              Por favor, selecione a letra para continuar.
            </p>
          )}
        </div>
      )}

      {product.wholesaleOptions && product.wholesaleOptions.length > 0 && (
        <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm border border-blue-100 flex flex-col gap-2">
          <strong className="flex items-center gap-2 text-blue-700">
            📢 Descontos Progressivos:
          </strong>
          <ul className="space-y-1 ml-1">
            {product.wholesaleOptions
              .sort((a, b) => a.minQuantity - b.minQuantity)
              .map((opt) => (
                <li
                  key={opt.id}
                  className="flex justify-between items-center bg-white/50 px-3 py-1 rounded-lg"
                >
                  <span>
                    Acima de <strong>{opt.minQuantity} un.</strong>
                  </span>
                  <span className="font-bold text-blue-700">
                    R$ {opt.unitPrice.toFixed(2).replace(".", ",")}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}

      <ProductActions
        product={product}
        selectedVariantId="" // Não existe mais variante
        quantity={quantity}
        selectedLetter={selectedLetter}
        isDisabled={!isLetterSelectionValid}
      />
    </div>
  );
}
