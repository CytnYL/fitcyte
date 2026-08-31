import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "btn-pop px-8 py-3.5 text-base",
  secondary: "btn-glass px-8 py-3.5 text-base",
  ghost:
    "bg-transparent text-foreground hover:text-accent disabled:opacity-50 px-4 py-2 text-sm",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center font-bold cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
