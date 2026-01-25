"use client";

import ProductCard from "../product/ProductCard";
import EmptyState from "./EmptyState";
// Removemos a importação de Product antiga e definimos uma interface mais genérica se necessário,
// ou confiamos que o ProductCard vai aceitar o objeto.

interface ProductGridProps {
  filteredProducts: any[]; // Usamos any aqui para facilitar, pois o tipo vem do server component
  category?: string;
  clearFilters: () => void;
}

export default function ProductGrid({
  filteredProducts,
  clearFilters,
}: ProductGridProps) {
  return (
    <div className="w-full lg:w-3/4">
      {/* Cabeçalho Desktop do Grid */}
      <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
        <p className="text-slate-600 font-medium">
          Mostrando {filteredProducts.length} resultados
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              // MUDANÇA AQUI: Passamos o objeto inteiro como propriedade 'product'
              product={product}
            />
          ))}
        </div>
      ) : (
        <EmptyState clearFilters={clearFilters} />
      )}
    </div>
  );
}
