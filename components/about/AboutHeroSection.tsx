export default function AboutHeroSection() {
  return (
    <section className="pt-28 pb-12 md:pt-40 md:pb-24 bg-linear-to-b from-pink-50 via-purple-50 to-white text-center px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 right-0 w-48 h-48 md:w-64 md:h-64 bg-pink-200 rounded-full blur-3xl opacity-20 md:opacity-30 -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 md:w-72 md:h-72 bg-purple-200 rounded-full blur-3xl opacity-20 md:opacity-30 -z-10"></div>

      <div className="container mx-auto relative z-10">
        <span className="inline-block mb-3 text-xs md:text-sm font-bold tracking-wider text-pink-600 uppercase bg-pink-100 px-4 py-1 rounded-full">
          Nossa Essência
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 mb-4 md:mb-6 leading-tight">
          Por trás de cada peça única
        </h1>
        <p className="text-slate-600 text-base md:text-xl max-w-xl mx-auto font-medium leading-relaxed px-2">
          Conheça a história, a paixão e o processo artesanal que dão vida e cor
          à Ray Resina.
        </p>
      </div>
    </section>
  );
}
