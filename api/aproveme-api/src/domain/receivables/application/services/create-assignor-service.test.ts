import { CreateAssignorService } from "./create-assignor-service";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";

let inMemoAssignorsRepo: InMemoryAssignorsRepository;
let sut: CreateAssignorService;

describe("Create Assignor", () => {
  beforeEach(() => {
    inMemoAssignorsRepo = new InMemoryAssignorsRepository();
    sut = new CreateAssignorService(inMemoAssignorsRepo);
  });

  it("should be able to create a assignor", async () => {
    const fakeAssignor = makeAssignor({});

    await inMemoAssignorsRepo.create(fakeAssignor);

    const { document, email, id, name, phone } = fakeAssignor;

    const result = await sut.execute({
      assignor: {
        id: id.toString(),
        document,
        email,
        name,
        phone,
      },
    });

    expect(result.isRight()).toBeTruthy();
  });
});
