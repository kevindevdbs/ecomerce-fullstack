"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(
  id: number,
  formData: FormData,
  additionalImages: string[],
  wholesale: { minQuantity: number; unitPrice: number }[],
) {
  try {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const image = formData.get("image") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const details =
      (formData.get("details") as string)
        ?.split("\n")
        .filter((line) => line.trim() !== "") || [];
    const hasLetterSelection = formData.get("hasLetterSelection") === "on";
    const isVisible = formData.get("isVisible") === "on"; // <--- NOVO

    if (!name || !price || !categoryId || !image) {
      return { error: "Preencha todos os campos obrigatórios." };
    }

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
          isVisible, // <--- Atualiza
        },
      });

      // 2. Remove atacado antigo
      await tx.wholesaleOption.deleteMany({
        where: { productId: id },
      });

      // 3. Cria novos atacado
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
    return { error: "Erro ao atualizar produto." };
  }

  redirect("/admin");
}
