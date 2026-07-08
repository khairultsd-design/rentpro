type SearchBoxProps = {
  placeholder: string;
  defaultValue?: string;
};

export default function SearchBox({
  placeholder,
  defaultValue,
}: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-72 rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500"
    />
  );
}
