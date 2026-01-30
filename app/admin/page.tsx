import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Package, ArrowUpRight, Pencil, Layers } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

// Garante que a página sempre busque dados novos
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Busca produtos ordenados pelo ID (mais novos primeiro)
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    include: {
      category: true,
      variants: true,
    },
  });

  return (
    // 'pt-24' empurra o conteúdo para baixo para não ficar atrás do Header Global fixo
    <div className="min-h-screen bg-slate-50 pb-20 pt-24">
      {/* Cabeçalho do Admin (NÃO é mais sticky/fixo) */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Package className="text-pink-600" size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">
              Painel de Produtos
            </h1>
          </div>

          <Link
            href="/admin/novo-produto"
            className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-pink-700 hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            Novo Produto
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* --- CARDS DE RESUMO --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card: Total de Produtos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500">
              Total de Produtos
            </p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">
              {products.length}
            </p>
          </div>

          {/* Card: Gerenciar Categorias */}
          <Link
            href="/admin/categorias"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-pink-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-bold text-slate-500 group-hover:text-pink-600 transition-colors">
                Gerenciar Categorias
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Criar, editar e excluir
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-pink-50 transition-colors">
              <Layers
                className="text-slate-400 group-hover:text-pink-600"
                size={24}
              />
            </div>
          </Link>
        </div>

        {/* --- LISTA DE PRODUTOS --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-700">Gerenciar Catálogo</h2>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p>Nenhum produto cadastrado ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Preço</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Coluna Imagem + Nome */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                Sem foto
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {product.variants.length} variações
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Coluna Categoria */}
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                          {product.category?.name || "Geral"}
                        </span>
                      </td>

                      {/* Coluna Preço */}
                      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </td>

                      {/* Coluna Ações */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {/* Ver no Site */}
                          <Link
                            href={`/produto/${product.id}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver no site"
                          >
                            <ArrowUpRight size={20} />
                          </Link>

                          {/* Editar */}
                          <Link
                            href={`/admin/editar-produto/${product.id}`}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Editar produto"
                          >
                            <Pencil size={20} />
                          </Link>

                          {/* Excluir */}
                          <DeleteProductButton
                            id={product.id}
                            name={product.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
