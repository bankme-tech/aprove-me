import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="h-[80px] flex items-center justify-between sticky top-0 z-50 w-full bg-white shadow-sm px-4">
        <div className="flex-shrink-0">
          <Link to="/payable">
            <h1>AproveMe</h1>
          </Link>
        </div>

        <nav className="flex-shrink-0">
          <Link to="/payable/create">Create payable</Link>
          <Link to="/assignor/create" className="ml-4">
            Create assignor
          </Link>
        </nav>
      </header>
      <main className="w-full h-full overflow-auto">{children}</main>
    </>
  );
}
