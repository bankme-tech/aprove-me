import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { PayablesRepository } from "../repositories/payables-repository";
import { Payable } from "../../enterprise/entities/payable";

interface FetchPaginatedPayablesServiceRequest {
  page: number;
}

type FetchPaginatedPayablesServiceResponse = Either<
  null,
  {
    payables: Payable[];
  }
>;

@Injectable()
export class FetchPaginatedPayablesService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    page,
  }: FetchPaginatedPayablesServiceRequest): Promise<FetchPaginatedPayablesServiceResponse> {
    const payables = await this.payablesRepo.findManyPaginated({ page });

    return right({
      payables,
    });
  }
}
