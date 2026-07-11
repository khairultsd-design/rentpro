import SearchBox from "@/components/SearchBox";
import PageHeader from "@/components/PageHeader";
import InvoiceTable from "@/features/invoice/components/InvoiceTable";
import { generateInvoicesAction } from "@/features/invoice/actions/invoice.actions";
import { getInvoices } from "@/features/invoice/services/invoice.service";

type PageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function InvoicesPage({
  searchParams,
}: PageProps) {
  const { search } = await searchParams;

  const invoices = await getInvoices(search);

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Manage rental invoices"
        actions={
          <form action={generateInvoicesAction}>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
            >
              Generate Monthly Invoices
            </button>
          </form>
        }
      >
        <SearchBox
          placeholder="Search invoice..."
          defaultValue={search}
        />
      </PageHeader>

      <InvoiceTable invoices={invoices} />
    </>
  );
}