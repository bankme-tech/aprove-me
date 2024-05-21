import AssignorTable from "@/components/assignor/assignor-table";
import CreateAssignor from "@/components/assignor/create-assignor";

export default function page() {
  return (
    <div className="py-8 container flex flex-col justify-center">
      <div className="flex self-start my-4">
        <CreateAssignor />
      </div>
      <AssignorTable />
    </div>
  );
}
