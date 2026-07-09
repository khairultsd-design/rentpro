type ReportFilterProps = {
  month: number;
  year: number;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ReportFilter({
  month,
  year,
}: ReportFilterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <form
      method="GET"
      className="mb-6 flex flex-wrap items-end gap-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Month
        </label>

        <select
          name="month"
          defaultValue={month}
          className="rounded-lg border px-3 py-2"
        >
          {months.map((name, index) => (
            <option
              key={name}
              value={index + 1}
            >
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Year
        </label>

        <select
          name="year"
          defaultValue={year}
          className="rounded-lg border px-3 py-2"
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const y = currentYear - 2 + index;

            return (
              <option
                key={y}
                value={y}
              >
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Apply
      </button>
    </form>
  );
}