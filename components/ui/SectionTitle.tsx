interface SectionTitleProps {
  title: string;
  subtitle?: string; // Adicionamos a propriedade opcional (?)
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-8 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h2>
      {subtitle && (
        <p className="text-slate-500 mt-2 text-lg font-medium">{subtitle}</p>
      )}
    </div>
  );
}
