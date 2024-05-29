// DTOS
import { CreatePayableDTO } from '@/modules/payable/dtos/create-payable.dto';

export interface IProducerService {
	addPayableToQueue(payable: CreatePayableDTO[]): Promise<void>;
	addPayableToDeadQueue(payable: CreatePayableDTO[]): Promise<void>;
}
