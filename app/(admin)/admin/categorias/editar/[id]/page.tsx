import prisma from "@/lib/prisma";
import CategoryForm from "@/app/(admin)/components/admin/CategoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface EditCatProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage(props: EditCatProps) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) notFound();

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  // Convertemos null para string vazia ou mantemos null (o form lida com isso)
  const formattedCategory = {
    ...category,
    image: category.image || null,
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin/categorias"
            className="p-2 bg-white rounded-full shadow-sm hover:text-pink-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Editar Categoria
          </h1>
        </div>
        <CategoryForm initialData={formattedCategory} />
      </div>
    </div>
  );
}
