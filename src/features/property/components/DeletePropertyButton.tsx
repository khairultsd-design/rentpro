"use client";

import { useTransition } from "react";
import { deleteProperty } from "../actions/property.actions";

type DeletePropertyButtonProps = {
  propertyId: string;
};

export default function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    startTransition(async () => {
  const result = await deleteProperty(propertyId);

  if (!result.success) {
    alert(result.message);
  }
});
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}