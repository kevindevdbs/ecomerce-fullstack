"use client";

import { useState } from "react";
import { createCategory, updateCategory } from "@/app/actions/category";
import { Save, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface CategoryFormProps {
  initialData?: {
    id: number;
    name: string;
    image: string | null;
    isVisible: boolean; // <--- NOVO TIPO
  };
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(initialData?.image || "");
  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", image);

    let result;

    if (isEditing && initialData) {
      result = await updateCategory(initialData.id, formData);
    } else {
      result = await createCategory(formData);
    }

    if (result?.error) {
      alert(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto space-y-6"
    >
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <ImageUpload
          label="Capa da Categoria"
          value={image}
          onChange={setImage}
        />
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
          Categoria Visível?
          <span className="block text-xs font-normal text-slate-500">
            Se desmarcado, fica oculta na loja.
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">
          Nome da Categoria
        </label>
        <input
          required
          name="name"
          defaultValue={initialData?.name}
          className="w-full p-3 border rounded-xl"
          placeholder="Ex: Chaveiros"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-all disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
        {isEditing ? "Salvar" : "Criar"}
      </button>
    </form>
  );
}
