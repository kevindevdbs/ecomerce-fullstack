interface GradientTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span"; // Flexibilidade na tag HTML
  className?: string;
}

export default function GradientText({
  children,
  as: Tag = "span",
  className = "",
}: GradientTextProps) {
  return (
    <Tag
      className={`text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 ${className}`}
    >
      {children}
    </Tag>
  );
}
