import prisma from "@/lib/prisma";
import CatalogPage from "../../components/catalog/CatalogClient";

export const dynamic = "force-dynamic";

export default async function Catalogo() {
  const productsFromDb = await prisma.product.findMany({
    where: { isVisible: true }, // <--- FILTRO
    orderBy: {
      id: "desc",
    },
    include: {
      category: true,
    },
  });

  const products = productsFromDb.map((product) => ({
    ...product,
    image: product.image || "",
    category: product.category || { name: "Sem Categoria" },
  }));

  const categoriesFromDb = await prisma.category.findMany({
    where: { isVisible: true }, // <--- FILTRO
  });
  const categories = categoriesFromDb.map((category) => ({
    ...category,
    image: category.image || "",
    id: String(category.id),
  }));

  return <CatalogPage products={products} categories={categories} />;
}
