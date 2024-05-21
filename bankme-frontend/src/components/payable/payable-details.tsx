import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Payable } from "@/services/payable";
import { formatDate } from "@/utils/date-formatter";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  payable: Payable;
}

export default function PayableDetails({ open, onOpenChange, payable }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payable Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>ID:</strong>
            <span>{payable.id}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Value:</strong>
            <span>{payable.value}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Emission Date:</strong>
            <span>{formatDate(payable.emissionDate)}</span>
          </div>

          <div className="flex items-center gap-1 p-2 hover:bg-secondary">
            <strong>Assignor ID:</strong>
            <span>{payable.assignorId}</span>
          </div>

          <Link
            href={`/assignor/${payable.assignorId}`}
            className={buttonVariants({ variant: "link", className: 'w-max mx-auto' })}
          >
            See assignor details
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
