import prisma from "@/lib/prisma";
import ProductForm from "@/app/(admin)/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage(props: EditPageProps) {
  const params = await props.params;
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    notFound();
  }

  // Busca o produto (Variants removido do include)
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      wholesaleOptions: true,
      // Variants não existe mais
    },
  });

  if (!product) {
    notFound();
  }

  // Busca categorias
  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 bg-white rounded-full shadow-sm hover:text-pink-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Editar Produto
            </h1>
            <p className="text-slate-500">Editando: {product.name}</p>
          </div>
        </div>

        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  );
}
