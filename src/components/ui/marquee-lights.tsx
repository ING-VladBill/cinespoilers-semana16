interface Props {
  count?: number;
  className?: string;
}

export function MarqueeLights({ count = 24, className = "" }: Props) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_6px_2px_var(--color-primary)] motion-reduce:animate-none"
          style={{ animationDelay: `${(i % 6) * 150}ms`, animationDuration: "2.4s" }}
        />
      ))}
    </div>
  );
}