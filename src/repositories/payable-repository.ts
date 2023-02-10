import { CreatePayableAssignorBody } from "src/dtos/create-payable-assignor-body";
import { CreatePayableBody } from "src/dtos/create-payable-body";
import { UpdatePayable } from "src/dtos/update-payable";

export abstract class PayableRepository {
    abstract payable(data: CreatePayableAssignorBody);

    abstract addPayable(data: CreatePayableBody);

    abstract getPayable(id: string);

    abstract getpayableAll();

    abstract updatePayable(id: string, body: UpdatePayable);

    abstract deletePayable(id: string);



}


