"use client";

import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { Product } from "@/data/Products";
// --- IMPORTANTE: O HOOK DO CARRINHO ---
import { useCart } from "@/context/CartContext";

// Atualizamos a interface para receber os dados da seleção que vêm do Container pai
interface ProductActionsProps {
  product: Product;
  selectedVariantId: string;
  quantity: number;
  selectedLetter?: string;
  isDisabled?: boolean;
}

export default function ProductActions({
  product,
  selectedVariantId,
  quantity,
}: ProductActionsProps) {
  // Pegamos a função de adicionar do nosso contexto
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    // --- AQUI ESTÁ A MÁGICA ---
    // Chama a função do contexto passando o produto, a quantidade e a variante
    addItemToCart(product, quantity, selectedVariantId);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      {/* Botão Adicionar ao Carrinho */}
      <button
        onClick={handleAddToCart} // <-- Agora chama a função real
        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group"
      >
        <FaShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" style={{ transform: "scaleX(-1)" }} />
        Adicionar ao Carrinho
      </button>

      {/* Botão Dúvidas (WhatsApp) - Mantido */}
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
