import TextInput from "@/components/form/TextInput";

export default function NewPropertyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Add Property
      </h1>

      <div className="bg-white rounded-xl shadow p-8 max-w-3xl">

        <TextInput
          label="Property Name"
          placeholder="Example: Intan Apartment"
        />

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Property Type
          </label>

          <select className="w-full border rounded-lg p-3">
            <option>Apartment</option>
            <option>Condominium</option>
            <option>Landed</option>
            <option>Studio</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Save Property
        </button>

      </div>
    </>
  );
}