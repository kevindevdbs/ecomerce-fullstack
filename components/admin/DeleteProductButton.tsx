// components/admin/DeleteProductButton.tsx
"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/delete-product";

export default function DeleteProductButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o produto "${name}"?\nEssa ação não pode ser desfeita.`,
    );

    if (confirm) {
      setIsDeleting(true);
      const result = await deleteProduct(id);

      if (result?.error) {
        alert(result.error);
        setIsDeleting(false);
      }
      // Se der sucesso, o revalidatePath vai atualizar a página automaticamente
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Excluir produto"
    >
      {isDeleting ? (
        <Loader2 size={20} className="animate-spin text-red-600" />
      ) : (
        <Trash2 size={20} />
      )}
    </button>
  );
}
