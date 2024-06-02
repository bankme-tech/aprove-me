import { Outlet } from "react-router-dom";
import { Logo } from "../Components/Logo";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex items-center justify-center flex-col gap-16">
        <Logo className="h-12 text-gray-500" />
        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
