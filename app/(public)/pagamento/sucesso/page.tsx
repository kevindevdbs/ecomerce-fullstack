"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export default function PagamentoSucessoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  useEffect(() => {
    // Limpa o carrinho após pagamento bem-sucedido
    if (status === "approved") {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
          Pagamento Confirmado!
        </h1>

        <p className="text-slate-600 mb-8">
          Seu pedido foi processado com sucesso. Em breve você receberá a
          confirmação por e-mail.
        </p>

        {paymentId && (
          <div className="bg-slate-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-slate-500 mb-1">ID do Pagamento</p>
            <p className="text-lg font-mono font-bold text-slate-800">
              {paymentId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg"
          >
            Voltar ao Início
          </button>
          <button
            onClick={() => router.push("/catalogo")}
            className="flex-1 py-3 border-2 border-purple-500 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all"
          >
            Ver Mais Produtos
          </button>
        </div>
      </div>
    </div>
  );
}
