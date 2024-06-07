import { CreateReceivableDto } from "@/app/receivable/dto/createReceivable.dto";

export interface ReceivableContract {
    receivable: CreateReceivableDto;
    email: string;
    name: string;
    total: number;
}
