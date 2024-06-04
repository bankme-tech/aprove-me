import { AssignorDto } from "src/app/assignor/dto/assignor.dto";

export interface ReceivableDto {
    id: string;
    emissionDate: string;
    value: string;
    assignor: AssignorDto;
}
