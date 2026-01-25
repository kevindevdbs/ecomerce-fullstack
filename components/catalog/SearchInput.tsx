"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="max-w-md mx-auto relative group mt-8">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
      <input
        type="text"
        placeholder="Buscar por nome da peça..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-10 py-3.5 rounded-full border border-slate-200 bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-slate-700 shadow-sm font-medium"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <FaTimes size={14} />
        </button>
      )}
    </div>
  );
}
