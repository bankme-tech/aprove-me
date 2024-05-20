import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";
import { EditPayableService } from "./edit-payable-service";

let inMemoPayableRepo: InMemoryPayablesRepository;
let sut: EditPayableService;

describe("Edit Payable", () => {
  beforeEach(() => {
    inMemoPayableRepo = new InMemoryPayablesRepository();
    sut = new EditPayableService(inMemoPayableRepo);
  });

  it("should be able to create a payable", async () => {
    const fakePayable = makePayable({});

    await inMemoPayableRepo.create(fakePayable);

    const result = await sut.execute({
      id: fakePayable.id.toString(),
      assignorId: "14655538540",
      value: 1500.5,
    });

    expect(result.isRight()).toBeTruthy();

    expect(result.value.payable.value).toEqual(1500.5);
    expect(result.value.payable.assignorId.value).toEqual("14655538540");
  });
});
