import { logoutAction } from "../actions/auth.action";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </form>
  );
}