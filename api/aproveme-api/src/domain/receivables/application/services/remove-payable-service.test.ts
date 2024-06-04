import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";
import { RemovePayableService } from "./remove-payable-service";

let inMemoPayableRepo: InMemoryPayablesRepository;
let sut: RemovePayableService;

describe("Remove Payable", () => {
  beforeEach(() => {
    inMemoPayableRepo = new InMemoryPayablesRepository();
    sut = new RemovePayableService(inMemoPayableRepo);
  });

  it("should be able to remove a payable", async () => {
    const fakePayable = makePayable({});

    await inMemoPayableRepo.create(fakePayable);

    expect(inMemoPayableRepo.items).toHaveLength(1);

    const result = await sut.execute({
      id: fakePayable.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();

    expect(inMemoPayableRepo.items).toHaveLength(0);
  });
});
