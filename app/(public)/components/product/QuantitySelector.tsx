"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  // Adicionamos esta nova propriedade para permitir a edição manual
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
        Quantidade:
      </h3>
      <div className="inline-flex items-center bg-white rounded-full border-2 border-slate-200 p-1">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-pink-600 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Diminuir quantidade"
        >
          <Minus size={18} />
        </button>

        {/* Input numérico editável */}
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            // Só atualiza se for um número válido e maior que 0
            if (!isNaN(val) && val >= 1) {
              onChange(val);
            } else if (e.target.value === "") {
              // Opcional: permite limpar o campo momentaneamente para digitar
              // Mas aqui optamos por manter o valor anterior ou tratar no componente pai se necessário
              // Por segurança, mantemos o valor atual visualmente se for inválido no blur,
              // mas enquanto digita o onChange acima já filtra.
            }
          }}
          onFocus={(e) => e.target.select()} // Seleciona todo o número ao clicar
          className="w-14 text-center font-bold text-lg text-slate-800 border-none focus:ring-0 focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={onIncrease}
          className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-pink-600 hover:bg-slate-100 transition-colors"
          aria-label="Aumentar quantidade"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
