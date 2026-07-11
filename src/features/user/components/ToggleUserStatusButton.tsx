"use client";

import { toggleUserStatusAction } from "../actions/user.action";

type Props = {
  id: string;
  isActive: boolean;
};

export default function ToggleUserStatusButton({
  id,
  isActive,
}: Props) {
  return (
    <form
      action={toggleUserStatusAction.bind(
        null,
        id,
        isActive
      )}
      className="inline"
    >
      <button
        type="submit"
        className={`ml-4 ${
          isActive
            ? "text-red-600"
            : "text-green-600"
        } hover:underline`}
      >
        {isActive
          ? "Deactivate"
          : "Activate"}
      </button>
    </form>
  );
}