"use client";

import { useState } from "react";
import { createCategory, updateCategory } from "@/app/actions/category";
import { Save, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface CategoryFormProps {
  initialData?: { id: number; name: string; image: string | null };
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

    // --- CORREÇÃO AQUI ---
    // Removemos o try/catch do cliente.
    // Se der erro no banco, a função retorna um objeto { error: "mensagem" }
    // Se der certo, ela faz o redirect e o navegador muda de página sozinho.

    let result;

    if (isEditing && initialData) {
      result = await updateCategory(initialData.id, formData);
    } else {
      result = await createCategory(formData);
    }

    // Só paramos o loading e mostramos erro SE a função retornou erro explicitamente
    if (result?.error) {
      alert(result.error);
      setIsLoading(false);
    }

    // Se não retornou erro, o redirect vai acontecer e a página vai mudar.
    // Não precisamos fazer mais nada.
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
