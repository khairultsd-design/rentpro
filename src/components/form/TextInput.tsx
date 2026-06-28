type TextInputProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

export default function TextInput({
  label,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}