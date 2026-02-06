import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../../../../components/ui/SectionTitle";
import ProductCard from "../product/ProductCard";
import { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 bg-white px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">
              Favoritos
            </span>
            <SectionTitle title="Os mais amados do ateliê" className="mb-0" />
          </div>
          <Link
            href="/catalogo"
            className="group flex items-center gap-2 text-slate-600 font-bold hover:text-pink-600 transition-colors pb-2 border-b-2 border-transparent hover:border-pink-300"
          >
            Ver todos os produtos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
