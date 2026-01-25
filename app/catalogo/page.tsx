"use server";

import prisma from "@/lib/prisma";
import CatalogPage from "../../components/catalog/CatalogClient";

const productsFromDb = await prisma.product.findMany({
  include: {
    variants: true,
    category: true, // Inclui a categoria associada ao produto
  },
});

const products = productsFromDb.map((product) => ({
  ...product,
  variants: product.variants.map((variant) => ({
    ...variant,
    id: Number(variant.id),
  })),
}));
const categoriesFromDb = await prisma.category.findMany();
const categories = categoriesFromDb.map((category) => ({
  ...category,
  id: String(category.id),
}));

export default async function Home() {
  return <CatalogPage products={products} categories={categories} />;
}
