"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";

export default function PagamentoFalhaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <FaTimesCircle className="text-red-500 text-5xl" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
          Pagamento Não Concluído
        </h1>

        <p className="text-slate-600 mb-8">
          Não foi possível processar seu pagamento. Por favor, tente novamente
          ou escolha outro método de pagamento.
        </p>

        {paymentId && (
          <div className="bg-slate-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-slate-500 mb-1">ID da Tentativa</p>
            <p className="text-lg font-mono font-bold text-slate-800">
              {paymentId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/catalogo")}
            className="flex-1 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg"
          >
            Tentar Novamente
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 border-2 border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
