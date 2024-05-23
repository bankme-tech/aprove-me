import { PrismaClient } from '@prisma/client';
import { faker, id_ID } from '@faker-js/faker';

import { GetPayableUsecase } from '../../src/application/get-payable.usecase';
import { PrismaReceivableRepository } from '../../src/infra/repository/prisma-receivable.repository';
import { UniqueEntityIdVO } from '../../src/domain/common/value-object';
import { AssignorEntity } from '../../src/domain/entity';

describe('Teste de Integração - GetPayableUsecase', () => {
  let usecase: GetPayableUsecase;
  let receivableRepo: PrismaReceivableRepository;

  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(() => {
    receivableRepo = new PrismaReceivableRepository(prisma);
    usecase = new GetPayableUsecase(receivableRepo);
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.receivable.deleteMany(),
      prisma.assignor.deleteMany(),
    ]);
  });

  it('deve lançar exceção se não encontrado recebível por id', async () => {
    const id = faker.string.uuid();
    await expect(() => usecase.execute(id)).rejects.toThrow(
      `Receivable ${id} not found`
    );
  });

  it('deve retornar recebível com cedente embedado corretamente', async () => {
    const assignor = {
      id: faker.string.uuid(),
      document: '54.501.989/0001-46',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
    };

    const receivable = {
      id: faker.string.uuid(),
      emissionDate: faker.date.past().toISOString(),
      value: faker.number.int({ min: 11111, max: 99999 }),
    };

    await prisma.assignor.create({
      data: {
        ...assignor,
        receivables: {
          create: {
            ...receivable,
          },
        },
      },
      include: { receivables: true },
    });

    const register = await usecase.execute(receivable.id);

    expect(register).toEqual({
      id: new UniqueEntityIdVO(receivable.id),
      value: receivable.value,
      emissionDate: new Date(receivable.emissionDate),
      assignorId: new UniqueEntityIdVO(assignor.id),
      _assignor: new AssignorEntity(assignor),
    });
  });
});
