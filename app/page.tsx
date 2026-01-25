import prisma from "../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GradientText from "../components/ui/GradientText";
import SectionTitle from "../components/ui/SectionTitle";
import ProductCard from "../components/product/ProductCard";

export interface Product {
  id: number;
  name: string;
  image: string;
  categoryId: number;
  price: number;
  shortDescription: string;
  fullDescription: string;
  details: string[];
  hasLetterSelection: boolean | null;
  variants: { id: number; name: string }[] | null;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export default async function Home() {
  const products: Product[] = (
    await prisma.product.findMany({
      include: {
        variants: true,
      },
    })
  ).map((product) => ({
    ...product,
    image: product.image || "", // Ensure image is always a string
    variants:
      product.variants?.map((variant) => ({
        ...variant,
        id: Number(variant.id),
      })) || null,
  }));

  const categories: Category[] = (await prisma.category.findMany()).map(
    (category) => ({
      ...category,
      image: category.image || "",
    }),
  );

  return (
    <>
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-32 overflow-hidden">
        {/* --- Background Decorativo (Mantido) --- */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-pink-100 via-purple-50 to-white"></div>
        <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-pink-300/30 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-purple-300/30 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20">
            {/* --- Lado do Texto (Topo no mobile, Esquerda no tablet/desktop) --- */}
            <div className="flex-1 text-center md:text-left w-full">
              {/* Cartão Branco */}
              {/* Ajuste de padding no MD para dar mais espaço interno */}
              <div className="bg-white rounded-4xl sm:rounded-[3rem] p-6 sm:p-10 md:p-8 lg:p-12 shadow-xl shadow-purple-100/50 border border-slate-100 relative overflow-hidden">
                {/* Efeito decorativo interno */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-pink-100/40 to-purple-100/40 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                <GradientText as="h1" className="font-extrabold mb-6">
                  {/* Contêiner flexível do título e imagem */}
                  <div className="inline-flex items-center gap-2 sm:gap-4 md:gap-4 lg:gap-6">
                    {/* BLOCO DE TEXTO VERTICAL */}
                    <div className="flex flex-col justify-center">
                      {/*
                        ALTERAÇÃO 1: Título "Ray Resina"
                        - Adicionado 'whitespace-nowrap' para NUNCA quebrar linha.
                        - Aumentado significativamente os tamanhos em md: e lg:.
                    */}
                      <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight whitespace-nowrap">
                        Ray Resina
                      </span>
                      {/*
                        ALTERAÇÃO 2: Subtítulo "Art"
                        - Acompanha o aumento de tamanho do título principal.
                    */}
                      <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-none mt-1 sm:mt-2 mx-auto pr-9 md:pr-12">
                        Art
                      </span>
                    </div>

                    {/*
                      ALTERAÇÃO 3: Imagem do Lírio
                      - Aumentada a largura (w) e altura (h) nos breakpoints md: e lg: para acompanhar o texto maior.
                      - Ajustada a margem negativa vertical (-my) em md: para centralizar melhor.
                  */}
                    <div className="relative w-24 h-28 sm:w-32 sm:h-36 md:w-44 md:h-52 lg:w-52 lg:h-64 shrink-0 -my-4 md:-my-8">
                      <Image
                        src="/lirio.png"
                        alt="Lírio Ray Resina"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </GradientText>

                <p className="text-slate-600 text-base sm:text-lg md:text-base lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                  Descubra a beleza da resina artesanal. Peças exclusivas feitas
                  à mão para trazer elegância, cor e personalidade para sua
                  casa.
                </p>

                {/* Botões */}
                {/* Adicionado 'md:flex-row' e 'md:w-auto' para garantir que fiquem lado a lado no tablet */}
                <div className="flex flex-col sm:flex-row md:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto md:w-auto">
                  <Link
                    href="/catalogo"
                    // ALTERAÇÃO 4: Botões menores no tablet (md:)
                    // Reduzi px, py e text-size especificamente no 'md:' para caberem lado a lado.
                    // Eles voltam a crescer no 'lg:'.
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-base sm:text-lg md:text-base lg:text-lg rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:scale-105 transition-all group w-full sm:w-auto md:w-auto"
                  >
                    Ver Coleção
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/sobre"
                    // Mesma alteração de redução de tamanho no breakpoint 'md:'
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-slate-50 text-slate-700 font-bold text-base sm:text-lg md:text-base lg:text-lg rounded-full shadow-sm border-2 border-slate-200 hover:border-pink-200 hover:text-pink-600 transition-all w-full sm:w-auto md:w-auto"
                  >
                    Nossa História
                  </Link>
                </div>
              </div>
            </div>

            {/* --- Lado da Imagem de Destaque --- */}
            <div className="flex-1 relative w-full max-w-sm sm:max-w-md md:max-w-full mx-auto md:mx-0 mt-4 md:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-pink-200 to-purple-200 rounded-full blur-3xl opacity-50 -z-10"></div>

              {/* Imagem Principal */}
              <div className="relative aspect-4/5 md:aspect-square rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(236,72,153,0.2)] border-4 border-white rotate-3 hover:rotate-0 transition-all duration-700 z-20">
                <Image
                  src="/logo.jpeg"
                  alt="Peça de resina destaque"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">
                Favoritos
              </span>
              <SectionTitle title="Os mais amados do ateliê" className="mb-0" />
            </div>
            <Link
              href="/catalogo"
              className="group flex items-center gap-2 text-slate-600 font-bold hover:text-pink-600 transition-colors pb-2 border-b-2 border-transparent hover:border-pink-300"
            >
              Ver todos os produtos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid de Produtos (Reutilizando o ProductCard) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                category={
                  categories.find((cat) => cat.id === product.categoryId)
                    ?.name || "Sem Categoria"
                }
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 px-6 relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-white to-transparent -z-10"></div>

        <div className="container mx-auto">
          <SectionTitle
            title="Explore por Categoria"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                // Link para o catálogo já filtrado pela categoria
                // NOTA: Isso requer uma pequena lógica na página do catálogo para ler a URL,
                // mas por enquanto, vamos mandar para o catálogo geral.
                href={`/catalogo`}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Imagem de fundo da categoria */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                {/* Conteúdo */}
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-3xl font-extrabold text-white mb-2">
                    {cat.name}
                  </h3>
                  <span className="flex items-center gap-2 text-white/90 font-medium group-hover:text-white group-hover:gap-4 transition-all">
                    Explorar <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
