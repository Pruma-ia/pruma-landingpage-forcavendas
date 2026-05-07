import { cn } from "@/lib/utils";

type CardProps = {
  interactive?: boolean;
  as?: "div" | "article" | "li";
  children: React.ReactNode;
  className?: string;
};

export function Card({
  interactive = true,
  as: Tag = "div",
  children,
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-white border border-pruma-gray-soft rounded-pruma-md p-8 shadow-pruma-sm",
        interactive &&
          "transition-[transform,border-color] duration-[250ms] ease-out cursor-pointer hover:-translate-y-0.5 hover:border-pruma-cyan-light",
        className
      )}
    >
      {children}
    </Tag>
  );
}
