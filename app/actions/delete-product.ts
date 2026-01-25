// app/actions/delete-product.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: number) {
  try {
    // Tenta deletar o produto.
    // NOTA: Isso funcionará automaticamente se o seu schema.prisma tiver "onDelete: Cascade"
    // nas relações. Se não tiver, ele pode dar erro se o produto tiver variantes.
    // Vou assumir que o prisma tentará lidar com isso, ou tratamos o erro.

    // Método de Força Bruta (caso não tenha Cascade configurado no banco):
    // Deletamos as dependências primeiro manualmente para garantir
    try {
      // Nomes das tabelas baseados no padrão do Prisma (ProductVariant, WholesaleOption, etc)
      // Se seus nomes forem diferentes, o Cascade no schema é a melhor opção.
      await prisma.$transaction([
        // Tenta limpar variantes órfãs desse ID (se existirem e o nome for esse)
        prisma.productVariant.deleteMany({ where: { productId } }),
        prisma.wholesaleOption.deleteMany({ where: { productId } }),
        // Deleta o produto
        prisma.product.delete({ where: { id: productId } }),
      ]);
    } catch (innerError) {
      // Se a transação manual falhar (ex: nomes de tabela diferentes), tentamos o delete simples
      // confiando que o Cascade está configurado no Schema.
      await prisma.product.delete({ where: { id: productId } });
    }

    // Atualiza as páginas
    revalidatePath("/admin");
    revalidatePath("/catalogo");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return {
      error:
        "Erro ao deletar. O produto pode ter pedidos associados ou configurações pendentes.",
    };
  }
}
