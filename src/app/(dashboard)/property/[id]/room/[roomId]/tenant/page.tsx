import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
    roomId: string;
  }>;
};

export default async function TenantPage({
  params,
}: PageProps) {
  const { id } = await params;

  redirect(`/property/${id}`);
}