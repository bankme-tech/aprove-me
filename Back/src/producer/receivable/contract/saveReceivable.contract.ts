import { CreateReceivableDto } from "@/app/receivable/dto/createReceivable.dto";

export class SaveReceivableContract {
    receivable: CreateReceivableDto;
    email: string;
    name: string;
    total: number;
}
