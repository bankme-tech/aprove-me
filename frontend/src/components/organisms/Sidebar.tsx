import { useMemo } from "react";
import { SidebarLine } from "../molecules/SidebarLine";

export const Sidebar = () => {
  const lines = useMemo(
    () => [
      { title: "Pagáveis", icon: "" },
      { title: "Cedentes", icon: "" },
      { title: "Log Out", icon: "" },
    ],
    []
  );

  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
          Material Tailwind
        </h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {lines.map((line) => (
          <SidebarLine key={line.title} title={line.title} />
        ))}
      </nav>
    </div>
  );
};
