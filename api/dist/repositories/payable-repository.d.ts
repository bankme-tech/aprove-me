import { CreatePayableAssignorBody } from "src/dtos/create-payable-assignor-body";
import { CreatePayableBody } from "src/dtos/create-payable-body";
import { UpdatePayable } from "src/dtos/update-payable";
export declare abstract class PayableRepository {
    abstract payable(data: CreatePayableAssignorBody): any;
    abstract addPayable(data: CreatePayableBody): any;
    abstract getPayable(id: string): any;
    abstract getpayableAll(): any;
    abstract updatePayable(id: string, body: UpdatePayable): any;
    abstract deletePayable(id: string): any;
}
