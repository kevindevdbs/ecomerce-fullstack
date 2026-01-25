// components/admin/ProductForm.tsx
"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/create-product";
import { Plus, Trash, Save, Image as ImageIcon } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Estados para listas dinâmicas
  const [variants, setVariants] = useState([
    { name: "Padrão", colorHex: "#ffffff", image: "" },
  ]);
  const [wholesale, setWholesale] = useState<any[]>([]);

  // Funções para gerenciar variantes
  const addVariant = () => {
    setVariants([...variants, { name: "", colorHex: "#000000", image: "" }]);
  };
  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };
  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    // @ts-ignore
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // Funções para gerenciar atacado
  const addWholesale = () => {
    setWholesale([...wholesale, { minQuantity: 5, unitPrice: 0 }]);
  };
  const removeWholesale = (index: number) => {
    setWholesale(wholesale.filter((_, i) => i !== index));
  };
  const updateWholesale = (index: number, field: string, value: string) => {
    const newList = [...wholesale];
    newList[index][field] = value;
    setWholesale(newList);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    // Chamamos a Server Action passando os dados extras
    await createProduct(formData, variants, wholesale);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* 1. Informações Básicas */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
          Informações Básicas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Nome do Produto
            </label>
            <input
              required
              name="name"
              type="text"
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Ex: Chaveiro Letra"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Preço (R$)
            </label>
            <input
              required
              name="price"
              type="number"
              step="0.01"
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Categoria
            </label>
            <select
              required
              name="categoryId"
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Imagem Principal (URL)
            </label>
            <div className="flex gap-2">
              <input
                required
                name="image"
                type="text"
                className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="https://..."
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cole o link da imagem aqui.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Descrição Curta
          </label>
          <input
            required
            name="shortDescription"
            type="text"
            maxLength={150}
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Resumo que aparece no card..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Descrição Completa (HTML permitido)
          </label>
          <textarea
            required
            name="fullDescription"
            rows={4}
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Detalhes do produto..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Detalhes Técnicos (1 por linha)
          </label>
          <textarea
            name="details"
            rows={3}
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Material: Resina&#10;Tamanho: 5cm&#10;Peso: 20g"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            name="hasLetterSelection"
            type="checkbox"
            id="letterCheck"
            className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
          />
          <label
            htmlFor="letterCheck"
            className="text-sm font-bold text-slate-700 cursor-pointer"
          >
            Este produto exige escolha de Letra (Ex: Chaveiro)?
          </label>
        </div>
      </div>

      {/* 2. Variantes */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-slate-800">
            Variantes / Cores
          </h2>
          <button
            type="button"
            onClick={addVariant}
            className="flex items-center gap-1 text-sm font-bold text-pink-600 hover:bg-pink-50 px-3 py-1 rounded-full transition-colors"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {variants.map((variant, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-3 items-end bg-slate-50 p-4 rounded-xl border border-slate-200"
          >
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-slate-500">
                Nome (Ex: Rosa)
              </label>
              <input
                type="text"
                value={variant.name}
                onChange={(e) => updateVariant(index, "name", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="w-full md:w-24">
              <label className="text-xs font-bold text-slate-500">
                Cor Hex
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={variant.colorHex}
                  onChange={(e) =>
                    updateVariant(index, "colorHex", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer border-0 p-0 rounded-lg overflow-hidden"
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-slate-500">
                Imagem da Variante (URL)
              </label>
              <input
                type="text"
                value={variant.image}
                onChange={(e) => updateVariant(index, "image", e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              disabled={variants.length === 1}
            >
              <Trash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* 3. Atacado */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-slate-800">
            Preço de Atacado (Opcional)
          </h2>
          <button
            type="button"
            onClick={addWholesale}
            className="flex items-center gap-1 text-sm font-bold text-green-600 hover:bg-green-50 px-3 py-1 rounded-full transition-colors"
          >
            <Plus size={16} /> Adicionar Regra
          </button>
        </div>

        {wholesale.length === 0 && (
          <p className="text-slate-400 text-sm italic">
            Nenhuma regra de atacado configurada.
          </p>
        )}

        {wholesale.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200"
          >
            <div>
              <label className="text-xs font-bold text-slate-500">
                Qtd. Mínima
              </label>
              <input
                type="number"
                value={item.minQuantity}
                onChange={(e) =>
                  updateWholesale(index, "minQuantity", e.target.value)
                }
                className="w-24 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500">
                Preço Unitário (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={item.unitPrice}
                onChange={(e) =>
                  updateWholesale(index, "unitPrice", e.target.value)
                }
                className="w-32 p-2 border rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => removeWholesale(index)}
              className="mb-1 text-red-500 hover:bg-red-50 p-2 rounded-lg"
            >
              <Trash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Botão Salvar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-40 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-700 hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            "Salvando..."
          ) : (
            <>
              <Save size={20} /> Cadastrar Produto
            </>
          )}
        </button>
      </div>
    </form>
  );
}
