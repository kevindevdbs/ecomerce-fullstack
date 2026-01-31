export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-12 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Esqueleto da Galeria */}
            <div className="aspect-square bg-slate-200 rounded-3xl"></div>

            {/* Esqueleto do Texto */}
            <div className="flex flex-col gap-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
