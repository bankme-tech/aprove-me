import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";
import { RemoveAssignorService } from "./remove-assignor-service";

let inMemoAssignorRepo: InMemoryAssignorsRepository;
let sut: RemoveAssignorService;

describe("Remove Assignor", () => {
  beforeEach(() => {
    inMemoAssignorRepo = new InMemoryAssignorsRepository();
    sut = new RemoveAssignorService(inMemoAssignorRepo);
  });

  it("should be able to remove a assignor", async () => {
    const fakeAssignor = makeAssignor({});

    await inMemoAssignorRepo.create(fakeAssignor);

    expect(inMemoAssignorRepo.items).toHaveLength(1);

    const result = await sut.execute({
      id: fakeAssignor.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();

    expect(inMemoAssignorRepo.items).toHaveLength(0);
  });
});
