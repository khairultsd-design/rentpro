"use client";

import { useTransition } from "react";
import { deleteExpense } from "../actions/expense.actions";

type Props = {
  id: string;
};

export default function DeleteExpenseButton({
  id,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (
          confirm(
            "Are you sure you want to delete this expense?"
          )
        ) {
          startTransition(async () => {
            await deleteExpense(id);
          });
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}