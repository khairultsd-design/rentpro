import { notFound } from "next/navigation";
import UserForm from "@/features/user/components/UserForm";
import { getUserById } from "@/features/user/services/user.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({
  params,
}: PageProps) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Edit User
      </h1>

      <UserForm user={user} />
    </div>
  );
}