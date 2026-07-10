import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
  className?: string;
};

export default function Table({
  children,
  className = "",
}: TableProps) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        ${className}
      `}
    >
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}