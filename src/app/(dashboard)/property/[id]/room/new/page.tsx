import { redirect } from "next/navigation";
import TextInput from "@/components/form/TextInput";
import { createRoom } from "@/features/room/actions/room.actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewRoomPage({
  params,
}: PageProps) {
  const { id } = await params;

  async function saveRoom(formData: FormData) {
    "use server";

    await createRoom({
      propertyId: id,
      roomNumber: formData.get("roomNumber") as string,
      floor: (formData.get("floor") as string) || undefined,
      monthlyRent: Number(formData.get("monthlyRent")),
    });

    redirect(`/property/${id}`);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Add Room
      </h1>

      <form
        action={saveRoom}
        className="bg-white rounded-xl shadow p-8 max-w-2xl"
      >
        <TextInput
          name="roomNumber"
          label="Room Number"
          placeholder="Example: A1"
        />

        <TextInput
          name="floor"
          label="Floor"
          placeholder="Example: Level 2"
          required={false}
        />

        <TextInput
          name="monthlyRent"
          label="Monthly Rent (RM)"
          type="number"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Room
        </button>
      </form>
    </>
  );
}