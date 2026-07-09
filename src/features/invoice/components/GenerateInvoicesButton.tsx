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
          const result = await generateInvoicesAction();

          alert(
            `✅ Monthly Invoice Generation Complete

Created : ${result.created}
Skipped : ${result.skipped}`
          );
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