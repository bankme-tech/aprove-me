'use client';

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

export default function DashBoard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ver Movimentaçoes</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lista de Movimentaçoes</DialogTitle>
            <DialogDescription>
              Aqui está disponível a sua lista de movimentação dos Recebíveis e seus Cedentes
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nvalue" className="text-right">
               Valor: 
              </Label>
            
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Data de Emissão: 
              </Label>
             
    
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Id: 
              </Label>
             
            
            </div>
          </div>
          <DialogFooter>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
