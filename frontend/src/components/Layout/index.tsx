import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <div className="size-full flex-col flex flex-1 px-4">
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
