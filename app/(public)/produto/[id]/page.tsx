import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductGallery from "@/app/(public)/components/product/ProductGallery";
import ProductDetailsContainer from "@/app/(public)/components/product/ProductDetailsContainer";
import ProductInfo from "@/app/(public)/components/product/ProductInfo";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/app/(public)/components/product/ProductCard";

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

  // 1. Busca os dados do produto principal
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      wholesaleOptions: {
        orderBy: { minQuantity: "asc" },
      },
    },
  });

  if (!product || !product.isVisible) {
    return notFound();
  }

  // 2. Busca produtos relacionados (dependente do produto principal)
  const relatedProductsRaw = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isVisible: true,
    },
    take: 4,
    // Precisamos buscar todos os campos para satisfazer a interface Product
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      additionalImages: true,
      shortDescription: true,
      fullDescription: true,
      details: true,
      isVisible: true,
      hasLetterSelection: true,
      wholesaleOptions: true,
      categoryId: true,
      category: {
        select: {
          id: true,
          name: true,
          image: true,
          isVisible: true,
        },
      },
    },
  });

  // Normalização para garantir compatibilidade com o tipo Product
  const relatedProducts = relatedProductsRaw.map((p) => ({
    ...p,
    image: p.image || "", // Garante string não nula
  }));
  // Normalização de Imagens
  const allImages = [product.image, ...(product.additionalImages || [])];
  const uniqueImages = Array.from(new Set(allImages)).filter(
    (img): img is string => !!img && img !== "",
  );

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

        {/* Componente reorganizado com informações estáticas */}
        <ProductInfo
          fullDescription={product.fullDescription}
          details={product.details}
        />

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
