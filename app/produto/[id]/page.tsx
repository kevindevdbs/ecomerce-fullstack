import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Truck, ShieldCheck, Gift } from "lucide-react";

import prisma from "@/lib/prisma";

import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import ProductDetailsContainer from "@/components/product/ProductDetailsContainer";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    notFound();
  }

  // 1. Busca o produto com TODAS as relações necessárias
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      variants: true,
      wholesaleOptions: true,
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  // --- LOGS DE DIAGNÓSTICO (Aparecem no terminal do VS Code) ---
  console.log("========================================");
  console.log(`🔎 PRODUTO CARREGADO: ${product.name}`);

  // 2. Lógica Reforçada de Extração de Imagens
  const mainImage = product.image ? [product.image] : [];
  const variantImages = product.variants.flatMap((v) => v.images || []);

  // Junta tudo e remove vazios/nulos
  const allImages = [...mainImage, ...variantImages].filter(
    (img) => img !== null && img !== undefined && img !== "",
  );

  console.log(`📸 Total de imagens: ${allImages.length}`);
  console.log("========================================");

  // 3. Busca produtos relacionados (mesma categoria)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: {
        id: product.id,
      },
    },
    take: 4,
    include: {
      variants: true,
      category: true,
      wholesaleOptions: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pb-20">
        {/* --- BREADCRUMB / VOLTAR --- */}
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/catalogo"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-pink-600 transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Voltar para o catálogo
          </Link>
        </div>

        {/* --- SEÇÃO PRINCIPAL DO PRODUTO --- */}
        <section className="container mx-auto px-4 sm:px-6 mb-16">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100/50 p-6 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 relative overflow-hidden">
            {/* Decorativo de fundo */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-radial-gradient(from top right, var(--tw-gradient-stops)) from-pink-50/80 via-purple-50/30 to-transparent opacity-70 -z-10 pointer-events-none blur-3xl"></div>

            {/* === COLUNA DA ESQUERDA: GALERIA === */}
            <div>
              <ProductGallery images={allImages} productName={product.name} />
            </div>

            {/* === COLUNA DA DIREITA: INFORMAÇÕES E COMPRA === */}
            <div className="flex flex-col">
              {/* Categoria */}
              <span className="inline-block text-sm font-bold tracking-wider text-pink-600 uppercase bg-pink-100 px-4 py-1.5 rounded-full self-start mb-6">
                {product.category?.name || "Geral"}
              </span>

              {/* Título */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Descrição Curta */}
              <p className="text-slate-600 text-lg leading-relaxed font-medium mb-2">
                {product.shortDescription}
              </p>

              {/* COMPONENTE INTERATIVO (Preço, Cores, Quantidade, Botões) */}
              {/* Passamos o objeto completo. O 'as any' é temporário para facilitar a tipagem do Prisma vs Interface Manual */}
              <ProductDetailsContainer product={product as any} />

              {/* ÍCONES DE BENEFÍCIOS */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-100">
                <div className="flex flex-col items-center text-center gap-3 group">
                  <div className="bg-pink-50 p-4 rounded-2xl text-pink-500 group-hover:scale-110 transition-transform">
                    <Truck size={28} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    Envia para todo Brasil
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 group">
                  <div className="bg-purple-50 p-4 rounded-2xl text-purple-500 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    Compra 100% Segura
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 group">
                  <div className="bg-blue-50 p-4 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                    <Gift size={28} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    Embalagem Especial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- DESCRIÇÃO COMPLETA --- */}
        <section className="container mx-auto px-4 sm:px-6 mb-16">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 prose prose-slate max-w-none prose-headings:font-bold prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-img:rounded-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">
              Descrição do Produto
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />

            {product.details && product.details.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-6">
                  Detalhes Técnicos
                </h3>
                <ul className="not-prose space-y-3">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 mt-2 shrink-0"></span>
                      <span className="text-slate-700 font-medium text-lg">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {/* --- PRODUTOS RELACIONADOS --- */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 text-sm font-bold tracking-wider text-purple-600 uppercase bg-purple-100 px-4 py-1.5 rounded-full">
                Combine com
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                Você também pode gostar
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProduct) => (
                // Passamos o produto inteiro para o card atualizado
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct as any}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
