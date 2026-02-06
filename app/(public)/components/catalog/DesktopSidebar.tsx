"use client";

import { FaFilter, FaChevronDown } from "react-icons/fa";

interface DesktopSidebarProps {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  selectedPriceRange: string | null;
  handlePriceChange: (id: string | null) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  categoriesList: Category[];
}

interface Category {
  id: string;
  name: string;
}

export default function DesktopSidebar({
  selectedCategories,
  toggleCategory,
  selectedPriceRange,
  handlePriceChange,
  clearFilters,
  hasActiveFilters,
  categoriesList,
}: DesktopSidebarProps) {
  const priceRanges = [
    { id: "low", min: 0, max: 50 },
    { id: "medium", min: 51, max: 150 },
    { id: "high", min: 151, max: 500 },
  ];

  return (
    <aside className="hidden lg:block w-1/4 sticky top-36">
      <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FaFilter className="text-pink-500" /> Filtros
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-pink-600 hover:text-purple-600 font-semibold hover:underline transition-all"
            >
              Limpar tudo
            </button>
          )}
        </div>

        {/* Filtro: Categorias */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between uppercase text-sm tracking-wider">
            Categorias <FaChevronDown className="text-slate-300 w-3 h-3" />
          </h3>
          <ul className="space-y-3">
            {categoriesList.map((cat: Category) => (
              <li key={cat.id}>
                <label className="flex items-center cursor-pointer group select-none">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mr-3 transition-all box-border ${selectedCategories.includes(cat.id) ? "bg-pink-500 border-pink-500 shadow-sm shadow-pink-200" : "border-slate-200 bg-slate-50 group-hover:border-pink-300"}`}
                  >
                    {selectedCategories.includes(cat.id) && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <span
                    className={`text-slate-600 group-hover:text-pink-600 transition-colors text-sm ${selectedCategories.includes(cat.id) ? "font-bold text-slate-800" : "font-medium"}`}
                  >
                    {cat.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filtro: Preço */}
        <div>
          <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between uppercase text-sm tracking-wider">
            Faixa de Preço <FaChevronDown className="text-slate-300 w-3 h-3" />
          </h3>
          <ul className="space-y-3">
            {priceRanges.map((range) => (
              <li key={range.id}>
                <label className="flex items-center cursor-pointer group select-none">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all box-border ${selectedPriceRange === range.id ? "border-purple-500 shadow-sm shadow-purple-200" : "border-slate-200 bg-slate-50 group-hover:border-purple-300"}`}
                  >
                    {selectedPriceRange === range.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="priceRange"
                    className="hidden"
                    checked={selectedPriceRange === range.id}
                    onChange={() => handlePriceChange(range.id)}
                  />
                  <span
                    className={`text-slate-600 group-hover:text-purple-600 transition-colors text-sm ${selectedPriceRange === range.id ? "font-bold text-slate-800" : "font-medium"}`}
                  >
                    R${range.min} - R${range.max}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
