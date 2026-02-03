"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteOrder(orderId: string) {
  try {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath("/admin/pedidos");

    return {
      success: true,
      message: "Pedido excluído com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    return {
      success: false,
      message: "Erro ao excluir pedido. Tente novamente.",
    };
  }
}
