type SelectInputProps = {
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  required?: boolean;
};

export default function SelectInput({
  name,
  label,
  options,
  defaultValue,
  required = true,
}: SelectInputProps) {
  console.log("SelectInput =", SelectInput);
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">
        {label}
      </label>

      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full border rounded-lg p-3"
      >
        <option value="">-- Select --</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}