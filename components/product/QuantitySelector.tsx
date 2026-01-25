"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
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
        <span className="w-12 text-center font-bold text-lg text-slate-800">
          {quantity}
        </span>
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
