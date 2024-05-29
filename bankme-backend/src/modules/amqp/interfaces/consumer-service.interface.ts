// DTOS
import { CreatePayableDTO } from '@/modules/payable/dtos/create-payable.dto';

export interface IConsumerService {
	consumePayableQueue(payable: CreatePayableDTO[]): Promise<void>;
}
