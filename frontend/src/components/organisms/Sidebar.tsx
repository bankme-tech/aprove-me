import { useMemo } from "react";
import { SidebarLine } from "../molecules/SidebarLine";

export const Sidebar = () => {
  const lines = useMemo(
    () => [
      { title: "Pagáveis", icon: "", link: "/payable" },
      { title: "Cedentes", icon: "", link: "/assignor" },
      { title: "Log Out", icon: "", link: "#" },
    ],
    []
  );

  return (
    <div className="h-screen relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700  w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">{/* <Logo /> */}</div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {lines.map((line) => (
          <SidebarLine key={line.title} title={line.title} link={line.link} />
        ))}
      </nav>
    </div>
  );
};
