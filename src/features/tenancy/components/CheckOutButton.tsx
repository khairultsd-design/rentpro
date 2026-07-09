"use client";

import { useTransition } from "react";
import { checkOutTenant } from "../actions/tenancy.actions";

type Props = {
  propertyId: string;
  tenancyId: string;
};

export default function CheckOutButton({
  propertyId,
  tenancyId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        const confirmed = window.confirm(
          "Are you sure you want to check out this tenant?"
        );

        if (!confirmed) return;

        startTransition(async () => {
          await checkOutTenant(propertyId, tenancyId);
        });
      }}
      disabled={isPending}
      className="ml-3 text-red-600 hover:underline disabled:opacity-50"
    >
      {isPending ? "Checking Out..." : "Check Out"}
    </button>
  );
}