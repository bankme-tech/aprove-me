import {
  IReceivableRepository,
  IAssignorRepository,
} from '../domain/repository';
import { AssignorEntity, ReceivableEntity } from '../domain/entity';

export class PayableUsecase {
  constructor(
    private readonly assignorRepo: IAssignorRepository,
    private readonly receivableRepo: IReceivableRepository
  ) {}

  async execute(input: Input): Promise<void> {
    let assignor: AssignorEntity | null;
    const sanitizedDocument = input.document.replace(/\D/g, '');

    assignor = await this.assignorRepo.findByDocument(sanitizedDocument);

    if (!assignor) {
      assignor = AssignorEntity.create({
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      });

      await this.assignorRepo.add(assignor);
    }

    await this.addReceivables(assignor, input.receivables);
  }

  private async addReceivables(
    assignor: AssignorEntity,
    receivables: ReceivableInput[]
  ): Promise<void> {
    const entities = receivables.map((item) =>
      ReceivableEntity.create({
        assignorId: assignor.id.value,
        emissionDate: item.emissionDate,
        value: item.value,
      })
    );

    this.receivableRepo.addMany(entities);
  }
}

type Input = {
  document: string;
  email: string;
  phone: string;
  name: string;
  receivables: ReceivableInput[];
};

type ReceivableInput = {
  value: number;
  emissionDate: Date;
};
