"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/types";

export async function createProduct(
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

    // Tratamento seguro de strings para arrays
    const detailsRaw = formData.get("details")?.toString() || "";
    const details = detailsRaw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const hasLetterSelection = formData.get("hasLetterSelection") === "on";
    const isVisible = formData.get("isVisible") === "on";

    // Validação Manual
    if (!name || !priceStr || !categoryIdStr || !image) {
      return {
        error:
          "Preencha todos os campos obrigatórios (Nome, Preço, Categoria, Imagem Principal).",
      };
    }

    const price = parseFloat(priceStr);
    const categoryId = parseInt(categoryIdStr);

    if (isNaN(price) || price < 0) return { error: "Preço inválido." };
    if (isNaN(categoryId)) return { error: "Categoria inválida." };

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
        isVisible,
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
    console.error("Erro interno ao criar produto:", error);
    return {
      error: "Falha ao criar produto no banco de dados. Tente novamente.",
    };
  }

  // Redirect fora do try/catch é uma boa prática no Next.js Server Actions
  redirect("/admin");
}
