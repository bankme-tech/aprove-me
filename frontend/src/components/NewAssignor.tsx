import CreateAssignorForm from "./CreateAssignorForm";
import CreatePayableForm from "./CreatePayableForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


export function NewAssignor() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Assignor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Assignor</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <CreateAssignorForm />
        </div>

      </DialogContent>
    </Dialog>
  );
}