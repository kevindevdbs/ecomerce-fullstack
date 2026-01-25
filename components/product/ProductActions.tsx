"use client";

import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

// Interface simplificada compatível com o Prisma e com o que o CartContext espera
interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  // Permitimos outros campos (como category, variants) passarem sem erro
  [key: string]: any;
}

interface ProductActionsProps {
  product: ProductProps;
  selectedVariantId: string;
  quantity: number;
  selectedLetter?: string;
  isDisabled?: boolean;
}

export default function ProductActions({
  product,
  selectedVariantId,
  quantity,
  selectedLetter,
  isDisabled = false,
}: ProductActionsProps) {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    if (isDisabled) return;

    // Chama o contexto.
    // OBS: Se o seu CartContext precisar da "selectedLetter", você precisará
    // atualizar a função addItemToCart no Context também.
    // Por enquanto, mandamos como estava antes.
    addItemToCart(product, quantity, selectedVariantId);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      {/* Botão Adicionar ao Carrinho */}
      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-full shadow-lg transition-all group ${
          isDisabled
            ? "bg-slate-300 cursor-not-allowed shadow-none"
            : "bg-linear-to-r from-pink-500 to-purple-600 shadow-pink-200/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        <FaShoppingCart
          className="w-5 h-5 group-hover:rotate-12 transition-transform"
          style={{ transform: "scaleX(-1)" }}
        />
        {isDisabled ? "Selecione as opções" : "Adicionar ao Carrinho"}
      </button>

      {/* Botão Dúvidas (WhatsApp) */}
      <a
        href={`https://wa.me/5511999999999?text=Olá, tenho uma dúvida sobre o produto: ${product.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-green-500 text-green-600 font-bold text-lg rounded-full hover:bg-green-50 transition-colors"
      >
        <FaWhatsapp className="w-5 h-5" />
        Tenho Dúvidas
      </a>
    </div>
  );
}
