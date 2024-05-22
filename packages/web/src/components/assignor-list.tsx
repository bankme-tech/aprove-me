import Link from "next/link";
import { Button } from "./ui/button";
import AssignorCard from "./assignor-card";
import getAssignors from "@/api/getAssignors";

export async function AssignorList() {
  const data = await getAssignors();

  return (
    <div className="flex flex-col items-end max-w-7xl w-full mx-auto mt-5">
      <Link href="assignors/create">
        <Button className="mb-5">Cadastrar novo cedente</Button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-14">
        {data?.map((assignor) => <AssignorCard assignor={assignor} key={assignor.id} />)}
      </div>
    </div>
  );
}
