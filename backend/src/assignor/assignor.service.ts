import { Injectable } from "@nestjs/common";
import { Assignor } from "./assignor.model";

@Injectable()
export class AssignorService {
    getAllAssignors() {}

    getAssignorById(id: string) {}

    saveAssignor(assignor: Assignor) {}
}