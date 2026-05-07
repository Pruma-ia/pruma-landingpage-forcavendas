import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <div className={cn("inline-flex items-center gap-3 mb-4", className)}>
      {/* Linha horizontal ciano 32px — sempre ciano independente do tone */}
      <span
        className="w-eyebrow-line h-px bg-pruma-cyan flex-shrink-0"
        aria-hidden="true"
      />
      {/* Texto UPPERCASE JetBrains Mono 12px tracking 0.12em */}
      <span
        className={cn(
          "font-mono text-xs font-normal uppercase tracking-eyebrow",
          tone === "dark" ? "text-pruma-cyan" : "text-pruma-navy-deep"
        )}
      >
        {children}
      </span>
    </div>
  );
}
