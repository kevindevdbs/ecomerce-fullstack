import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetailsContainer from "@/components/product/ProductDetailsContainer";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";


export const revalidate = 3600; 
export const dynamicParams = true;

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
      wholesaleOptions: {
        orderBy: { minQuantity: "asc" },
      },
    },
  });

  // VERIFICAÇÃO DE VISIBILIDADE
  // Se não existir OU se não estiver visível -> 404
  if (!product || !product.isVisible) {
    return notFound();
  }

  const allImages = [product.image, ...(product.additionalImages || [])];

  const uniqueImages = Array.from(new Set(allImages)).filter(
    (img) => img && img !== "",
  );

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isVisible: true, // <--- Produtos relacionados também só se forem visíveis
    },
    take: 4,
    include: { category: true },
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="w-full">
              <ProductGallery
                images={uniqueImages}
                productName={product.name}
              />
            </div>
            <div className="flex flex-col">
              <ProductDetailsContainer product={product} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-pink-600 rounded-full block"></span>
            Descrição do Produto
          </h2>
          <div className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
            {product.fullDescription}
          </div>

          {product.details && product.details.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Detalhes e Especificações
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-600 text-lg"
                  >
                    <span className="mt-2 w-1.5 h-1.5 bg-pink-500 rounded-full shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
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
