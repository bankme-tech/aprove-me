import CreatePayableForm from "./CreatePayableForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


export function NewPayable() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Payable</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Payable</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <CreatePayableForm />
        </div>

      </DialogContent>
    </Dialog>
  );
}