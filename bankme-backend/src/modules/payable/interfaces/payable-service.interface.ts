import { Payable } from '@prisma/client';

// DTOS
import { CreatePayableDTO } from '../dtos/create-payable.dto';
import { UpdatePayableDTO } from '../dtos/update-payable.dto';

export interface IPayableService {
	createPayable(data: CreatePayableDTO): Promise<Payable>;
	createPayableBatch(data: CreatePayableDTO[]): Promise<boolean>;
	findAllPayable(): Promise<Payable[]>;
	findOnePayable(payableId: string): Promise<Payable>;
	updatePayable(payableId: string, data: UpdatePayableDTO): Promise<Payable>;
	removePayable(payableId: string): Promise<Payable>;
}
