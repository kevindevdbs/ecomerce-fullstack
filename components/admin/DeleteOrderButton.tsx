"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteOrder } from "@/app/actions/delete-order";

interface DeleteOrderButtonProps {
  orderId: string;
  orderReference: string;
}

export default function DeleteOrderButton({
  orderId,
  orderReference,
}: DeleteOrderButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteOrder(orderId);

      if (result.success) {
        setShowConfirm(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Erro ao excluir pedido");
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-red-600 font-semibold">
          Confirmar exclusão?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
          >
            {isDeleting ? "Excluindo..." : "Sim"}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-xs font-semibold"
          >
            Não
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
      title={`Excluir pedido ${orderReference}`}
    >
      <FaTrash />
    </button>
  );
}
