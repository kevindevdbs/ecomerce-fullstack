"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/create-product";
import { updateProduct } from "@/app/actions/update-product"; // Importamos a nova action
import { Plus, Trash, Save } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: any; // Dados do produto para edição (opcional)
}

export default function ProductForm({
  categories,
  initialData,
}: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!initialData; // Verifica se é modo edição

  // --- ESTADOS INICIAIS (Se tiver initialData, usa ele. Se não, usa padrão vazio) ---

  const [variants, setVariants] = useState(
    initialData?.variants?.map((v: any) => ({
      name: v.name,
      colorHex: v.colorHex,
      image: v.images && v.images.length > 0 ? v.images[0] : "",
    })) || [{ name: "Padrão", colorHex: "#ffffff", image: "" }],
  );

  const [wholesale, setWholesale] = useState<any[]>(
    initialData?.wholesaleOptions?.map((w: any) => ({
      minQuantity: w.minQuantity,
      unitPrice: w.unitPrice,
    })) || [],
  );

  // --- MANIPULADORES (Iguais ao anterior) ---
  const addVariant = () =>
    setVariants([...variants, { name: "", colorHex: "#000000", image: "" }]);
  const removeVariant = (index: number) =>
    setVariants(variants.filter((_, i) => i !== index));
  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    // @ts-ignore
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addWholesale = () =>
    setWholesale([...wholesale, { minQuantity: 5, unitPrice: 0 }]);
  const removeWholesale = (index: number) =>
    setWholesale(wholesale.filter((_, i) => i !== index));
  const updateWholesale = (index: number, field: string, value: string) => {
    const newList = [...wholesale];
    newList[index][field] = value;
    setWholesale(newList);
  };

  // --- SUBMIT ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    if (isEditing) {
      // Modo Edição: Chama updateProduct com o ID
      await updateProduct(initialData.id, formData, variants, wholesale);
    } else {
      // Modo Criação: Chama createProduct normal
      await createProduct(formData, variants, wholesale);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* 1. Informações Básicas */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
          {isEditing ? `Editando: ${initialData.name}` : "Informações Básicas"}
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
              defaultValue={initialData?.name}
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
              defaultValue={initialData?.price}
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
              defaultValue={initialData?.categoryId}
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
            <input
              required
              name="image"
              type="text"
              defaultValue={initialData?.image}
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="https://..."
            />
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
            defaultValue={initialData?.shortDescription}
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Resumo..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Descrição Completa (HTML)
          </label>
          <textarea
            required
            name="fullDescription"
            rows={4}
            defaultValue={initialData?.fullDescription}
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Detalhes..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Detalhes Técnicos (1 por linha)
          </label>
          <textarea
            name="details"
            rows={3}
            defaultValue={initialData?.details?.join("\n")}
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Material: Resina..."
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            name="hasLetterSelection"
            type="checkbox"
            defaultChecked={initialData?.hasLetterSelection}
            id="letterCheck"
            className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
          />
          <label
            htmlFor="letterCheck"
            className="text-sm font-bold text-slate-700 cursor-pointer"
          >
            Exige escolha de Letra?
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

        {variants.map((variant: any, index: number) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-3 items-end bg-slate-50 p-4 rounded-xl border border-slate-200"
          >
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-slate-500">Nome</label>
              <input
                type="text"
                value={variant.name}
                onChange={(e) => updateVariant(index, "name", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="w-full md:w-24">
              <label className="text-xs font-bold text-slate-500">Cor</label>
              <input
                type="color"
                value={variant.colorHex}
                onChange={(e) =>
                  updateVariant(index, "colorHex", e.target.value)
                }
                className="h-10 w-10 cursor-pointer border-0 p-0 rounded-lg overflow-hidden"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-slate-500">
                Imagem URL
              </label>
              <input
                type="text"
                value={variant.image}
                onChange={(e) => updateVariant(index, "image", e.target.value)}
                className="w-full p-2 border rounded-lg"
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
          <h2 className="text-xl font-bold text-slate-800">Preço de Atacado</h2>
          <button
            type="button"
            onClick={addWholesale}
            className="flex items-center gap-1 text-sm font-bold text-green-600 hover:bg-green-50 px-3 py-1 rounded-full transition-colors"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {wholesale.map((item: any, index: number) => (
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
                Valor Unit. (R$)
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
          className="flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-700 hover:scale-105 transition-all shadow-xl disabled:opacity-50"
        >
          {isLoading ? (
            "Salvando..."
          ) : (
            <>
              <Save size={20} />{" "}
              {isEditing ? "Atualizar Produto" : "Cadastrar Produto"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
