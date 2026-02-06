import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "../../../../components/ui/SectionTitle";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 bg-slate-50 px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-white to-transparent -z-10" />
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
              href="/catalogo"
              className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

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
  );
}
