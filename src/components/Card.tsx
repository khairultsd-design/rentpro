import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export default function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        {title}
      </h2>

      {children}
    </div>
  );
}