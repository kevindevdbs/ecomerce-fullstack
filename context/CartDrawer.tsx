"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    getItemPrice, // Usamos a nova função
  } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <ShoppingBag className="text-pink-500" />
            Seu Carrinho
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={40} className="text-slate-300" />
              <p className="text-slate-500 font-medium">
                Seu carrinho está vazio
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              // Calculamos o preço unitário atual para este item
              const currentUnit = getItemPrice(item);
              const hasDiscount = currentUnit < item.product.price;

              return (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-3 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_8px_rgb(0,0,0,0.04)]"
                >
                  {/* Imagem */}
                  <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <Image
                      priority={true}
                      src={
                        item.variantImage ||
                        item.product.image ||
                        "/default.jpg"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {item.product.name}
                      </h3>
                      {item.variantName && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          Variação: {item.variantName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-col">
                        {/* Se tiver desconto, mostra o antigo riscado */}
                        {hasDiscount && (
                          <span className="text-[10px] text-slate-400 line-through">
                            R$ {item.product.price.toFixed(2).replace(".", ",")}
                          </span>
                        )}
                        <p
                          className={`text-sm font-bold ${hasDiscount ? "text-green-600" : "text-pink-600"}`}
                        >
                          R$ {currentUnit.toFixed(2).replace(".", ",")}
                        </p>
                      </div>

                      {/* Controles */}
                      <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          disabled={item.quantity <= 1}
                          className="text-slate-400 hover:text-pink-600 disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="text-slate-400 hover:text-pink-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="self-start text-slate-300 hover:text-red-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-2xl font-extrabold text-slate-800">
                R$ {cartTotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button
              className="w-full py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
              onClick={() => {
                const message = `Olá! Gostaria de finalizar meu pedido.\n\nItens:\n${cartItems
                  .map(
                    (i) =>
                      `- ${i.quantity}x ${i.product.name}\n  Preço Un: R$ ${getItemPrice(i).toFixed(2)}`,
                  )
                  .join("\n")}\n\nTotal Final: R$ ${cartTotal.toFixed(2)}\n\nAguardo o retorno. Muito obrigado!`;

                window.open(
                  `https://wa.me/5531994773257?text=${encodeURIComponent(message)}`,
                  "_blank",
                );
              }}
            >
              Finalizar no WhatsApp <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
