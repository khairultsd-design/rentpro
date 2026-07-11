"use client";

import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import {
  createUserAction,
  updateUserAction,
} from "../actions/user.action";
import { User } from "@prisma/client";

type UserFormProps = {
  user?: User;
};

export default function UserForm({
  user,
}: UserFormProps) {
  return (
    <form
      action={
        user
          ? updateUserAction.bind(null, user.id)
          : createUserAction
      }
      className="max-w-xl rounded-xl bg-white p-6 shadow"
    >
      <TextInput
        name="name"
        label="Full Name"
        placeholder="Enter full name"
        defaultValue={user?.name}
      />

      <TextInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email"
        defaultValue={user?.email}
      />

      {!user && (
        <TextInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
        />
      )}

      <SelectInput
        name="role"
        label="Role"
        defaultValue={user?.role}
        options={[
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Manager",
    value: "MANAGER",
  },
  {
    label: "Staff",
    value: "STAFF",
  },
]}
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        {user ? "Update User" : "Create User"}
      </button>
    </form>
  );
}