import { AssignorDto } from "@/app/assignor/dto/assignor.dto";

export interface ReceivableDto {
    id: string;
    emissionDate: Date;
    value: number;
    assignor: AssignorDto;
    assignorId: string;
}
