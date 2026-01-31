import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowLeft, Pencil, Layers } from "lucide-react";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4 self-start">
            <Link
              href="/admin"
              className="p-2 bg-white rounded-full shadow-sm hover:text-pink-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Categorias
              </h1>
              <p className="text-slate-500">
                Organize os tipos de produtos da loja.
              </p>
            </div>
          </div>

          <Link
            href="/admin/categorias/nova"
            className="flex items-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-full font-bold hover:bg-pink-700 hover:shadow-lg transition-all"
          >
            <Plus size={18} /> Nova Categoria
          </Link>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {categories.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p>Nenhuma categoria cadastrada.</p>
            </div>
          ) : (
            // --- CORREÇÃO: Div com overflow para permitir scroll no celular ---
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 min-w-150">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Imagem</th>
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Produtos</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          {cat.image ? (
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                              Sem foto
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-pink-50 text-pink-700 px-2 py-1 rounded-md text-xs font-bold">
                          {cat._count.products} itens
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/categorias/editar/${cat.id}`}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                          >
                            <Pencil size={18} />
                          </Link>
                          <DeleteCategoryButton id={cat.id} name={cat.name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
