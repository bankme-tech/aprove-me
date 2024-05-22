import { formatCurrency } from "@/lib/utils";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";



interface PayableCardProps {
    id: string;
    value: number;
    date: string;
}

export function PayableCard({ id, value, date }: PayableCardProps) {

  return (
    <div className="flex flex-col items-center p-4  gap-2 rounded-lg  border border-blue-800">
        <h4 className="text-sm">ID: {id}</h4>
        <h3 className="text-4xl font-semibold">{formatCurrency(value)}</h3>
        <time
            dateTime={date}
            className="text-xs text-gray-500"
        >
            Created at {new Date(date).toLocaleDateString()}
        </time>
        <Link
            href={`/payable/${id}`}
            className="text-blue-500 underline hover:text-blue-400 mt-4"
        >
            <SquareArrowOutUpRight/>
        </Link>
        
    </div>
  );
}