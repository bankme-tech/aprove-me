import { CreateAssignorService } from "./create-assignor-service";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { makeAssignor } from "test/factories/makeAssignor";
import { AssignorAlreadyExistsError } from "./errors/assignor-already-exists-error";

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

    const result2 = await sut.execute({
      assignor: {
        id: id.toString(),
        document,
        email,
        name,
        phone,
      },
    });

    expect(result.isRight()).toBeTruthy();
    expect(result2.isRight()).toBeTruthy();
    expect(inMemoAssignorsRepo.items).toHaveLength(1);
  });

  it("should not be able to register a assignor if exists a assignor with same document and different email", async () => {
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

    const result2 = await sut.execute({
      assignor: {
        id: id.toString(),
        document,
        email: "janedoe@mail.com",
        name,
        phone,
      },
    });

    expect(result.isRight()).toBeTruthy();
    expect(result2.isLeft()).toBeTruthy();
    expect(result2.value).toBeInstanceOf(AssignorAlreadyExistsError);
    expect(result2.value.message).toEqual(
      `Assignor "${document}" already exists.`
    );
  });

  it("should not be able to register a assignor if does not exists a assignor with same document but email already exists", async () => {
    const fakeAssignor = makeAssignor({ email: "janedoe@mail.com" });

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

    const result2 = await sut.execute({
      assignor: {
        id: id.toString(),
        document: "01234567891",
        email,
        name,
        phone,
      },
    });

    expect(result.isRight()).toBeTruthy();
    expect(result2.isLeft()).toBeTruthy();
    expect(result2.value).toBeInstanceOf(AssignorAlreadyExistsError);
    expect(result2.value.message).toEqual(
      `Assignor "${email}" already exists.`
    );
  });
});
