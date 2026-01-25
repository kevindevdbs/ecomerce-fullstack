import GradientText from "../ui/GradientText";

export default function CatalogHero() {
  return (
    <div className="mb-8">
      <GradientText
        as="h1"
        className="text-3xl md:text-5xl font-extrabold mb-6 md:mb-8 leading-tight py-2"
      >
        Catálogo Completo
      </GradientText>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Explore nossa coleção de peças únicas. Use a busca ou os filtros para
        encontrar exatamente o que você procura.
      </p>
    </div>
  );
}
