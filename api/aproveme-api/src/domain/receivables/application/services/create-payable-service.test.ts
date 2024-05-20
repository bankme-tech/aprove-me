import { randomUUID } from "crypto";
import { CreatePayableService } from "./create-payable-service";
import { InMemoryPayablesRepository } from "test/in-memory-payables-repository";

let inMemoPayableRepo: InMemoryPayablesRepository;
let sut: CreatePayableService;

describe("Create Payable", () => {
  beforeEach(() => {
    inMemoPayableRepo = new InMemoryPayablesRepository();
    sut = new CreatePayableService(inMemoPayableRepo);
  });

  it("should be able to create a payable", async () => {
    const result = await sut.execute({
      payable: {
        id: randomUUID(),
        emissionDate: new Date(),
        value: 255.7,
      },

      assignor: {
        id: randomUUID(),
        document: "0111056497",
        email: "janedoe@mail.com",
        name: "Jane Doe",
        phone: "31999999999",
      },
    });

    expect(result.isRight()).toBeTruthy();

    expect(inMemoPayableRepo.payables[0]).toEqual(result.value.payable);
    expect(inMemoPayableRepo.assignors[0]).toEqual(result.value.assignor);
  });
});
