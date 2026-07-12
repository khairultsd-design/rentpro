import CompanyForm from "@/features/company/components/CompanyForm";
import { getCompany } from "@/features/company/services/company.service";
import { requireRole } from "@/lib/auth";

export default async function SettingsPage() {
  const company = await getCompany();
await requireRole(["ADMIN"]);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Settings</h1>

      <CompanyForm company={company as any} />
    </div>
  );
}