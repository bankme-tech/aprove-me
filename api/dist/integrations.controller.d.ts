import { CreateAssignorBody } from './dtos/create-assignor-body';
import { CreatePayableAssignorBody } from './dtos/create-payable-assignor-body';
import { CreatePayableBody } from './dtos/create-payable-body';
import { UpdateAssignor } from './dtos/update-assignor';
import { UpdatePayable } from './dtos/update-payable';
import { AssignorRepository } from './repositories/assignor-repository';
import { PayableRepository } from './repositories/payable-repository';
export declare class IntegrationsController {
    private assignorRepository;
    private payableRepository;
    constructor(assignorRepository: AssignorRepository, payableRepository: PayableRepository);
    payable(body: CreatePayableAssignorBody): Promise<any>;
    addAssignor(body: CreateAssignorBody): Promise<any>;
    addPayable(body: CreatePayableBody): Promise<any>;
    getPayable(params: any): Promise<any>;
    payableAll(): Promise<any>;
    getAssignor(params: any): Promise<any>;
    assignorAll(): Promise<any>;
    updatePayable(params: any, body: UpdatePayable): Promise<any>;
    updateAssignor(params: any, body: UpdateAssignor): Promise<any>;
    deletePayable(params: any): Promise<any>;
    deleteAssignor(params: any): Promise<any>;
}
