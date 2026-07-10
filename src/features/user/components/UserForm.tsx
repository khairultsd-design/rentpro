"use client";

import { createUserAction } from "../actions/user.action";

export default function UserForm() {
  return (
    <form
      action={createUserAction}
      className="max-w-xl space-y-4"
    >
      <input
        name="name"
        placeholder="Full Name"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border p-3"
        required
      />

      <select
        name="role"
        className="w-full rounded-lg border p-3"
      >
        <option value="STAFF">Staff</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Create User
      </button>
    </form>
  );
}