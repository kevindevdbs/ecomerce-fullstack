import GradientText from "@/components/ui/GradientText";

interface ProductInfoProps {
  name: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
}

export default function ProductInfo({
  name,
  price,
  shortDescription,
  fullDescription,
}: ProductInfoProps) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
        {name}
      </h1>

      <div className="mb-6 pb-6 border-b border-slate-100">
        <GradientText as="p" className="text-4xl md:text-5xl font-extrabold">
          R$ {price.toFixed(2).replace(".", ",")}
        </GradientText>
      </div>

      <div className="mb-8 space-y-4">
        <p className="text-lg text-slate-700 font-medium">{shortDescription}</p>
        <p className="text-slate-600 leading-relaxed">{fullDescription}</p>
      </div>
    </>
  );
}
