import { SidebarContent } from "@/components/layout/SidebarContent";

const DashboardLayout = ({
  children, // will be a page or nested layout
}: any) => {
  return (
    <section>
      <SidebarContent>{children}</SidebarContent>
    </section>
  );
};

export default DashboardLayout;
