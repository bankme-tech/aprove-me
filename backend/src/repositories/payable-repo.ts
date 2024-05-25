import { PayableDto } from '../DTOs/payable';

export abstract class PayableRepo {
  abstract createPayable(body: PayableDto): Promise<PayableDto>;
  abstract getPayableById(id: string): Promise<PayableDto>;
  abstract getAllPayables(): Promise<PayableDto[]>;
  abstract updatePayable(id: string, body: PayableDto): Promise<PayableDto>;
  abstract deletePayable(id: string): Promise<void>;
}
