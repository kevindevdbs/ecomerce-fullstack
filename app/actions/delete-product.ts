"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/types";

export async function deleteProduct(
  productId: number,
): Promise<ActionResponse> {
  try {
    // O 'productVariant' não existe mais, então removemos aquela linha.

    // Como configuramos "onDelete: Cascade" no schema.prisma para WholesaleOptions,
    // deletar o produto deve limpar tudo automaticamente.
    // Mas para garantir (caso o banco não tenha atualizado a constraint),
    // podemos usar uma transação simples:

    await prisma.$transaction(async (tx) => {
      // 1. Limpa opções de atacado (se houver)
      await tx.wholesaleOption.deleteMany({
        where: { productId },
      });

      // 2. Deleta o produto
      await tx.product.delete({
        where: { id: productId },
      });
    });

    // Atualiza as páginas
    revalidatePath("/admin");
    revalidatePath("/catalogo");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return {
      error:
        "Erro ao deletar. O produto pode ter pedidos associados ou dependências.",
    };
  }
}
