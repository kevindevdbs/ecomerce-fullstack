import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  return (
    // ADICIONADO: pt-28 (substituindo py-10 no topo)
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
              Novo Produto
            </h1>
            <p className="text-slate-500">
              Preencha os dados abaixo para cadastrar no catálogo.
            </p>
          </div>
        </div>

        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
