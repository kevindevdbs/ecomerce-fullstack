import Image from "next/image";
import { Heart, Leaf, Palette, Sparkles, LucideIcon } from "lucide-react";

// Sub-componente interno para os cards de valores (evita repetição de código)
interface ProcessCardProps {
  Icon: LucideIcon;
  iconColorClass: string;
  title: string;
  description: string;
}

function ProcessCard({
  Icon,
  iconColorClass,
  title,
  description,
}: ProcessCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center">
      <Icon
        className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 ${iconColorClass}`}
      />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 relative bg-slate-900 text-white overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/logo.jpeg" // Lembre de usar uma imagem do processo aqui
          alt="Processo de criação"
          fill
          className="object-cover blur-sm object-center"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/90 via-slate-900/90 to-pink-900/90 mix-blend-multiply"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-4 md:mb-6 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
          <Palette className="w-6 h-6 md:w-8 md:h-8 text-pink-300" />
        </div>
        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-linear-to-r from-pink-200 via-white to-purple-200">
          Mais que resina, uma alquimia.
        </h2>
        <p className="text-slate-200 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 md:mb-16 px-2">
          Nosso processo é 100% artesanal. Desde a seleção dos pigmentos até a
          cura final e o polimento, cada etapa exige tempo, paciência e
          precisão.
        </p>

        {/* Grid de Valores usando o sub-componente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16 max-w-4xl mx-auto">
          <ProcessCard
            Icon={Heart}
            iconColorClass="text-pink-400"
            title="Feito com Intenção"
            description="Cada peça carrega energia positiva e carinho em sua criação."
          />
          <ProcessCard
            Icon={Sparkles}
            iconColorClass="text-purple-400"
            title="Sempre Único"
            description="Como impressões digitais, nenhuma peça é igual à outra."
          />
          <ProcessCard
            Icon={Leaf}
            iconColorClass="text-green-400"
            title="Durabilidade"
            description="Materiais de alta qualidade para peças que duram gerações."
          />
        </div>
      </div>
    </section>
  );
}
