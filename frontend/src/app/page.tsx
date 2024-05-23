import Image from "next/image";
import PayablesTable from "./components/PayablesTable";

export default function Home() {
  return (
    <main className="min-h-screen md:py-12 container mx-auto">
      <PayablesTable />
    </main>
  );
}
