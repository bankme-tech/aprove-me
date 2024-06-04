import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";
import { FindPayableByIdService } from "./find-payable-by-id";
import { FindAssignorByIdService } from "./find-assignor-by-id";

let inMemoAssignorRepo: InMemoryAssignorsRepository;
let sut: FindAssignorByIdService;

describe("Find Assignor By Id", () => {
  beforeEach(() => {
    inMemoAssignorRepo = new InMemoryAssignorsRepository();
    sut = new FindAssignorByIdService(inMemoAssignorRepo);
  });

  it("should be able to find a payable by its ID", async () => {
    const fakeAssignor = makeAssignor({});
    await inMemoAssignorRepo.create(fakeAssignor);

    expect(inMemoAssignorRepo.items).toHaveLength(1);
    expect(inMemoAssignorRepo.items[0]).toEqual(fakeAssignor);

    const result = await sut.execute({
      id: fakeAssignor.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();

    expect(result.value.assignor.id).toEqual(fakeAssignor.id);
  });
});
