import { Zap } from "lucide-react";

interface ProductInfoProps {
  fullDescription: string | null;
  details: string[];
}

export default function ProductInfo({
  fullDescription,
  details,
}: ProductInfoProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 mb-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <span className="w-1 h-8 bg-pink-600 rounded-full block" />
        Descrição do Produto
      </h2>
      <div className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
        {fullDescription || "Sem descrição detalhada."}
      </div>

      {details && details.length > 0 && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Detalhes e Especificações
          </h3>
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-slate-600 text-lg"
              >
                <Zap className="w-4 h-4 text-pink-500 mt-1.5 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
