import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { FetchPaginatedPayablesService } from "./fetch-paginated-payables";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";
import { makePayable } from "test/factories/makePayable";

let inMemoAssignorsRepo: InMemoryAssignorsRepository;
let inMemoPayablesRepo: InMemoryPayablesRepository;
let sut: FetchPaginatedPayablesService;

describe("Fetch Paginated Payables", () => {
  beforeEach(() => {
    inMemoAssignorsRepo = new InMemoryAssignorsRepository();
    inMemoPayablesRepo = new InMemoryPayablesRepository(inMemoAssignorsRepo);

    sut = new FetchPaginatedPayablesService(inMemoPayablesRepo);
  });

  it("should be able to fetch payables", async () => {
    const assignor = makeAssignor({});
    await inMemoAssignorsRepo.create(assignor);

    await inMemoPayablesRepo.create(
      makePayable({ assignorId: assignor.id, value: 123.4 })
    );
    await inMemoPayablesRepo.create(
      makePayable({ assignorId: assignor.id, value: 124.4 })
    );
    await inMemoPayablesRepo.create(
      makePayable({ assignorId: assignor.id, value: 125.4 })
    );

    const result = await sut.execute({ page: 1 });

    expect(result.value.payables).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assignorId: assignor.id, value: 123.4 }),
        expect.objectContaining({ assignorId: assignor.id, value: 124.4 }),
        expect.objectContaining({ assignorId: assignor.id, value: 125.4 }),
      ])
    );
  });

  it("should be able to fetch paginated payables", async () => {
    const assignor = makeAssignor({});
    await inMemoAssignorsRepo.create(assignor);

    for (let i = 1; i <= 7; i++) {
      await inMemoPayablesRepo.create(makePayable({ assignorId: assignor.id }));
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value.payables).toHaveLength(2);
  });
});
