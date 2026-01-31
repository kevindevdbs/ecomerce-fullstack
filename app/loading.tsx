import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
        <p className="text-slate-500 font-medium text-sm animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
  );
}
