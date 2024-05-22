import { AssignorEntity } from "../domain/entity";
import { IAssignorRepository } from "../domain/repository/assignor-repository.interface";

export class Payable {
  constructor(private readonly assignorRepo: IAssignorRepository) {}

  async execute(input: Input): Promise<void> {
    let assignor: AssignorEntity | null;

    assignor = await this.assignorRepo.findByDocument(input.document);

    if (!assignor) {
      assignor = AssignorEntity.create({
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name
      });
    }

    input.receivables.forEach((receivable) => {
      assignor.addReceivable({
        value: receivable.value,
        emissionDate: receivable.emissionDate,
        assignor: assignor.id.value
      });
    });

    await this.assignorRepo.add(assignor);
  }
}

type Input = {
  document: string;
  email: string;
  phone: string;
  name: string;
  receivables: {
    value: number;
    emissionDate: Date;
  }[]
}