"use client";

import { useTransition } from "react";
import { generateInvoicesAction } from "../actions/invoice.actions";

export default function GenerateInvoicesButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await generateInvoicesAction();

          alert("✅ Monthly Invoice Generation Complete");
        })
      }
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
    >
      {isPending
        ? "Generating..."
        : "🧾 Generate Monthly Invoices"}
    </button>
  );
}