import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";
import { FindPayableByIdService } from "./find-payable-by-id";
import { FindAssignorByIdService } from "./find-assignor-by-id";
import { FetchAssignorsNamesService } from "./fetch-assignors";

let inMemoAssignorRepo: InMemoryAssignorsRepository;
let sut: FetchAssignorsNamesService;

describe("Find Assignor By Id", () => {
  beforeEach(() => {
    inMemoAssignorRepo = new InMemoryAssignorsRepository();
    sut = new FetchAssignorsNamesService(inMemoAssignorRepo);
  });

  it("should be able to find a payable by its ID", async () => {
    const fakeAssignor = makeAssignor({});
    await inMemoAssignorRepo.create(fakeAssignor);

    const fakeAssignor1 = makeAssignor({});
    await inMemoAssignorRepo.create(fakeAssignor1);

    const fakeAssignor2 = makeAssignor({});
    await inMemoAssignorRepo.create(fakeAssignor2);

    expect(inMemoAssignorRepo.items).toHaveLength(3);
    expect(inMemoAssignorRepo.items[0]).toEqual(fakeAssignor);
    expect(inMemoAssignorRepo.items[1]).toEqual(fakeAssignor1);
    expect(inMemoAssignorRepo.items[2]).toEqual(fakeAssignor2);

    const result = await sut.execute();

    expect(result.isRight()).toBeTruthy();

    expect(result.value.assignorsNames).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: fakeAssignor.id.toString(),
          name: fakeAssignor.name,
        }),
        expect.objectContaining({
          id: fakeAssignor1.id.toString(),
          name: fakeAssignor1.name,
        }),
        expect.objectContaining({
          id: fakeAssignor2.id.toString(),
          name: fakeAssignor2.name,
        }),
      ])
    );
  });
});
