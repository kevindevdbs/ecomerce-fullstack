interface BadgeProps {
  children: React.ReactNode;
  className?: string; // Para classes extras opcionais
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
