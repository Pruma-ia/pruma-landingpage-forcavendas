import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: "div" | "section" | "article" | "main";
  children: React.ReactNode;
  className?: string;
};

export function Container({
  as: Tag = "div",
  children,
  className,
}: ContainerProps) {
  return (
    <Tag className={cn("max-w-6xl mx-auto px-6 md:px-8", className)}>
      {children}
    </Tag>
  );
}
