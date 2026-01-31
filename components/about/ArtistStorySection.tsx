import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function ArtistStorySection() {
  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-20 z-10 relative">
        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm md:max-w-md aspect-4/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl shadow-purple-200/50 rotate-2 hover:rotate-0 transition-all duration-700 border-[6px] border-white bg-pink-100 mx-auto md:mx-0">
            <Image
              priority={true}
              src="/rayssa.jpeg" // SUBSTITUA PELA SUA FOTO
              alt="Foto de Rayssa, fundadora da Ray Resina"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Lado do Texto */}
        <div className="w-full md:w-1/2 md:pr-12 mt-4 md:mt-0">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center justify-center md:justify-start gap-2 md:gap-3">
            Olá, sou a Rayssa.
            <Sparkles className="text-pink-500 w-5 h-5 md:w-6 md:h-6" />
          </h2>
          <div className="space-y-4 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed text-center md:text-left">
            <p>
              Tudo começou com uma fascinação pelas cores e pela forma como elas
              podem transformar um ambiente. Eu sempre busquei uma maneira de
              materializar essa paixão em algo tangível.
            </p>
            <p>
              Quando descobri a resina, foi amor à primeira vista. A fluidez do
              material, a imprevisibilidade de como as cores se misturam e o
              resultado final, sempre brilhante e único, me conquistaram.
            </p>
            <p className="font-medium text-slate-800">
              A Ray Resina nasceu desse desejo de criar não apenas objetos
              decorativos, mas pequenas obras de arte funcionais que tragam
              alegria e personalidade para o dia a dia.
            </p>
          </div>
          {/* Assinatura Estilizada */}
          <div className="mt-8 md:mt-10 text-center md:text-left">
            <p className="text-pink-600 font-handwriting text-3xl md:text-4xl font-bold transform -rotate-2 inline-block border-b-2 border-pink-200 pb-1">
              com carinho, Ray
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
