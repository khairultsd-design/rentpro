import { Building2, ChevronDown } from "lucide-react";
import LogoutButton from "../features/user/components/LogoutButton";


export default function Header() {
  return (
    <>
      <header className="border-b border-slate-200 bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                RentPro
              </h1>

              <p className="text-sm text-slate-500">
                Property Management System
              </p>
            </div>
          </div>

          {/* User */}
          <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              F
            </div>

            <div className="text-left">
              <p className="font-semibold text-slate-800">
                Founder
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </header>
      <LogoutButton />
      <div>Logout</div>
    </>
  );
}