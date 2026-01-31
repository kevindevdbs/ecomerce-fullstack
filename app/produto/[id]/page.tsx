import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetailsContainer from "@/components/product/ProductDetailsContainer";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      variants: true,
      wholesaleOptions: {
        orderBy: { minQuantity: "asc" },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  // --- CORREÇÃO AQUI: PREPARANDO AS IMAGENS PARA A GALERIA ---
  // Criamos uma lista única contendo a imagem principal + imagens das variações
  const allImages = [product.image];

  if (product.variants.length > 0) {
    product.variants.forEach((variant) => {
      if (variant.images && variant.images.length > 0) {
        allImages.push(...variant.images);
      }
    });
  }

  // Filtra para remover itens vazios e duplicados (limpeza)
  const uniqueImages = Array.from(new Set(allImages)).filter(
    (img) => img && img !== "",
  );

  // Buscar produtos relacionados
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    include: { category: true, variants: true },
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Bloco Principal */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Esquerda: Galeria Corrigida */}
            <div className="w-full">
              <ProductGallery
                images={uniqueImages} // Agora passamos o array certo
                productName={product.name}
                
              />
            </div>

            {/* Direita: Detalhes */}
            <div className="flex flex-col">
              <ProductDetailsContainer product={product} />
            </div>
          </div>
        </div>

        {/* Descrição Completa */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-pink-600 rounded-full block"></span>
            Descrição do Produto
          </h2>

          <div className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
            {product.fullDescription}
          </div>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            {/* Agora o subtitle vai funcionar sem erro */}
            <SectionTitle
              title="Você também pode gostar"
              subtitle="Veja outros itens que combinam com sua escolha"
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
