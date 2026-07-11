"use client";

import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import { createUserAction } from "../actions/user.action";

export default function UserForm() {
  return (
    <form
      action={createUserAction}
      className="max-w-xl rounded-xl bg-white p-6 shadow"
    >
      <TextInput
        name="name"
        label="Full Name"
        placeholder="Enter full name"
      />

      <TextInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email"
      />

      <TextInput
        name="password"
        label="Password"
        type="password"
        placeholder="Enter password"
      />

      <SelectInput
        name="role"
        label="Role"
        options={[
          {
            label: "Admin",
            value: "ADMIN",
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
        Create User
      </button>
    </form>
  );
}