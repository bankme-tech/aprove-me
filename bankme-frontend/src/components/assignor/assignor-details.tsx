"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateAssignor from "./update-assignor";
import { deleteAssignor } from "@/services/assignor";
import { useGetAssignorById } from "@/hooks/useGetAssignorById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AssignorDetails() {
  const router = useRouter();
  const params = useParams();
  const { data, isPending } = useGetAssignorById(params.id as string);
  const queryClient = useQueryClient();
  const { mutate: deleteAssignorMutation } = useMutation({
    mutationFn: deleteAssignor,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get-assignor-by-id", data?.id],
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-assignor"] });
      router.push("/assignor");
    },
  });

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
          <Button
            onClick={() => deleteAssignorMutation(data?.id!)}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
