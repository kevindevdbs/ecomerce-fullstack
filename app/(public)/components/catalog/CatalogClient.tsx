"use client";

import CatalogHero from "./CatalogHero";
import SearchInput from "./SearchInput";
import DesktopSidebar from "./DesktopSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./MobileFilters";
import { useProductFilter } from "@/hooks/useProductFilter";
import { Product, Category } from "@/types";

interface CatalogPageProps {
  products: Product[];
  categories: Category[];
}

export default function CatalogPage({
  products,
  categories,
}: CatalogPageProps) {
  // Custom Hook que encapsula toda a lógica de filtro
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    selectedPriceRange,
    handlePriceChange,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    filteredProducts,
    clearFilters,
    hasActiveFilters,
  } = useProductFilter(products);

  // Normalizando categorias para o formato string esperado pelos componentes de filtro
  // Isso poderia ser refatorado nos componentes filhos para aceitar numbers também
  const categoriesListStr = categories.map((cat) => ({
    ...cat,
    id: String(cat.id),
  }));

  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden">
      <section className="pt-32 pb-16 bg-linear-to-b from-pink-50 via-purple-50 to-slate-50 px-6 text-center">
        <CatalogHero />
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </section>

      <MobileFilters
        isMobileFilterOpen={isMobileFilterOpen}
        setIsMobileFilterOpen={setIsMobileFilterOpen}
        resultsCount={filteredProducts.length}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        selectedPriceRange={selectedPriceRange}
        handlePriceChange={handlePriceChange}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        categoriesList={categoriesListStr}
      />

      <section className="container mx-auto px-6 py-12 flex items-start gap-12 relative">
        <DesktopSidebar
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedPriceRange={selectedPriceRange}
          handlePriceChange={handlePriceChange}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          categoriesList={categoriesListStr}
        />

        <ProductGrid
          filteredProducts={filteredProducts}
          clearFilters={clearFilters}
          category={
            categories.find((cat) =>
              selectedCategories.includes(String(cat.id)),
            )?.name
          }
        />
      </section>
    </main>
  );
}
