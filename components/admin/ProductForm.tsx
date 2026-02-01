"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/create-product";
import { updateProduct } from "@/app/actions/update-product";
import { Plus, Trash, Image as ImageIcon, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import clsx from "clsx";
import { Category, WholesaleOption } from "@/types";

// --- TIPAGEM ---
// Typo local para lidar com opções de atacado que ainda não foram salvas (sem ID)
interface FormWholesaleOption {
  id?: number;
  minQuantity: number;
  unitPrice: number;
}

// Extendendo tipos globais para o contexto do formulário
// ProductData representa os dados que vêm do banco para edição
interface ProductData {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  image: string | null;
  additionalImages?: string[];
  shortDescription?: string | null;
  fullDescription?: string | null;
  details?: string[];
  isVisible: boolean;
  hasLetterSelection: boolean | null;
  wholesaleOptions?: WholesaleOption[];
}

interface ProductFormProps {
  categories: Category[];
  initialData?: ProductData | null;
}

export default function ProductForm({
  categories,
  initialData,
}: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEditing = !!initialData;

  // Estados dos campos complexos
  const [mainImage, setMainImage] = useState(initialData?.image || "");
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    initialData?.additionalImages || [],
  );
  const [wholesale, setWholesale] = useState<FormWholesaleOption[]>(
    initialData?.wholesaleOptions || [],
  );

  // --- MANIPULADORES DE GALERIA ---
  const addGalleryImage = () => setAdditionalImages([...additionalImages, ""]);

  const removeGalleryImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateGalleryImage = (index: number, url: string) => {
    setAdditionalImages((prev) => {
      const newImages = [...prev];
      newImages[index] = url;
      return newImages;
    });
  };

  // --- MANIPULADORES DE ATACADO ---
  const addWholesale = () =>
    setWholesale([...wholesale, { minQuantity: 5, unitPrice: 0 }]);

  const removeWholesale = (index: number) =>
    setWholesale((prev) => prev.filter((_, i) => i !== index));

  const updateWholesale = (
    index: number,
    field: keyof FormWholesaleOption,
    value: string,
  ) => {
    setWholesale((prev) => {
      const newList = [...prev];
      // @ts-ignore - Confiança no tipo numérico vindo do input type="number"
      newList[index][field] = Number(value);
      return newList;
    });
  };

  // --- SUBMIT ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validação Client-side Básica
    if (!mainImage) {
      setErrorMessage("A imagem principal é obrigatória.");
      window.scrollTo(0, 0);
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", mainImage);

    // Filtra imagens vazias
    const validGallery = additionalImages.filter(
      (img) => img && img.trim() !== "",
    );

    let result;
    try {
      if (isEditing && initialData) {
        result = await updateProduct(
          initialData.id,
          formData,
          validGallery,
          wholesale,
        );
      } else {
        result = await createProduct(formData, validGallery, wholesale);
      }

      if (result?.error) {
        setErrorMessage(result.error);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } else {
        // Sucesso
      }
    } catch (error) {
      setErrorMessage("Erro inesperado. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Mensagem de Erro Global */}
      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-medium animate-pulse">
          🚨 {errorMessage}
        </div>
      )}

      {/* --- SEÇÃO PRINCIPAL --- */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        {/* Foto Capa */}
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            📸 Foto de Capa (Principal)
            <span className="text-red-500">*</span>
          </h3>
          <div className="w-full max-w-sm">
            <ImageUpload
              label="Capa do Produto"
              value={mainImage}
              onChange={setMainImage}
            />
          </div>
        </div>

        {/* Visibilidade */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isVisible"
              defaultChecked={initialData ? initialData.isVisible : true}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            <span className="ms-3 text-sm font-bold text-slate-700">
              Produto Visível no Site?
            </span>
          </label>
        </div>

        {/* Dados Básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-heavy font-bold text-slate-700">
              Nome do Produto <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="name"
              defaultValue={initialData?.name}
              placeholder="Ex: Vaso de Resina Lirio"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-heavy font-bold text-slate-700">
              Preço (R$) <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="price"
              type="number"
              step="0.01"
              defaultValue={initialData?.price}
              placeholder="0,00"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="categoryId"
              defaultValue={initialData?.categoryId}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors cursor-pointer"
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Descrição Curta <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="shortDescription"
              maxLength={150}
              defaultValue={initialData?.shortDescription || ""}
              placeholder="Resumo impactante..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors"
            />
            <p className="text-xs text-slate-400 text-right">
              Max 150 caracteres
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Descrição Completa
          </label>
          <textarea
            required
            name="fullDescription"
            rows={5}
            defaultValue={initialData?.fullDescription || ""}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Detalhes Técnicos
          </label>
          <textarea
            name="details"
            rows={4}
            defaultValue={initialData?.details?.join("\n")}
            placeholder="Um detalhe por linha..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-pink-500 transition-colors resize-none font-mono text-sm"
          />
          <p className="text-xs text-slate-400">
            Dica: Escreva um detalhe por linha.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            name="hasLetterSelection"
            type="checkbox"
            defaultChecked={!!initialData?.hasLetterSelection}
            id="letterCheck"
            className="w-5 h-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
          />
          <label
            htmlFor="letterCheck"
            className="text-sm font-bold text-slate-700 cursor-pointer"
          >
            Este produto exige escolha de letra personalizada?
          </label>
        </div>
      </div>

      {/* --- GALERIA --- */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="text-pink-600 w-6 h-6" /> Galeria de Fotos
          </h2>
          <button
            type="button"
            onClick={addGalleryImage}
            className="flex items-center gap-2 text-sm font-bold text-pink-600 bg-pink-50 px-4 py-2 rounded-full hover:bg-pink-100 transition-colors"
          >
            <Plus size={16} /> Adicionar Foto
          </button>
        </div>

        {additionalImages.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-400 italic">
              Nenhuma foto extra adicionada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalImages.map((imgUrl, index) => (
              <div
                key={index}
                className="relative group bg-slate-50 p-2 rounded-xl border border-slate-200 hover:border-pink-200 transition-colors"
              >
                <ImageUpload
                  label={`Foto ${index + 1}`}
                  value={imgUrl}
                  onChange={(url) => updateGalleryImage(index, url)}
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-transform hover:scale-110 z-10"
                  aria-label="Remover foto"
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- ATACADO --- */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-800">
              Preços de Atacado
            </h2>
            <p className="text-sm text-slate-400">
              Configure descontos progressivos por quantidade.
            </p>
          </div>
          <button
            type="button"
            onClick={addWholesale}
            className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors"
          >
            <Plus size={16} /> Adicionar Regra
          </button>
        </div>

        <div className="space-y-3">
          {wholesale.length === 0 && (
            <p className="text-slate-400 italic text-center py-4">
              Nenhuma regra de atacado configurada.
            </p>
          )}

          {wholesale.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap md:flex-nowrap gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200"
            >
              <div className="w-1/3 md:w-auto">
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  Qtd. Mínima
                </label>
                <input
                  type="number"
                  value={item.minQuantity}
                  onChange={(e) =>
                    updateWholesale(index, "minQuantity", e.target.value)
                  }
                  className="w-full md:w-32 p-2 border border-slate-300 rounded-lg focus:border-pink-500 outline-none"
                />
              </div>

              <div className="w-1/3 md:w-auto">
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  Valor Unitário (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateWholesale(index, "unitPrice", e.target.value)
                  }
                  className="w-full md:w-32 p-2 border border-slate-300 rounded-lg focus:border-pink-500 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => removeWholesale(index)}
                className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remover regra"
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTÃO SALVAR --- */}
      <div className="mt-10 flex justify-end pb-8">
        <button
          disabled={isLoading}
          className={clsx(
            "flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl shadow-pink-200 hover:shadow-2xl transition-all transform hover:-translate-y-1",
            isLoading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-linear-to-r from-pink-500 to-purple-600 hover:scale-105",
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Salvando...
            </>
          ) : (
            <>Salvar Produto</>
          )}
        </button>
      </div>
    </form>
  );
}
