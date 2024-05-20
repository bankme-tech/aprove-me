import { InMemoryReceivablesRepository } from "test/in-memory-receivables-repository";
import { CreateReceivableService } from "./create-receivable-service";
import { randomUUID } from "crypto";

let inMemoReceivableRepo: InMemoryReceivablesRepository;
let sut: CreateReceivableService;

describe("Create Receivable", () => {
  beforeEach(() => {
    inMemoReceivableRepo = new InMemoryReceivablesRepository();
    sut = new CreateReceivableService(inMemoReceivableRepo);
  });

  it("should be able to create a receivable", async () => {
    const result = await sut.execute({
      receivable: {
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

    expect(inMemoReceivableRepo.receivables[0]).toEqual(
      result.value.receivable
    );
    expect(inMemoReceivableRepo.assignors[0]).toEqual(result.value.assignor);
  });
});
