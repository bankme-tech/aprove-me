import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Image src="/logo-bankme.png" width={50} height={50} alt="Bankme Logo" />
        <div>
          <h1 className="font-bold">Aprove me</h1>
          <p className="text-sm text-gray-500">Gestão de pagáveis</p>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-gray-500">
        <Button variant="outline">Pagáveis</Button>
        <Button variant="outline">Cedentes</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
}
