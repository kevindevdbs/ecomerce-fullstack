"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CRIAR ---
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  // O checkbox retorna "on" se marcado, ou null se desmarcado
  const isVisible = formData.get("isVisible") === "on";

  try {
    await prisma.category.create({
      data: {
        name,
        image: image || null,
        isVisible, // Salva no banco
      },
    });

    revalidatePath("/admin/categorias");
    revalidatePath("/catalogo");
    revalidatePath("/");
  } catch (error) {
    return { error: "Erro ao criar categoria." };
  }

  redirect("/admin/categorias");
}

// --- ATUALIZAR ---
export async function updateCategory(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const isVisible = formData.get("isVisible") === "on";

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
  } catch (error) {
    return { error: "Erro ao atualizar categoria." };
  }

  redirect("/admin/categorias");
}

// --- DELETAR ---
export async function deleteCategory(id: number) {
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
    return { error: "Erro ao deletar categoria." };
  }
}
