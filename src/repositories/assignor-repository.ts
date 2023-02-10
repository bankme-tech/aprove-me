import { CreateAssignorBody } from "src/dtos/create-assignor-body";
import { UpdateAssignor } from "src/dtos/update-assignor";

export abstract class AssignorRepository{
    abstract addAssignor(data: CreateAssignorBody);

    abstract getAssignor(id: number);

    abstract getAssignorAll();   
    
    abstract updateAssignor(id: number, body: UpdateAssignor);
    
    abstract deleteAssignor(id: string);

}