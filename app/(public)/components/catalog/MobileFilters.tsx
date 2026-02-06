"use client";

import { FaFilter, FaTimes } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

// Definindo os tipos das props que este componente precisa receber
interface MobileFiltersProps {
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (isOpen: boolean) => void;
  resultsCount: number;
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  selectedPriceRange: string | null;
  handlePriceChange: (id: string | null) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  categoriesList: Category[];
}

export default function MobileFilters({
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  resultsCount,
  selectedCategories,
  toggleCategory,
  selectedPriceRange,
  handlePriceChange,
  clearFilters,
  hasActiveFilters,
  categoriesList,
}: MobileFiltersProps) {

    const priceRanges = [
      { id: "low", min: 0, max: 50 },
      { id: "medium", min: 51, max: 150 },
      { id: "high", min: 151, max: 500 },
    ];

  return (
    <>
      {/* --- BARRA FIXA NO TOPO (STICKY BAR) --- */}
      <div className="lg:hidden sticky top-17.5 z-30 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm transition-all">
        <span className="text-slate-600 font-medium text-sm">
          {resultsCount} produtos encontrados
        </span>
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-pink-100 text-slate-700 px-4 py-2 rounded-full font-bold text-sm transition-colors"
        >
          <FaFilter className="text-pink-500" /> Filtros
          {hasActiveFilters && (
            <span className="bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              !
            </span>
          )}
        </button>
      </div>

      {/* --- GAVETA DESLIZANTE (DRAWER) --- */}
      {/* Overlay Escuro */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 backdrop-blur-sm ${isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileFilterOpen(false)}
      ></div>

      {/* Conteúdo da Gaveta */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${isMobileFilterOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FaFilter className="text-pink-500" /> Filtros
          </h2>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-pink-50 hover:text-pink-500 transition-all"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-10">
          {/* Filtro Categorias Mobile */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">
              Categorias
            </h3>
            <ul className="space-y-1">
              {categoriesList.map((cat) => (
                <li key={cat.id}>
                  <label
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors cursor-pointer ${selectedCategories.includes(cat.id) ? "bg-pink-50" : "hover:bg-slate-50"}`}
                  >
                    <span
                      className={`text-slate-700 font-medium ${selectedCategories.includes(cat.id) ? "text-pink-700 font-bold" : ""}`}
                    >
                      {cat.name}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedCategories.includes(cat.id) ? "bg-pink-500 border-pink-500" : "border-slate-300"}`}
                    >
                      {selectedCategories.includes(cat.id) && (
                        <span className="text-white text-sm font-bold">✓</span>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="hidden"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {/* Filtro Preço Mobile */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">
              Faixa de Preço
            </h3>
            <ul className="space-y-1">
              {priceRanges.map((range) => (
                <li key={range.id}>
                  <label
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors cursor-pointer ${selectedPriceRange === range.id ? "bg-purple-50" : "hover:bg-slate-50"}`}
                  >
                    <span
                      className={`text-slate-700 font-medium ${selectedPriceRange === range.id ? "text-purple-700 font-bold" : ""}`}
                    >
                        R$ {range.min} - R$ {range.max}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPriceRange === range.id ? "border-purple-500" : "border-slate-300"}`}
                    >
                      {selectedPriceRange === range.id && (
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="priceRangeMobile"
                      checked={selectedPriceRange === range.id}
                      onChange={() => handlePriceChange(range.id)}
                      className="hidden"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botões de Ação Mobile */}
        <div className="mt-12 sticky bottom-0 bg-white/95 backdrop-blur-sm pt-4 pb-2 border-t border-slate-100 flex gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex-1 py-3.5 border-2 border-slate-200 text-slate-600 font-bold rounded-full hover:bg-slate-50 transition-colors"
            >
              Limpar
            </button>
          )}
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="flex-2 py-3.5 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-md active:scale-[0.98] transition-transform"
          >
            Ver resultados
          </button>
        </div>
      </div>
    </>
  );
}
