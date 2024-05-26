import { PaginationParams } from "@/core/repositories/pagination-params";
import { Payable } from "../../enterprise/entities/payable";
import { PayableWithAssignor } from "../../enterprise/entities/value-object/payable-with-assignor";

export interface PaginatedPayables {
  payables: Payable[],
  totalCount: number;
}

export abstract class PayablesRepository {
  abstract create(payable: Payable): Promise<void>;
  abstract update(payable: Payable): Promise<void>;
  abstract delete(payable: Payable): Promise<void>;

  abstract findByid(id: string): Promise<Payable | null>;
  abstract findWithAssignorById(
    id: string
  ): Promise<PayableWithAssignor | null>;

  abstract findManyPaginated(params: PaginationParams): Promise<PaginatedPayables>;
}
