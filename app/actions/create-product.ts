"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(
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

    await prisma.product.create({
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
        isVisible, // <--- Salva
        wholesaleOptions: {
          create: wholesale.map((w) => ({
            minQuantity: Number(w.minQuantity),
            unitPrice: Number(w.unitPrice),
          })),
        },
      },
    });

    revalidatePath("/admin");
    revalidatePath("/catalogo");
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return { error: "Erro ao criar produto no banco de dados." };
  }

  redirect("/admin");
}
