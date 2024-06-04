import { CreatePayableService } from "./create-payable-service";
import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";

let inMemoPayableRepo: InMemoryPayablesRepository;
let sut: CreatePayableService;

describe("Create Payable", () => {
  beforeEach(() => {
    inMemoPayableRepo = new InMemoryPayablesRepository();
    sut = new CreatePayableService(inMemoPayableRepo);
  });

  it("should be able to create a payable", async () => {
    const fakePayable = makePayable({});

    await inMemoPayableRepo.create(fakePayable);

    const result = await sut.execute({
      payable: {
        id: fakePayable.id.toString(),
        assignorId: fakePayable.assignorId.toString(),
        emissionDate: fakePayable.emissionDate,
        value: fakePayable.value,
      },
    });

    expect(result.isRight()).toBeTruthy();
  });
});
