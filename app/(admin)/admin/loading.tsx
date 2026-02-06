export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl animate-pulse">
        {/* --- Header Skeleton (Título + Botões) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <div className="h-8 bg-slate-200 rounded-lg w-48 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-64"></div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="h-12 bg-slate-200 rounded-full w-32"></div>
            <div className="h-12 bg-slate-200 rounded-full w-40"></div>
          </div>
        </div>

        {/* --- Stats Skeleton (Cartões de Resumo) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Card Grande */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-2 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-3 bg-slate-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
          {/* Cards Menores (Futuros) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hidden md:block"></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hidden md:block"></div>
        </div>

        {/* --- Tabela/Lista Skeleton --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Cabeçalho da Tabela (Desktop) */}
          <div className="hidden md:flex border-b border-slate-100 bg-slate-50 p-4">
            <div className="w-1/4 h-4 bg-slate-200 rounded mr-4"></div>
            <div className="w-1/4 h-4 bg-slate-200 rounded mr-4"></div>
            <div className="w-1/4 h-4 bg-slate-200 rounded mr-4"></div>
            <div className="w-1/4 h-4 bg-slate-200 rounded"></div>
          </div>

          {/* Linhas da Tabela (Simulando 5 produtos) */}
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 flex flex-col md:flex-row items-center gap-4"
              >
                {/* Imagem + Nome */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Categoria */}
                <div className="w-full md:w-1/4 hidden md:block">
                  <div className="h-6 bg-slate-200 rounded-md w-24"></div>
                </div>

                {/* Preço */}
                <div className="w-full md:w-1/4 flex justify-between md:block">
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                </div>

                {/* Ações */}
                <div className="w-full md:w-1/4 flex justify-end gap-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
