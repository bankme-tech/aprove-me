import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { Payable } from "@/@core/domain/entities/payable.entity";
import { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";
import { injectable } from "inversify";

@injectable()
export class LocalStoragePayableGateway implements IPayableGateway {
  private readonly localStorageKey: string = "payables";

  async create(data: CreatePayableInputDTO) {
    const { assignorId, value, emissionDate } = data;
    const fakeId = Math.random().toString(36).substring(7);
    const payable = new Payable(fakeId, value, emissionDate, assignorId);
    const payables = await this.findAll();
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify([...payables, payable])
    );
    return payable;
  }

  findById(id: string): Promise<Payable> | null {
    const payables = localStorage.getItem(this.localStorageKey);
    if (!payables) {
      return null;
    }
    const payable = JSON.parse(payables).find(
      (payable: Payable) => payable.id === id
    );
    if (!payable) {
      return null;
    }
    return Promise.resolve(
      new Payable(
        payable.id,
        payable.value,
        new Date(payable.emissionDate),
        payable.assignorId
      )
    );
  }

  findAll(): Promise<Payable[]> {
    const payables = localStorage.getItem(this.localStorageKey);
    if (!payables) {
      return Promise.resolve([]);
    }
    return Promise.resolve([JSON.parse(payables)]);
  }
}
