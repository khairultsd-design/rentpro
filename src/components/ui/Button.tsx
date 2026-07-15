import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  className?: string;

  disabled?: boolean;
  loading?: boolean;
};

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const classes = `
inline-flex items-center justify-center
rounded-xl
px-5
py-2.5
text-sm
font-semibold
transition

${variants[variant]}

${
  disabled || loading
    ? "opacity-60 cursor-not-allowed"
    : ""
}

${className}
`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
  type={type}
  className={classes}
  disabled={disabled || loading}
>
  {loading ? "Processing..." : children}
</button>
  );
}