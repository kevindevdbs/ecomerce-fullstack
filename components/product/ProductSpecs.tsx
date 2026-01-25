import { FaRegCheckCircle } from "react-icons/fa";

export default function ProductSpecs({ details }: { details: string[] }) {
  if (!details || details.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-3xl p-6 md:p-8">
      <h3 className="font-bold text-slate-800 mb-4 text-lg flex items-center gap-2">
        Detalhes da Peça
        <div className="h-1 w-8 bg-purple-200 rounded-full"></div>
      </h3>
      <ul className="space-y-3">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-700">
            <FaRegCheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
