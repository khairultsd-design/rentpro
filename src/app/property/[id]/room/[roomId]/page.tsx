import { notFound } from "next/navigation";

import TextInput from "@/components/form/TextInput";
import { getRoomById } from "@/features/room/services/room.service";
import { updateRoom } from "@/features/room/actions/room.actions";

type PageProps = {
  params: Promise<{
    id: string;
    roomId: string;
  }>;
};

export default async function EditRoomPage({
  params,
}: PageProps) {
  const { id, roomId } = await params;

  const room = await getRoomById(roomId);

  if (!room) {
    notFound();
  }

  async function save(formData: FormData) {
    "use server";

    await updateRoom(roomId, id, formData);
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Room
      </h1>

      <form
        action={save}
        className="max-w-2xl rounded-xl bg-white p-8 shadow"
      >
        <TextInput
          name="roomNumber"
          label="Room Number"
          defaultValue={room.roomNumber}
        />

        <TextInput
          name="floor"
          label="Floor"
          defaultValue={room.floor ?? ""}
          required={false}
        />

        <TextInput
          name="monthlyRent"
          label="Monthly Rent"
          type="number"
          defaultValue={room.monthlyRent}
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}