"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* 
  Definição de Tipos de Retorno
  Seguindo o padrão de ActionResponse definido em create-product.
*/
export type ActionResponse = {
  error?: string;
  success?: boolean;
};

// --- CRIAR ---
export async function createCategory(
  formData: FormData,
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const isVisible = formData.get("isVisible") === "on";

  if (!name || name.trim().length === 0) {
    return { error: "Nome da categoria é obrigatório." };
  }

  try {
    await prisma.category.create({
      data: {
        name,
        image: image || null,
        isVisible,
      },
    });

    revalidatePath("/admin/categorias");
    revalidatePath("/catalogo");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao criar categoria. Verifique se o nome já existe." };
  }
}

// --- ATUALIZAR ---
export async function updateCategory(
  id: number,
  formData: FormData,
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const isVisible = formData.get("isVisible") === "on";

  if (!name || name.trim().length === 0) {
    return { error: "Nome da categoria é obrigatório." };
  }

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        image: image || null,
        isVisible,
      },
    });

    revalidatePath("/admin/categorias");
    revalidatePath("/catalogo");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar categoria." };
  }
}

// --- DELETAR ---
export async function deleteCategory(id: number): Promise<ActionResponse> {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (category && category._count.products > 0) {
      return {
        error: `Impossível excluir: Existem ${category._count.products} produtos nesta categoria.`,
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categorias");
    revalidatePath("/catalogo");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao deletar categoria." };
  }
}
