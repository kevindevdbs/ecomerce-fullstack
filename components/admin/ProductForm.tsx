"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/create-product";
import { updateProduct } from "@/app/actions/update-product";
import { Plus, Trash, Save, Loader2, Image as ImageIcon } from "lucide-react";
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
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    initialData?.additionalImages || [],
  );
  const [wholesale, setWholesale] = useState<any[]>(
    initialData?.wholesaleOptions || [],
  );

  const addGalleryImage = () => setAdditionalImages([...additionalImages, ""]);
  const removeGalleryImage = (index: number) =>
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  const updateGalleryImage = (index: number, url: string) => {
    const newImages = [...additionalImages];
    newImages[index] = url;
    setAdditionalImages(newImages);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainImage) return alert("A imagem principal é obrigatória.");

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", mainImage);

    const validGallery = additionalImages.filter(
      (img) => img && img.trim() !== "",
    );

    let result;
    if (isEditing) {
      result = await updateProduct(
        initialData.id,
        formData,
        validGallery,
        wholesale,
      );
    } else {
      result = await createProduct(formData, validGallery, wholesale);
    }

    if (result?.error) {
      alert(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <h3 className="font-bold text-slate-700 mb-3">
            Foto de Capa (Principal)
          </h3>
          <ImageUpload label="Capa" value={mainImage} onChange={setMainImage} />
        </div>

        {/* Switch de Visibilidade */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              name="isVisible"
              id="isVisible"
              defaultChecked={initialData ? initialData.isVisible : true}
              className="peer absolute w-0 h-0 opacity-0"
            />
            <label
              htmlFor="isVisible"
              className="block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer peer-checked:bg-green-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6"
            ></label>
          </div>
          <label
            htmlFor="isVisible"
            className="text-sm font-bold text-slate-700 cursor-pointer select-none"
          >
            Produto Visível no Site?
            <span className="block text-xs font-normal text-slate-500">
              Se desmarcado, apenas o admin poderá ver.
            </span>
          </label>
        </div>

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

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="text-pink-600" /> Galeria de Fotos
          </h2>
          <button
            type="button"
            onClick={addGalleryImage}
            className="flex items-center gap-1 text-sm font-bold text-pink-600 hover:bg-pink-50 px-3 py-1 rounded-full transition-colors"
          >
            <Plus size={16} /> Adicionar Foto
          </button>
        </div>

        {additionalImages.length === 0 && (
          <p className="text-slate-400 text-center py-4 italic">
            Nenhuma foto extra adicionada.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalImages.map((imgUrl, index) => (
            <div
              key={index}
              className="relative group bg-slate-50 p-2 rounded-xl border border-slate-200"
            >
              <ImageUpload
                label={`Foto ${index + 1}`}
                value={imgUrl}
                onChange={(url) => updateGalleryImage(index, url)}
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors z-10"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
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
              placeholder="Qtd"
            />
            <input
              type="number"
              step="0.01"
              value={item.unitPrice}
              onChange={(e) =>
                updateWholesale(index, "unitPrice", e.target.value)
              }
              className="w-32 p-2 border rounded-lg"
              placeholder="Preço"
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
