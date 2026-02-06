"use client";

import { useState, useRef } from "react";
import { ImagePlus, Trash, Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  label?: string;
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
        { method: "POST", body: formData },
      );

      const data = await response.json();

      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        alert("Erro no upload. Verifique as configurações do Cloudinary.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao conectar com o serviço de imagens.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o seletor de arquivos ao clicar no lixo
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerUpload = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      {label && (
        <span className="block text-xs font-bold text-slate-500 mb-2 uppercase text-center md:text-left">
          {label}
        </span>
      )}

      {/* Input Oculto */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
        disabled={disabled || isUploading}
      />

      {/* Área da Imagem (Agora Responsiva e Clicável) */}
      <div
        onClick={!value ? triggerUpload : undefined}
        className={`
          relative w-full aspect-square rounded-xl overflow-hidden border-2 border-dashed transition-all group
          ${
            value
              ? "border-slate-200"
              : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-pink-400 cursor-pointer"
          }
        `}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500 mb-2" />
            <span className="text-xs font-bold text-slate-400">
              Enviando...
            </span>
          </div>
        ) : value ? (
          <>
            <Image
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Imagem carregada"
              src={value}
            />
            {/* Botão Remover (Overlay) */}
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110 z-10"
              title="Remover foto"
            >
              <Trash className="w-4 h-4" />
            </button>

            {/* Botão Alterar (Overlay Central) */}
            <div
              onClick={triggerUpload}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <p className="text-white font-bold text-sm flex items-center gap-2">
                <UploadCloud size={16} /> Alterar
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <ImagePlus className="w-6 h-6 text-slate-400 group-hover:text-pink-500 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-600 mb-1">
              Adicionar Foto
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Clique para upload
            </p>
          </div>
        )}
      </div>

      {/* Input Hidden para Forms */}
      <input type="hidden" value={value} required={!value && !!label} />
    </div>
  );
}
