import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-sans text-sm font-medium min-h-[44px] px-6 py-3.5 rounded-pruma-sm transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<"primary" | "ghost", string> = {
  primary:
    "bg-pruma-navy text-white shadow-pruma-sm hover:bg-pruma-navy-mid hover:-translate-y-1 hover:shadow-pruma-cyan active:translate-y-0 active:shadow-pruma-sm active:bg-pruma-navy disabled:hover:translate-y-0 disabled:hover:shadow-pruma-sm disabled:hover:bg-pruma-navy",
  ghost:
    "bg-transparent text-pruma-navy border border-pruma-navy hover:bg-pruma-cyan-pale hover:-translate-y-1 active:translate-y-0 active:bg-pruma-cyan-pale disabled:hover:translate-y-0 disabled:hover:bg-transparent",
};

export function Button({
  variant = "primary",
  href,
  iconLeft,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, disabled && "pointer-events-none opacity-50")}
        aria-disabled={disabled}
      >
        {iconLeft && (
          <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>
        )}
        {children}
        {iconRight && (
          <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>
        )}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {iconLeft && (
        <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>
      )}
      {children}
      {iconRight && (
        <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>
      )}
    </button>
  );
}
