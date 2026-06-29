"use client";

import { useTransition } from "react";
import { deleteRoom } from "../actions/room.actions";

type DeleteRoomButtonProps = {
  roomId: string;
};

export default function DeleteRoomButton({
  roomId,
}: DeleteRoomButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteRoom(roomId);
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