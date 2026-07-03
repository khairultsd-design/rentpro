import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import { checkInTenant } from "../actions/tenancy.actions";

type RoomOption = {
  id: string;
  roomNumber: string;
};

type Props = {
  propertyId: string;
  tenantId: string;
  rooms: RoomOption[];
};

export default function CheckInForm({
  propertyId,
  tenantId,
  rooms,
}: Props) {
  return (
    <form
      action={checkInTenant.bind(null, propertyId, tenantId)}
      className="max-w-xl"
    >
      <SelectInput
        name="roomId"
        label="Room"
        options={rooms.map((room) => ({
          label: room.roomNumber,
          value: room.id,
        }))}
      />

      <TextInput
        name="moveInDate"
        label="Move In Date"
        type="date"
      />

      <TextInput
        name="moveOutDate"
        label="Move Out Date"
        type="date"
        required={false}
      />

      <TextInput
        name="monthlyRental"
        label="Monthly Rental"
        type="number"
      />

      <TextInput
        name="securityDeposit"
        label="Security Deposit"
        type="number"
      />

      <TextInput
        name="utilityDeposit"
        label="Utility Deposit"
        type="number"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Check In
      </button>
    </form>
  );
}