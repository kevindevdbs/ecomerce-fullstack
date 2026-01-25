// app/actions/create-product.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(
  formData: FormData,
  variants: any[],
  wholesale: any[],
) {
  // 1. Extrair dados básicos
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const image = formData.get("image") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const hasLetterSelection = formData.get("hasLetterSelection") === "on";

  // 2. Processar detalhes (separados por quebra de linha ou vírgula)
  const detailsRaw = formData.get("details") as string;
  const details = detailsRaw
    .split("\n")
    .map((d) => d.trim())
    .filter((d) => d !== "");

  try {
    // 3. Criar tudo no banco de uma vez (Transaction implícita do Prisma)
    await prisma.product.create({
      data: {
        name,
        price,
        shortDescription,
        fullDescription,
        image,
        categoryId,
        hasLetterSelection,
        details, // Array de strings
        // Criação aninhada das Variantes
        variants: {
          create: variants.map((v) => ({
            id: crypto.randomUUID(), // Gera um ID único string
            name: v.name,
            colorHex: v.colorHex,
            images: [v.image], // Por simplicidade, assumindo 1 imagem por variante no form inicial
          })),
        },
        // Criação aninhada do Atacado
        wholesaleOptions: {
          create: wholesale.map((w) => ({
            minQuantity: parseInt(w.minQuantity),
            unitPrice: parseFloat(w.unitPrice),
          })),
        },
      },
    });

    // 4. Atualizar o cache das páginas
    revalidatePath("/catalogo");
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return { error: "Erro ao salvar no banco de dados." };
  }

  // 5. Redirecionar para o catálogo
  redirect("/catalogo");
}
