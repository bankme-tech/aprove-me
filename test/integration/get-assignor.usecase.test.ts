import { PrismaClient } from '@prisma/client';
import { faker, id_ID } from '@faker-js/faker';

import { GetAssignorUsecase } from '../../src/application/get-assignor.usecase';
import { PrismaAssignorRepository } from '../../src/infra/repository/prisma-assignor.repository';
import { CnpjVO, EmailVO, PhoneVO, UniqueEntityIdVO } from '../../src/domain/common/value-object';
import { AssignorEntity, ReceivableEntity } from '../../src/domain/entity';

const makeReceiable = () => {
  return {
    id: faker.string.uuid(),
    emissionDate: faker.date.past().toISOString(),
    value: faker.number.int({ min: 11111, max: 99999 }),
  };
}

describe('Teste de Integração - GetAssignorUsecase', () => {
  let usecase: GetAssignorUsecase;
  let receivableRepo: PrismaAssignorRepository;

  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(() => {
    receivableRepo = new PrismaAssignorRepository(prisma);
    usecase = new GetAssignorUsecase(receivableRepo);
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.receivable.deleteMany(),
      prisma.assignor.deleteMany(),
    ]);
  });

  it('deve lançar exceção se não encontrado cedente por id', async () => {
    const id = faker.string.uuid();
    await expect(() => usecase.execute(id)).rejects.toThrow(
      `Assignor ${id} not found`
    );
  });

  it('deve retornar cedente com recebíveis embedado corretamente', async () => {
    const assignor = {
      id: faker.string.uuid(),
      document: '54.501.989/0001-46',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
    };

    const receivableOne = makeReceiable();
    const receivableTwo = makeReceiable(); 

    await prisma.assignor.create({
      data: {
        ...assignor,
        receivables: {
          createMany: {
            data: [receivableOne, receivableTwo]
          },
        },
      },
    });

    const register = await usecase.execute(assignor.id);

    expect(register).toEqual({
      id: new UniqueEntityIdVO(assignor.id),
      document: new CnpjVO(assignor.document),
      email: new EmailVO(assignor.email),
      phone: new PhoneVO(assignor.phone),
      name: assignor.name,
      _receivables: [
        new ReceivableEntity({ 
          id: receivableOne.id,
          assignorId:  assignor.id,
          emissionDate: receivableOne.emissionDate,
          value: receivableOne.value
        }), 
        new ReceivableEntity({ 
          id: receivableTwo.id,
          assignorId:  assignor.id,
          emissionDate: receivableTwo.emissionDate,
          value: receivableTwo.value
        }), 
      ]
    });
  });
});
