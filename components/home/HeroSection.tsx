import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GradientText from "../ui/GradientText";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* --- Background Decorativo --- */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-pink-100 via-purple-50 to-white" />
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-pink-300/30 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-purple-300/30 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20">
          {/* --- Lado do Texto --- */}
          <div className="flex-1 text-center md:text-left w-full">
            <div className="bg-white rounded-4xl sm:rounded-[3rem] p-6 sm:p-10 md:p-8 lg:p-12 shadow-xl shadow-purple-100/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-pink-100/40 to-purple-100/40 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />

              <GradientText as="h1" className="font-extrabold mb-6">
                <div className="inline-flex items-center gap-2 sm:gap-4 md:gap-4 lg:gap-6">
                  <div className="flex flex-col justify-center">
                    <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight whitespace-nowrap">
                      Ray Resina
                    </span>
                    <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-none mt-1 sm:mt-2 mx-auto pr-9 md:pr-12">
                      Art
                    </span>
                  </div>
                  <div className="relative w-24 h-28 sm:w-32 sm:h-36 md:w-44 md:h-52 lg:w-52 lg:h-64 shrink-0 -my-4 md:-my-8">
                    <Image
                      priority
                      src="https://res.cloudinary.com/dheamyys5/image/upload/v1769814240/lirio_dl3fik.png"
                      alt="Lírio Ray Resina"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 208px"
                    />
                  </div>
                </div>
              </GradientText>

              <p className="text-slate-600 text-base sm:text-lg md:text-base lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                Descubra a beleza da resina artesanal. Peças exclusivas feitas à
                mão para trazer elegância, cor e personalidade para sua casa.
              </p>

              <div className="flex flex-col sm:flex-row md:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto md:w-auto">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-base sm:text-lg md:text-base lg:text-lg rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:scale-105 transition-all group w-full sm:w-auto md:w-auto"
                >
                  Ver Coleção
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-slate-50 text-slate-700 font-bold text-base sm:text-lg md:text-base lg:text-lg rounded-full shadow-sm border-2 border-slate-200 hover:border-pink-200 hover:text-pink-600 transition-all w-full sm:w-auto md:w-auto"
                >
                  Nossa História
                </Link>
              </div>
            </div>
          </div>

          {/* --- Lado da Imagem --- */}
          <div className="flex-1 relative w-full max-w-sm sm:max-w-md md:max-w-full mx-auto md:mx-0 mt-4 md:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-pink-200 to-purple-200 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="relative aspect-4/5 md:aspect-square rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(236,72,153,0.2)] border-4 border-white rotate-3 hover:rotate-0 transition-all duration-700 z-20">
              <Image
                priority
                src="https://res.cloudinary.com/dheamyys5/image/upload/v1769814238/logo_ox0dyy.jpg"
                alt="Peça de resina destaque"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
