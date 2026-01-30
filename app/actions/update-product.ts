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
  // ... (recuperação dos dados) ...
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
    revalidatePath(`/produto/${productId}`);
  } catch (error) {
    return { error: "Erro ao atualizar." };
  }

  // ✅ CORREÇÃO: Redirect FORA do try/catch
  redirect("/admin");
}
