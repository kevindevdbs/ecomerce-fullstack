"use client";

import { FaSearch } from "react-icons/fa";

interface EmptyStateProps {
  clearFilters: () => void;
}

export default function EmptyState({ clearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-24 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center px-6">
      <div className="bg-slate-50 p-6 rounded-full mb-6">
        <FaSearch className="w-12 h-12 text-slate-300" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3">
        Nenhum produto encontrado
      </h3>
      <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
        Não encontramos nada com esses filtros ou busca. Tente termos diferentes
        ou remova os filtros.
      </p>
      <button
        onClick={clearFilters}
        className="px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
      >
        Limpar toda a busca e filtros
      </button>
    </div>
  );
}
