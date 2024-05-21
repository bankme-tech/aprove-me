"use client";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import UpdateAssignor from "./update-assignor";
import { useGetAssignorById } from "@/hooks/useGetAssignorById";

export default function AssignorDetails() {
  const params = useParams();
  const { data, isPending } = useGetAssignorById(params.id as string);

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignor Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>ID:</strong>
            <span>{data?.id}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Name:</strong>
            <span>{data?.name}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Document:</strong>
            <span>{data?.document}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Email:</strong>
            <span>{data?.email}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Phone:</strong>
            <span>{data?.phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-4 ml-auto">
          <UpdateAssignor assignor={data!} />
        </div>
      </CardFooter>
    </Card>
  );
}
