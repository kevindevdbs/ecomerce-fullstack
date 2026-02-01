"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/types";

export async function updateProduct(
  id: number,
  formData: FormData,
  additionalImages: string[],
  wholesale: { minQuantity: number; unitPrice: number }[],
): Promise<ActionResponse> {
  try {
    const name = formData.get("name")?.toString().trim();
    const priceStr = formData.get("price")?.toString();
    const categoryIdStr = formData.get("categoryId")?.toString();
    const image = formData.get("image")?.toString();
    const shortDescription = formData.get("shortDescription")?.toString() || "";
    const fullDescription = formData.get("fullDescription")?.toString() || "";

    const detailsRaw = formData.get("details")?.toString() || "";
    const details = detailsRaw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const hasLetterSelection = formData.get("hasLetterSelection") === "on";
    const isVisible = formData.get("isVisible") === "on";

    if (!name || !priceStr || !categoryIdStr || !image) {
      return { error: "Preencha todos os campos obrigatórios." };
    }

    const price = parseFloat(priceStr);
    const categoryId = parseInt(categoryIdStr);

    if (isNaN(price)) return { error: "Preço inválido." };
    if (isNaN(categoryId)) return { error: "Categoria inválida." };

    await prisma.$transaction(async (tx) => {
      // 1. Atualiza produto
      await tx.product.update({
        where: { id },
        data: {
          name,
          price,
          categoryId,
          image,
          additionalImages,
          shortDescription,
          fullDescription,
          details,
          hasLetterSelection,
          isVisible,
        },
      });

      // 2. Remove atacado antigo e recria (estratégia simples)
      await tx.wholesaleOption.deleteMany({
        where: { productId: id },
      });

      if (wholesale.length > 0) {
        await tx.wholesaleOption.createMany({
          data: wholesale.map((w) => ({
            productId: id,
            minQuantity: Number(w.minQuantity),
            unitPrice: Number(w.unitPrice),
          })),
        });
      }
    });

    revalidatePath("/admin");
    revalidatePath("/catalogo");
    revalidatePath("/");
    revalidatePath(`/produto/${id}`);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return { error: "Erro interno ao atualizar produto." };
  }

  redirect("/admin");
}
