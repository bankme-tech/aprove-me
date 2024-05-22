import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function AssignorInfoPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Assignor Information</CardTitle>
          <CardDescription>Details about the assignor.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Name</p>
            <p className="text-gray-500">John Doe</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Email</p>
            <p className="text-gray-500">john@example.com</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Document</p>
            <p className="text-gray-500">Document details</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Phone Number</p>
            <p className="text-gray-500">123-456-7890</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
