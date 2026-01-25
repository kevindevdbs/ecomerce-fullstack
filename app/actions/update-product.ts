// app/actions/update-product.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(
  productId: number,
  formData: FormData,
  variants: any[],
  wholesale: any[],
) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const image = formData.get("image") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const hasLetterSelection = formData.get("hasLetterSelection") === "on";

  const detailsRaw = formData.get("details") as string;
  const details = detailsRaw
    .split("\n")
    .map((d) => d.trim())
    .filter((d) => d !== "");

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        shortDescription,
        fullDescription,
        image,
        categoryId,
        hasLetterSelection,
        details,
        // ESTRATÉGIA DE ATUALIZAÇÃO:
        // 1. Removemos todas as variantes/opções antigas
        // 2. Criamos as novas baseadas no formulário
        variants: {
          deleteMany: {},
          create: variants.map((v) => ({
            id: crypto.randomUUID(),
            name: v.name,
            colorHex: v.colorHex,
            images: [v.image],
          })),
        },
        wholesaleOptions: {
          deleteMany: {},
          create: wholesale.map((w) => ({
            minQuantity: parseInt(w.minQuantity),
            unitPrice: parseFloat(w.unitPrice),
          })),
        },
      },
    });

    revalidatePath("/admin");
    revalidatePath("/catalogo");
    revalidatePath(`/produto/${productId}`);
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return { error: "Erro ao atualizar no banco de dados." };
  }

  redirect("/admin");
}
