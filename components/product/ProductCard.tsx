import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  // Normalização segura da categoria
  const categoryName = product.category?.name || "Sem categoria";

  // Formatador de preço com Intl
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <div
      className={`bg-white rounded-4xl p-3 md:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group border border-slate-100/80 hover:border-pink-100/80 flex flex-col relative z-0 h-full ${
        className || ""
      }`}
    >
      {/* Imagem do Produto */}
      <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-slate-50 border border-slate-100/50">
        <Link href={`/produto/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image || "/images/placeholder-product.jpg"} // Fallback mais robusto
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Badge de Categoria */}
        {categoryName && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/95 backdrop-blur-sm text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-slate-600 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-slate-100/50 shadow-sm max-w-[75%] truncate z-10">
            {categoryName}
          </span>
        )}
      </div>

      {/* Informações */}
      <div className="flex flex-col grow">
        <Link
          href={`/produto/${product.id}`}
          className="block group-hover:text-pink-600 transition-colors"
        >
          <h3 className="font-bold text-slate-800 text-base md:text-[17px] leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Descrição Curta (Visível apenas em Desktop) */}
        {product.shortDescription && (
          <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed hidden md:block">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-end justify-between font-extrabold">
          <p className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 text-xl md:text-2xl">
            {formattedPrice}
          </p>
        </div>
      </div>
    </div>
  );
}
