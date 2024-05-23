import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { PrismaAssignorRepository } from '../../src/infra/repository/prisma-assignor.repository';
import { PrismaReceivableRepository } from '../../src/infra/repository/prisma-receivable.repository';

import { PayableUsecase } from '../../src/application/payable.usecase';

describe('# Test de Integração - Payable Usecase', () => {
  let usecase: PayableUsecase;
  let assignorRepo: PrismaAssignorRepository;
  let receivableRepo: PrismaReceivableRepository;

  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(() => {
    assignorRepo = new PrismaAssignorRepository(prisma);
    receivableRepo = new PrismaReceivableRepository(prisma);

    usecase = new PayableUsecase(assignorRepo, receivableRepo);
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.receivable.deleteMany(),
      prisma.assignor.deleteMany(),
    ]);
  });

  it('deve adicionar um novo cedente', async () => {
    const input = {
      document: '54.501.989/0001-46',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
      receivables: [
        {
          value: faker.number.int({ min: 11111, max: 99999 }),
          emissionDate: faker.date.recent(),
        },
      ],
    };

    await usecase.execute(input);
    const created = await prisma.assignor.findUnique({
      where: { document: '54501989000146' },
    });

    expect(created).toBeDefined();
  });

  it('deve manter cedente se encontrado por campo "document"', async () => {
    const id = faker.string.uuid();

    const input = {
      document: '54.501.989/0001-46',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
      receivables: [
        {
          value: faker.number.int({ min: 11111, max: 99999 }),
          emissionDate: faker.date.recent(),
        },
      ],
    };

    await prisma.assignor.create({
      data: {
        id,
        document: '54501989000146',
        email: input.email,
        phone: input.phone,
        name: input.name,
      },
    });

    await usecase.execute(input);
    const created = await prisma.assignor.findUnique({
      where: { document: '54501989000146' },
      include: { receivables: true },
    });

    expect(created).toBeDefined();
    expect(created?.receivables.length).toStrictEqual(1);
  });
});
