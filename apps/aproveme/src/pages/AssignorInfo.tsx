import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Assignor } from "../lib/types";
import { fetchAssignor } from "../lib/resolvers/assignorResolvers";
import Skeleton from "react-loading-skeleton";

export default function AssignorInfoPage() {
  const { id } = useParams();

  const {
    data: assignor,

    isLoading,
  } = useQuery<Assignor, Error>({
    queryKey: ["assignor", id],
    queryFn: () => fetchAssignor(id!),
  });

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Assignor Information</CardTitle>
          <CardDescription>Details about the assignor.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {isLoading && <Skeleton count={2} height={30} />}
          {!isLoading && !assignor && (
            <p className="text-center text-gray-500">Assignor not found :(</p>
          )}
          {!isLoading && assignor && (
            <>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">Name</p>
                <p className="text-gray-500">{assignor.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">Email</p>
                <p className="text-gray-500">{assignor.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">Document</p>
                <p className="text-gray-500">{assignor.document}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">Phone Number</p>
                <p className="text-gray-500">{assignor.phone}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
