import { CreatePayableAssignorBody } from "src/dtos/create-payable-assignor-body";
import { CreatePayableBody } from "src/dtos/create-payable-body";
import { UpdatePayable } from "src/dtos/update-payable";
import { PayableRepository } from "./payable-repository";

class MockPayableRepository implements PayableRepository {
  payableData: any[] = [];
  
  payable(data: CreatePayableAssignorBody) {
    this.payableData.push(data);
  }
  addPayable(data: CreatePayableBody) {
    this.payableData.push(data);
  }
  getPayable(id: string) {
    return this.payableData.find(x => x.id === id);
  }
  getpayableAll() {
    return this.payableData;
  }
  updatePayable(id: string, body: UpdatePayable) {
    const index = this.payableData.findIndex(x => x.id === id);
    this.payableData[index] = { ...this.payableData[index], ...body };
  }
  deletePayable(id: string) {
    this.payableData = this.payableData.filter(x => x.id !== id);
  }
}


describe("PayableRepository", () => {
  let payableRepository: PayableRepository;

  beforeEach(() => {
    payableRepository = new MockPayableRepository();
  });

  it("should add a new payable", () => {
    const payable: CreatePayableBody = { value: 100, assignor: 1, emissionDate: new Date() };
    const newPayable =payableRepository.addPayable(payable);
    expect(payableRepository.getpayableAll()).toEqual([payable]);
    payableRepository.deletePayable(newPayable);
  });

  it("should get a payable by id", () => {
    const payable: CreatePayableBody = { value: 100, assignor: 1, emissionDate: new Date() };
    const newPayable =payableRepository.addPayable(payable);
    expect(payableRepository.getPayable(newPayable)).toEqual(payable);
  });

  it("should update a payable", () => {
    const payable: CreatePayableBody = { value: 100, assignor: 1, emissionDate: new Date() };
    const newPayable = payableRepository.addPayable(payable);
    const updatePayable = { value: 200, assignor: 1, emissionDate: new Date() };
    payableRepository.updatePayable(newPayable, updatePayable);
    expect(payableRepository.getPayable(newPayable)).toEqual({ ...payable, ...updatePayable });
    payableRepository.deletePayable(newPayable);
  });

  it("should delete a payable", () => {
    const payable: CreatePayableBody = { value: 100, assignor: 1, emissionDate: new Date() };
    const newPayable = payableRepository.addPayable(payable);
    payableRepository.deletePayable(newPayable);
    expect(payableRepository.getpayableAll()).toEqual([]);
  });
});