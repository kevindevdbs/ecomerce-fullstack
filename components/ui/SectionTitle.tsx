interface SectionTitleProps {
  title: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  align = "center",
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`text-2xl md:text-3xl font-bold text-slate-800 mb-8 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {title}
    </h2>
  );
}
