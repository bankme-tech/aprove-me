import CreatePayableForm from "@/components/payable/create-payable";
import PayableTable from "@/components/payable/payable-table";

export default function page() {

  return (
    <div className="py-8 container flex flex-col justify-center">
      <div className="flex self-start my-4">
        <CreatePayableForm />
      </div>
      <PayableTable />
    </div>
  );
}
