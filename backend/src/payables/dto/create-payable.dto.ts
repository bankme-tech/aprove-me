import { IsNumber, IsUUID } from "class-validator";
import { AssignorExists } from "../../utils/assignor-exists.validator";

export class CreatePayableDto {
    
    @IsNumber()
    value: number;
    
    @IsUUID()
    @AssignorExists()
    assignorId: string;
}
