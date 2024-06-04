import { InMemoryPayablesRepository } from "test/repositories/in-memory-payables-repository";
import { makePayable } from "test/factories/makePayable";
import { EditPayableService } from "./edit-payable-service";
import { InMemoryAssignorsRepository } from "test/repositories/in-memory-assignors-repository";
import { EditAssignorService } from "./edit-assignor-service";
import { makeAssignor } from "test/factories/makeAssignor";

let inMemoAssignorRepo: InMemoryAssignorsRepository;
let sut: EditAssignorService;

describe("Edit Payable", () => {
  beforeEach(() => {
    inMemoAssignorRepo = new InMemoryAssignorsRepository();
    sut = new EditAssignorService(inMemoAssignorRepo);
  });

  it("should be able to edit a assignor", async () => {
    const fakeAssignor = makeAssignor({});

    await inMemoAssignorRepo.create(fakeAssignor);

    expect(fakeAssignor.document).not.toEqual("14655538540");
    expect(fakeAssignor.email).not.toEqual("jperalta@mail.com");
    expect(fakeAssignor.name).not.toEqual("Jake Peralta");
    expect(fakeAssignor.phone).not.toEqual("31999999999");

    const result = await sut.execute({
      id: fakeAssignor.id.toString(),
      document: "14655538540",
      email: "jperalta@mail.com",
      name: "Jake Peralta",
      phone: "31999999999",
    });

    expect(result.isRight()).toBeTruthy();

    expect(result.value.assignor.document).toEqual("14655538540");
    expect(result.value.assignor.email).toEqual("jperalta@mail.com");
    expect(result.value.assignor.name).toEqual("Jake Peralta");
    expect(result.value.assignor.phone).toEqual("31999999999");
  });
});
