import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";
import { FindPayableByIdService } from "./find-payable-by-id";

let inMemoAssignorRepo: InMemoryAssignorsRepository;
let inMemoPayableRepo: InMemoryPayablesRepository;
let sut: FindPayableByIdService;

describe("Find Payable By Id With Assignor Data", () => {
  beforeEach(() => {
    inMemoAssignorRepo = new InMemoryAssignorsRepository();
    inMemoPayableRepo = new InMemoryPayablesRepository(inMemoAssignorRepo);
    sut = new FindPayableByIdService(inMemoPayableRepo);
  });

  it("should be able to find a payable by its ID", async () => {
    const fakeAssignor = makeAssignor({});
    await inMemoAssignorRepo.create(fakeAssignor);
    expect(inMemoAssignorRepo.items).toHaveLength(1);
    expect(inMemoAssignorRepo.items[0]).toEqual(fakeAssignor);

    const fakePayable = makePayable({ assignorId: fakeAssignor.id });
    await inMemoPayableRepo.create(fakePayable);
    expect(inMemoPayableRepo.items).toHaveLength(1);
    expect(inMemoPayableRepo.items[0]).toEqual(fakePayable);

    const result = await sut.execute({
      id: fakePayable.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();

    expect(result.value.payableWithAssignor.payableId).toEqual(fakePayable.id);
    expect(result.value.payableWithAssignor.assignor.id).toEqual(fakeAssignor.id);
  });
});
