import { CreateAssignorBody } from "src/dtos/create-assignor-body";
import { UpdateAssignor } from "src/dtos/update-assignor";
export declare abstract class AssignorRepository {
    abstract addAssignor(data: CreateAssignorBody): any;
    abstract getAssignor(id: number): any;
    abstract getAssignorAll(): any;
    abstract updateAssignor(id: number, body: UpdateAssignor): any;
    abstract deleteAssignor(id: string): any;
}
