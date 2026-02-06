import CategoryForm from "@/app/(admin)/components/admin/CategoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
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
            Nova Categoria
          </h1>
        </div>
        <CategoryForm />
      </div>
    </div>
  );
}
