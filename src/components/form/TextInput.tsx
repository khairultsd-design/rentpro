type TextInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
};

export default function TextInput({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
  required = true,
}: TextInputProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}