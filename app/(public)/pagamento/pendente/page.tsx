"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaClock } from "react-icons/fa";

export default function PagamentoPendentePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("payment_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
            <FaClock className="text-yellow-500 text-5xl" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
          Pagamento Pendente
        </h1>

        <p className="text-slate-600 mb-8">
          Seu pagamento está sendo processado. Você receberá uma confirmação
          assim que for aprovado. Isso pode levar alguns minutos.
        </p>

        {paymentId && (
          <div className="bg-slate-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-slate-500 mb-1">ID do Pagamento</p>
            <p className="text-lg font-mono font-bold text-slate-800">
              {paymentId}
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Guarde o ID do pagamento para consultas
            futuras.
          </p>
        </div>

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
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
