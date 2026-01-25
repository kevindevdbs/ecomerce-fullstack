import prisma from "@/lib/prisma";
import CatalogPage from "../../components/catalog/CatalogClient";

// Esta linha garante que a página sempre busque dados novos se o cache for invalidado
export const dynamic = "force-dynamic";

export default async function Catalogo() {
  // 1. Buscamos os produtos DENTRO do componente
  const productsFromDb = await prisma.product.findMany({
    orderBy: {
      id: "desc", // Mostra os produtos mais novos primeiro
    },
    include: {
      variants: true,
      category: true,
    },
  });

  // 2. Formatamos os produtos
  const products = productsFromDb.map((product) => ({
    ...product,
    image: product.image || "",
    // Garante que variants seja um array, mesmo que venha null
    variants:
      product.variants?.map((variant) => ({
        ...variant,
        id: Number(variant.id),
      })) || [],
    // Garante compatibilidade se a categoria vier nula
    category: product.category || { name: "Sem Categoria" },
  }));

  // 3. Buscamos e formatamos as categorias
  const categoriesFromDb = await prisma.category.findMany();
  const categories = categoriesFromDb.map((category) => ({
    ...category,
    image: category.image || "",
    id: String(category.id),
  }));

  // 4. Retornamos a página com os dados frescos
  return <CatalogPage products={products} categories={categories} />;
}
