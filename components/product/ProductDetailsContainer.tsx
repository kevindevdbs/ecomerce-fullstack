
"use client";

import { useState } from "react";

import { Product } from "@/data/Products";
import ProductActions from "./ProductActions";
import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";

interface ProductDetailsContainerProps {
  product: Product;
}

// Lista do alfabeto para o dropdown
const ALPHABET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

export default function ProductDetailsContainer({
  product,
}: ProductDetailsContainerProps) {
  // Garante que existe pelo menos uma variante para começar
  const initialVariantId =
    product.variants.length > 0 ? product.variants[0].id : "";

  // Estados
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariantId);
  const [quantity, setQuantity] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState<string>("");

  // Validação: A seleção só é válida SE (o produto NÃO pede letra) OU (ele pede E a letra foi escolhida)
  const isLetterSelectionValid =
    !product.hasLetterSelection ||
    (product.hasLetterSelection && selectedLetter !== "");

  if (!initialVariantId) {
    return <div className="text-red-500">Erro: Produto indisponível.</div>;
  }

  // Encontra a variante selecionada para pegar o nome dela
  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId,
  );

  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="flex flex-col gap-8 items-start">
        {/* --- SELETOR DE VARIAÇÃO (CORES) --- */}
        <div className="flex-1">
          {/* --- MODIFICAÇÃO AQUI: Só mostra o texto se tiver mais de 1 opção --- */}
          {product.variants.length > 1 && selectedVariant && (
            <p className="text-sm text-slate-500 mb-2">
              Variação selecionada:{" "}
              <strong className="text-slate-700">{selectedVariant.name}</strong>
            </p>
          )}
          {/* O seletor já se esconde automaticamente se só tiver 1 opção */}
          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />
        </div>

        {/* --- SELETOR DE QUANTIDADE (PARA TODOS OS ITENS) --- */}
        <div>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </div>
      </div>

      {/* --- SELETOR DE LETRAS (SÓ PARA CHAVEIROS) --- */}
      {/* Esta área só aparece se o produto tiver hasLetterSelection: true no arquivo de dados */}
      {product.hasLetterSelection && (
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
            Personalização: Escolha a Letra
            <span className="text-pink-500 text-xs normal-case bg-pink-50 px-2 py-0.5 rounded-full">
              Obrigatório
            </span>
          </h3>
          <div className="relative">
            <select
              value={selectedLetter}
              onChange={(e) => setSelectedLetter(e.target.value)}
              className="appearance-none w-full md:w-64 p-4 pl-5 pr-10 border-2 border-slate-200 rounded-2xl bg-white text-slate-700 font-bold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 outline-none transition-all cursor-pointer"
            >
              <option value="" disabled>
                Selecione uma opção...
              </option>
              {ALPHABET.map((letter) => (
                <option key={letter} value={letter}>
                  Letra {letter}
                </option>
              ))}
            </select>
            {/* Ícone de seta para baixo no select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 md:right-[calc(100%-16rem)] text-slate-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {selectedLetter === "" && (
            <p className="text-pink-600 text-sm font-medium mt-3 animate-pulse">
              Por favor, selecione a letra para continuar.
            </p>
          )}
        </div>
      )}

      {/* AVISO DE ATACADO (SÓ PARA CHAVEIROS) */}
      {/* Esta área só aparece se o produto tiver wholesaleOptions no arquivo de dados */}
      {product.wholesaleOptions && product.wholesaleOptions.length > 0 && (
        <div className="bg-green-50 text-green-800 p-4 rounded-2xl text-sm border-2 border-green-200/70 flex items-start gap-3 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-green-600 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.006 4.869a.75.75 0 01.806 0 3.75 3.75 0 11-5.305 5.306.75.75 0 010 .807 5.25 5.25 0 104.499-6.113zM7.32 9.652a2.25 2.25 0 113.015 3.014 2.25 2.25 0 01-3.015-3.014zm6.704 4.878a2.25 2.25 0 113.014 3.015 2.25 2.25 0 01-3.014-3.015z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <strong className="block text-base mb-1">
              Oportunidade de Atacado!
            </strong>
            Compre{" "}
            <strong>{product.wholesaleOptions[0].minQuantity} unidades</strong>{" "}
            ou mais deste item e o preço cai para{" "}
            <strong className="text-green-700 underline">
              R${" "}
              {product.wholesaleOptions[0].unitPrice
                .toFixed(2)
                .replace(".", ",")}{" "}
              cada
            </strong>
            . O desconto será aplicado automaticamente no carrinho.
          </div>
        </div>
      )}

      {/* Botões de Ação (Passamos o estado e a validação) */}
      <ProductActions
        product={product}
        selectedVariantId={selectedVariantId}
        quantity={quantity}
        selectedLetter={selectedLetter}
        isDisabled={!isLetterSelectionValid}
      />
    </div>
  );
}
