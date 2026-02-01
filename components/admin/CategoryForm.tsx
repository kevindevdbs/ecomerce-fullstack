"use client";

import { useState } from "react";
import { createCategory, updateCategory } from "@/app/actions/category";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface CategoryData {
  id: number;
  name: string;
  image: string | null;
  isVisible: boolean;
}

interface CategoryFormProps {
  initialData?: CategoryData | null;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(initialData?.image || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image", image);

    let result;

    if (isEditing && initialData) {
      result = await updateCategory(initialData.id, formData);
    } else {
      result = await createCategory(formData);
    }

    if (result?.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
    } else {
      // Sucesso!
      router.push("/admin/categorias");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto pb-10">
      {/* Mensagem de Erro */}
      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-medium animate-pulse">
          🚨 {errorMessage}
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        {/* Imagem de Capa */}
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <ImageIcon className="text-pink-600 w-5 h-5" /> Imagem da Categoria
          </h3>
          <div className="w-full max-w-sm">
            <ImageUpload
              label="Capa da Categoria"
              value={image}
              onChange={setImage}
            />
          </div>
        </div>

        {/* Switch de Visibilidade */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isVisible"
              defaultChecked={initialData ? initialData.isVisible : true}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            <span className="ms-3 text-sm font-bold text-slate-700">
              Categoria Visível?
              <span className="block text-xs font-normal text-slate-500 mt-1">
                Se desmarcado, fica oculta na loja.
              </span>
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Nome da Categoria <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="name"
            defaultValue={initialData?.name}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors font-medium"
            placeholder="Ex: Chaveiros"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={clsx(
          "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-pink-200 transition-all",
          isLoading
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700 hover:-translate-y-1",
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> Salvando...
          </>
        ) : (
          <>
            <Save size={20} />{" "}
            {isEditing ? "Salvar Alterações" : "Criar Categoria"}
          </>
        )}
      </button>
    </form>
  );
}
