import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
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

  // LOG PARA DESCOBRIR O PROBLEMA (Olhe no terminal do VS Code)
  console.log("--- TENTANDO EDITAR ---");
  console.log("ID recebido na URL:", params.id);

  const productId = parseInt(params.id);

  // Se o ID não for número, avisa no log
  if (isNaN(productId)) {
    console.error("ERRO: O ID na URL não é um número válido.");
    notFound();
  }

  console.log("ID convertido para número:", productId);

  // Busca o produto
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      variants: true,
      wholesaleOptions: true,
    },
  });

  if (!product) {
    console.error("ERRO: Produto não encontrado no banco com esse ID.");
    notFound();
  }

  console.log("Produto encontrado:", product.name);

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
