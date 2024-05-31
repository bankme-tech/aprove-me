import { Children } from "@/types/children";
import Link from "next/link";

type SidebarLine = Children & {
  title: string;
  link: string;
};

export const SidebarLine = ({ title, link, children }: SidebarLine) => {
  return (
    <Link href={link}>
      <button
        type="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      >
        <div className="grid place-items-center mr-4">{children}</div>
        {title}
      </button>
    </Link>
  );
};
