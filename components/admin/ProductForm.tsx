"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/create-product";
import { updateProduct } from "@/app/actions/update-product";
import { Plus, Trash, Save, Loader2 } from "lucide-react"; // Adicionei Loader2 aqui
import ImageUpload from "./ImageUpload";

interface Category {
  id: number;
  name: string;
}
interface ProductFormProps {
  categories: Category[];
  initialData?: any;
}

export default function ProductForm({
  categories,
  initialData,
}: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!initialData;

  const [mainImage, setMainImage] = useState(initialData?.image || "");
  const [variants, setVariants] = useState(
    initialData?.variants?.map((v: any) => ({
      name: v.name,
      colorHex: v.colorHex,
      image: v.images?.[0] || "",
    })) || [{ name: "Padrão", colorHex: "#ffffff", image: "" }],
  );
  const [wholesale, setWholesale] = useState<any[]>(
    initialData?.wholesaleOptions || [],
  );

  // ... (Mantenha as funções addVariant, removeVariant, etc iguais) ...
  const addVariant = () =>
    setVariants([...variants, { name: "", colorHex: "#000000", image: "" }]);
  const removeVariant = (index: number) =>
    setVariants(variants.filter((_:any, i:any) => i !== index));
  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    // @ts-ignore
    newVariants[index][field] = value;
    setVariants(newVariants);
  };
  const addWholesale = () =>
    setWholesale([...wholesale, { minQuantity: 5, unitPrice: 0 }]);
  const removeWholesale = (index: number) =>
    setWholesale(wholesale.filter((_:any, i:any) => i !== index));
  const updateWholesale = (index: number, field: string, value: string) => {
    const newList = [...wholesale];
    newList[index][field] = value;
    setWholesale(newList);
  };
  // ... (Fim das funções auxiliares) ...

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainImage) return alert("A imagem principal é obrigatória.");

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", mainImage);

    // --- CORREÇÃO AQUI ---
    let result;

    if (isEditing) {
      result = await updateProduct(
        initialData.id,
        formData,
        variants,
        wholesale,
      );
    } else {
      result = await createProduct(formData, variants, wholesale);
    }

    // Só entra aqui se o servidor retornou { error: "..." }
    // Se o servidor fez redirect, o código abaixo nem roda pq a página muda
    if (result?.error) {
      alert(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* ... (Todo o resto do JSX do formulário continua IGUAL) ... */}

      {/* Só vou repetir o botão final para garantir que tenha o Loader */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        {/* ... Seus campos ... */}
        {/* Mantenha todo o seu JSX aqui, só estou resumindo para caber na resposta */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <ImageUpload
            label="Foto de Capa"
            value={mainImage}
            onChange={setMainImage}
          />
        </div>

        {/* Campos Nome, Preço, Categoria, Descrições... Mantenha tudo igual ao anterior */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Nome
            </label>
            <input
              required
              name="name"
              defaultValue={initialData?.name}
              className="w-full p-3 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Preço
            </label>
            <input
              required
              name="price"
              type="number"
              step="0.01"
              defaultValue={initialData?.price}
              className="w-full p-3 border rounded-xl"
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
              className="w-full p-3 border rounded-xl bg-white"
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
              Descrição Curta
            </label>
            <input
              required
              name="shortDescription"
              maxLength={150}
              defaultValue={initialData?.shortDescription}
              className="w-full p-3 border rounded-xl"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Descrição Completa
          </label>
          <textarea
            required
            name="fullDescription"
            rows={4}
            defaultValue={initialData?.fullDescription}
            className="w-full p-3 border rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Detalhes (1 por linha)
          </label>
          <textarea
            name="details"
            rows={3}
            defaultValue={initialData?.details?.join("\n")}
            className="w-full p-3 border rounded-xl"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            name="hasLetterSelection"
            type="checkbox"
            defaultChecked={initialData?.hasLetterSelection}
            id="letterCheck"
            className="w-5 h-5 text-pink-600 rounded"
          />
          <label
            htmlFor="letterCheck"
            className="text-sm font-bold text-slate-700"
          >
            Exige escolha de Letra?
          </label>
        </div>
      </div>

      {/* Variantes e Atacado - Mantenha igual */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        {/* ... código das variantes ... */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-slate-800">Variantes</h2>
          <button
            type="button"
            onClick={addVariant}
            className="flex items-center gap-1 text-sm font-bold text-pink-600"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        {variants.map((variant: any, index: number) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-6 items-start bg-slate-50 p-4 rounded-xl border border-slate-200"
          >
            <div className="w-full md:w-auto shrink-0">
              <ImageUpload
                label={`Foto ${index + 1}`}
                value={variant.image}
                onChange={(url) => updateVariant(index, "image", url)}
              />
            </div>
            <div className="flex-1 w-full space-y-3">
              <input
                value={variant.name}
                onChange={(e) => updateVariant(index, "name", e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Nome da Cor"
              />
              <input
                type="color"
                value={variant.colorHex}
                onChange={(e) =>
                  updateVariant(index, "colorHex", e.target.value)
                }
                className="h-10 w-full rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500 text-xs"
              >
                <Trash size={14} /> Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        {/* ... código do atacado ... */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-slate-800">Atacado</h2>
          <button
            type="button"
            onClick={addWholesale}
            className="flex items-center gap-1 text-sm font-bold text-green-600"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        {wholesale.map((item: any, index: number) => (
          <div key={index} className="flex gap-4">
            <input
              type="number"
              value={item.minQuantity}
              onChange={(e) =>
                updateWholesale(index, "minQuantity", e.target.value)
              }
              className="w-24 p-2 border rounded-lg"
            />
            <input
              type="number"
              step="0.01"
              value={item.unitPrice}
              onChange={(e) =>
                updateWholesale(index, "unitPrice", e.target.value)
              }
              className="w-32 p-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeWholesale(index)}
              className="text-red-500"
            >
              <Trash size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-40 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-700 shadow-xl disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Salvando...
            </>
          ) : (
            <>
              <Save size={20} /> {isEditing ? "Atualizar" : "Cadastrar"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
