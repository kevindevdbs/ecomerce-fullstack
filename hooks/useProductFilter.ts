import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Product } from "@/types";

export const PRICE_RANGES = [
  { id: "low", min: 0, max: 50, label: "Até R$ 50" },
  { id: "medium", min: 51, max: 150, label: "R$ 51 - R$ 150" },
  { id: "high", min: 151, max: 500, label: "R$ 151 - R$ 500" },
];

export function useProductFilter(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Memoize Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "shortDescription", "fullDescription"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [products]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Search
    if (searchQuery.trim().length > 0) {
      const searchResults = fuse.search(searchQuery);
      result = searchResults.map((r) => r.item);
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(String(p.categoryId)),
      );
    }

    // 3. Price Filter
    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(
          (p) => p.price >= range.min && p.price <= range.max,
        );
      }
    }

    return result;
  }, [products, searchQuery, selectedCategories, selectedPriceRange, fuse]);

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

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRange !== null ||
    searchQuery !== "";

  return {
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
  };
}
