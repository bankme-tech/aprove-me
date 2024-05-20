import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="mt-4">
              <DialogDescription>Faça o seu login para poder fazer alterações e adicionar pagáveis e cedentes</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="login" className="text-right">
                  Login
                </Label>
                <Input id="login" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" className="col-span-3" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Login</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
