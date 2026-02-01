import prisma from "@/lib/prisma";
import CatalogPage from "../../components/catalog/CatalogClient";

export const dynamic = "force-dynamic";

export default async function Catalogo() {
  const [productsRaw, categoriesRaw] = await Promise.all([
    prisma.product.findMany({
      where: { isVisible: true },
      orderBy: { id: "desc" },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        additionalImages: true,
        categoryId: true,
        shortDescription: true,
        fullDescription: true,
        details: true,
        isVisible: true,
        hasLetterSelection: true,
        wholesaleOptions: true,
        category: {
          select: { name: true, id: true, image: true, isVisible: true },
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

  // Normalização de dados para o Client Component
  const products = productsRaw.map((product) => ({
    ...product,
    image: product.image || "",
    category: product.category, // Já está correto pelo prisma
  }));

  const categories = categoriesRaw.map((category) => ({
    ...category,
    image: category.image || "",
  }));

  return <CatalogPage products={products} categories={categories} />;
}
