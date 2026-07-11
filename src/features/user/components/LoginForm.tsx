"use client";

import { loginAction } from "../actions/auth.action";

export default function LoginForm() {
  return (
    <form
      action={loginAction}
      className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow"
    >
      <h1 className="text-2xl font-bold">
        RentPro Login
      </h1>

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

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 p-3 text-white"
      >
        Login
      </button>
    </form>
  );
}