import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Package,
  Pencil,
  Eye,
  LayoutGrid,
  Image as ImageIcon,
} from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    include: {
      category: true,
      // variants: true -> REMOVIDO
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Painel de Produtos
            </h1>
            <p className="text-slate-500">
              Gerencie seus produtos e categorias.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              href="/admin/categorias"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-3 rounded-full font-bold hover:bg-slate-50 transition-all"
            >
              <LayoutGrid size={18} /> Categorias
            </Link>
            <Link
              href="/admin/novo-produto"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-full font-bold hover:bg-pink-700 hover:shadow-lg transition-all"
            >
              <Plus size={18} /> Novo Produto
            </Link>
          </div>
        </div>

        {/* Stats Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total de Produtos
                </p>
                <p className="text-2xl font-black text-slate-900">
                  {products.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="bg-transparent md:bg-white md:rounded-3xl md:shadow-sm md:border md:border-slate-100 md:overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-3xl">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <p>Nenhum produto cadastrado.</p>
            </div>
          ) : (
            <>
              {/* --- VERSÃO MOBILE (CARDS) --- */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3"
                  >
                    {/* Linha 1: Imagem e Título */}
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          priority={true}
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md mt-2">
                          {product.category.name}
                        </span>
                      </div>
                    </div>

                    {/* Linha 2: Preço e Galeria */}
                    <div className="flex justify-between items-center border-t border-b border-slate-50 py-3">
                      <div>
                        <span className="text-xs text-slate-400 block">
                          Preço
                        </span>
                        <span className="font-bold text-slate-900 text-lg">
                          {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                      {product.additionalImages &&
                        product.additionalImages.length > 0 && (
                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">
                              Galeria
                            </span>
                            <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                              <ImageIcon size={14} />{" "}
                              {product.additionalImages.length} fotos
                            </span>
                          </div>
                        )}
                    </div>

                    {/* Linha 3: Ações (Botões Grandes) */}
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        href={`/produto/${product.id}`}
                        className="flex items-center justify-center p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100"
                        title="Ver no site"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/editar-produto/${product.id}`}
                        className="flex items-center justify-center p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 font-semibold"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </Link>
                      <div className="flex items-center justify-center">
                        <DeleteProductButton
                          id={product.id}
                          name={product.name}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* --- VERSÃO DESKTOP (TABELA) --- */}
              <table className="hidden md:table w-full text-left text-sm text-slate-600">
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1 max-w-[200px]">
                              {product.name}
                            </p>
                            {product.additionalImages &&
                              product.additionalImages.length > 0 && (
                                <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                  <ImageIcon size={12} />{" "}
                                  {product.additionalImages.length} fotos extras
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold">
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/produto/${product.id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            target="_blank"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/admin/editar-produto/${product.id}`}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                          >
                            <Pencil size={18} />
                          </Link>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
