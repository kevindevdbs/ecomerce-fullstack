import Link from "next/link";

export default function AboutCTASection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-pink-50 text-center px-6">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
          Leve essa arte para sua casa
        </h2>
        <p className="text-slate-600 text-base md:text-lg mb-8 md:mb-10">
          Agora que você conhece nossa história, convido você a explorar as
          peças que nasceram desse processo.
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-base md:text-lg rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          Explorar o Catálogo
          {/* Substituí o SVG manual por um ícone do Lucide para consistência, se preferir mantenha o SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
