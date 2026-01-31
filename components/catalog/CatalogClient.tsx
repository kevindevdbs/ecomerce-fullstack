"use client";

// Imports dos novos componentes
import CatalogHero from "./CatalogHero";
import SearchInput from "./SearchInput";
import DesktopSidebar from "./DesktopSidebar";
import ProductGrid from "./ProductGrid";
import MobileFilters from "./MobileFilters";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";

// Defina a interface Product localmente ou importe do local correto
interface Product {
  id: string | number;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  categoryId: string | number;
  price: number;
  // Variants removido
}

interface Category {
  id: string;
  name: string;
}

interface CatalogPageProps {
  products: Product[];
  categories: Category[];
}

export default function CatalogPage({
  products,
  categories,
}: CatalogPageProps) {
  // --- DADOS DINÂMICOS DO BANCO ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRange !== null ||
    searchQuery !== "";

  // --- FAIXAS DE PREÇO ---
  const priceRanges = [
    { id: "low", min: 0, max: 50 },
    { id: "medium", min: 51, max: 150 },
    { id: "high", min: 151, max: 500 },
  ];

  // --- CONFIGURAÇÃO DO FUSE.JS ---
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "shortDescription", "fullDescription"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [products]);

  // --- LÓGICA DE FILTRAGEM ---
  const filteredProducts = useMemo(() => {
    let baseProducts = products;

    if (searchQuery.trim().length > 0) {
      const searchResults = fuse.search(searchQuery);
      baseProducts = searchResults.map((result) => result.item);
    }

    return baseProducts.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(String(product.categoryId))
      ) {
        return false;
      }
      if (selectedPriceRange) {
        const range = priceRanges.find((r) => r.id === selectedPriceRange);
        if (range) {
          if (product.price < range.min || product.price > range.max) {
            return false;
          }
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategories, selectedPriceRange, fuse]);

  // --- FUNÇÕES MANIPULADORAS ---
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handlePriceChange = (rangeId: string | null) => {
    setSelectedPriceRange((prev) => (prev === rangeId ? null : rangeId));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setIsMobileFilterOpen(false);
  };

  // --- RENDERIZAÇÃO ---
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
        categoriesList={categories.map((cat) => ({
          ...cat,
          id: String(cat.id),
        }))}
      />

      <section className="container mx-auto px-6 py-12 flex items-start gap-12 relative">
        <DesktopSidebar
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedPriceRange={selectedPriceRange}
          handlePriceChange={handlePriceChange}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          categoriesList={categories.map((cat) => ({
            ...cat,
            id: String(cat.id),
          }))}
        />

        <ProductGrid
          filteredProducts={filteredProducts} // Passamos direto, sem tentar mapear variants
          clearFilters={clearFilters}
          category={
            categories.find((cat) => selectedCategories.includes(cat.name))
              ?.name
          }
        />
      </section>
    </main>
  );
}
