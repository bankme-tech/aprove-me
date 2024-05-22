import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";

type SidebarContent = {
  children: ReactNode;
};
export const SidebarContent = ({ children }: SidebarContent) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-1/3 lg:w-[20rem]">
        <Sidebar />
      </div>
      <div className="w-2/3 lg:flex-grow lg:pl-4">{children}</div>
    </div>
  );
};
