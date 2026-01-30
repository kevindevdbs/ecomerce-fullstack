"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteCategory } from "@/app/actions/category";

export default function DeleteCategoryButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Tem certeza que deseja excluir a categoria "${name}"?`,
    );
    if (!confirm) return;

    setIsDeleting(true);
    const result = await deleteCategory(id);

    if (result?.error) {
      alert(result.error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Excluir categoria"
    >
      {isDeleting ? (
        <Loader2 size={20} className="animate-spin text-red-600" />
      ) : (
        <Trash2 size={20} />
      )}
    </button>
  );
}
