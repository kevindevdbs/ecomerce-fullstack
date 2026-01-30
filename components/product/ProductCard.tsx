"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

// Definimos a interface para aceitar o objeto 'product'
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    // Aceita category como string (antigo) ou objeto (novo Prisma)
    category: string | { name: string } | null;
    [key: string]: any; // Permite outras propriedades sem erro
  };
}

// Desestruturamos { product } aqui
export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita abrir a página do produto ao clicar no carrinho
    console.log(`Produto ${product.name} adicionado ao carrinho.`);
    // Aqui você pode chamar o addItemToCart do contexto futuramente
  };

  // Lógica para pegar o nome da categoria corretamente
  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name
      : product.category || "";

  return (
    <div className="bg-white rounded-4xl p-3 md:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group border border-slate-100/80 hover:border-pink-100/80 flex flex-col relative z-0 h-full">
      {/* Imagem do Produto */}
      <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-slate-50 border border-slate-100/50">
        <Link href={`/produto/${product.id}`}>
          <Image
            src={product.image || "/default-image.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Badge de Categoria */}
        {categoryName && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[10px] uppercase tracking-wider font-bold text-slate-600 px-3 py-1.5 rounded-full border border-slate-100/50 shadow-sm">
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
        <div className="mt-auto pt-2 flex items-end justify-between font-extrabold">
          <p className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 text-xl md:text-2xl">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>
    </div>
  );
}
