import { AssignorDto } from "src/app/assignor/dto/assignor.dto";

export interface ReceivableDto {
    id: string;
    emissionDate: Date;
    value: number;
    assignor: AssignorDto;
    assignorId: string;
}
