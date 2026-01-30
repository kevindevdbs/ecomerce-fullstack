"use client";

import { useState, useRef } from "react";
import { ImagePlus, Trash, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string; // URL da imagem atual
  onChange: (url: string) => void; // Função para atualizar a URL no pai
  disabled?: boolean;
  label?: string; // Rótulo opcional (ex: "Foto Principal")
}

export default function ImageUpload({
  value,
  onChange,
  disabled,
  label,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CLOUD_NAME = "dheamyys5";
  const UPLOAD_PRESET = "rayresina";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação básica de tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("A imagem é muito grande (Máx 10MB).");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.secure_url) {
        onChange(data.secure_url); // Devolve o link pronto
      } else {
        console.error("Erro Cloudinary:", data);
        alert("Erro no upload. Verifique as configurações do Cloudinary.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao conectar com o serviço de imagens.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {label && (
        <span className="block text-xs font-bold text-slate-500 mb-2 uppercase">
          {label}
        </span>
      )}

      <div className="flex items-start gap-4">
        {/* Visualização (Quadrado da foto) */}
        <div className="relative w-32 h-32 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200 border-dashed shrink-0 flex items-center justify-center group hover:border-pink-300 transition-colors">
          {value ? (
            <>
              <Image
                fill
                className="object-cover"
                alt="Imagem carregada"
                src={value}
              />
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled || isUploading}
                className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                title="Remover foto"
              >
                <Trash className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
              ) : (
                <ImagePlus className="w-8 h-8 opacity-50" />
              )}
            </div>
          )}
        </div>

        {/* Botão de Ação */}
        <div className="flex flex-col gap-2 pt-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={disabled || isUploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
          >
            {isUploading ? <>Enviando...</> : <>Escolher Imagem</>}
          </button>
          <p className="text-[10px] text-slate-400 max-w-37.5 leading-tight">
            Suporta JPG, PNG ou WEBP. <br /> Tire uma foto ou escolha da
            galeria.
          </p>
        </div>
      </div>

      {/* Campo invisível para garantir que o formulário pegue o valor */}
      <input type="hidden" value={value} required={!value} />
    </div>
  );
}
