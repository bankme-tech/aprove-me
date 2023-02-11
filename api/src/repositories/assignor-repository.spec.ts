import { CreateAssignorBody } from "src/dtos/create-assignor-body";
import { UpdateAssignor } from "src/dtos/update-assignor";
import { AssignorRepository } from "./assignor-repository";

class MockAssignorRepository implements AssignorRepository {
  assignorData: any[] = [];

  addAssignor(data: CreateAssignorBody) {
    this.assignorData.push({ data });
  }
  getAssignor(id: number) {
    return this.assignorData.find(x => x.id === id);
  }
  getAssignorAll() {
    return this.assignorData;
  }
  updateAssignor(id: string, body: UpdateAssignor) {
    const index = this.assignorData.findIndex(x => x.id === id);
    this.assignorData[index] = { ...this.assignorData[index], ...body };
  }
  deleteAssignor(id: string) {
    this.assignorData = this.assignorData.filter(x => x.id !== id);
  }
}

describe("AssignorRepository", () => {
  let assignorRepository: AssignorRepository;

  beforeEach(() => {
    assignorRepository = new MockAssignorRepository();
  });

  it("should add a new assignor", () => {
    const data = { name: "John Doe", document: "51231111333411", phone: "11111111111111111118", email: "email@teste.com" }
    const assignor: CreateAssignorBody = data;
    const newAssignor = assignorRepository.addAssignor(assignor);
    expect(assignorRepository.getAssignor(newAssignor)).toEqual({ data });
    assignorRepository.deleteAssignor(newAssignor);
  });

  it("should get an assignor by id", () => {
    const data: CreateAssignorBody = { name: "John Doe", document: "51231111333411", phone: "11111111111111111118", email: "email@teste.com" };
    const newAssignor = assignorRepository.addAssignor(data);
    expect(assignorRepository.getAssignor(newAssignor)).toEqual({ data });
    assignorRepository.deleteAssignor(newAssignor);
  });


  it("should delete an assignor", () => {
    const assignor: CreateAssignorBody = { name: "John Doe", document: "51231111333411", phone: "11111111111111111118", email: "email@teste.com" };
    const newAssignor = assignorRepository.addAssignor(assignor);
    const deletedId = assignorRepository.deleteAssignor(newAssignor);
    expect(assignorRepository.getAssignorAll()).toEqual([]);
  });
});