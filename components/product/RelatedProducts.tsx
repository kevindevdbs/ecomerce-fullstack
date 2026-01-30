
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/app/prisma/client";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-24 pt-12 border-t border-slate-200">
      <SectionTitle title="Você também pode gostar" align="center" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((relatedProduct) => (
          <ProductCard
            key={relatedProduct.id}
            product={{
              ...relatedProduct,
              category: null,
            }}
          />
        ))}
      </div>
    </section>
  );
}
