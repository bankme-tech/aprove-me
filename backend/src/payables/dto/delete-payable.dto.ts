import { IsUUID } from 'class-validator';
import { AssignorExists } from 'src/utils/assignor-exists.validator';

export class DeletePayableDto {
    @IsUUID()
    @AssignorExists()
    id: string;
}
