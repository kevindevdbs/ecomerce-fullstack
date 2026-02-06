export default function CatalogLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-6">
      {/* Hero Skeleton */}
      <div className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center gap-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-full w-2/3 md:w-1/3"></div>
        <div className="h-12 bg-slate-200 rounded-full w-full md:w-1/2"></div>
      </div>

      <div className="container mx-auto flex items-start gap-12">
        {/* Sidebar Skeleton (Desktop) */}
        <div className="hidden md:block w-64 shrink-0 space-y-6 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Grid de Produtos Skeleton */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col gap-3"
            >
              {/* Foto */}
              <div className="aspect-square bg-slate-200 rounded-2xl w-full"></div>
              {/* Título */}
              <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              {/* Preço */}
              <div className="mt-auto pt-2 flex justify-between items-end">
                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
