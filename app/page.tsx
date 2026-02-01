import prisma from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryGrid from "@/components/home/CategoryGrid";

export default async function Home() {
  // Executando queries em paralelo para melhor performance
  const [productsRaw, categoriesRaw] = await Promise.all([
    prisma.product.findMany({
      where: { isVisible: true },
      take: 8,
      orderBy: { id: "desc" },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        shortDescription: true,
        fullDescription: true,
        additionalImages: true,
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
    }),
    prisma.category.findMany({
      where: { isVisible: true },
      select: {
        id: true,
        name: true,
        image: true,
        isVisible: true,
      },
    }),
  ]);

  // Normalizando dados para os componentes
  // O tipo inferido aqui deve ser compatível com Product do @/types
  // Como prisma retorna null para relations opcionais e nosso type espera, estamos ok.
  const products = productsRaw;

  // Normalizando categorias
  const categories = categoriesRaw.map((category) => ({
    ...category,
    image: category.image || "",
  }));

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={products} />
      <CategoryGrid categories={categories} />
    </>
  );
}
