import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { PayableUsecase } from '../../src/application/payable.usecase';
import { PrismaAssignorRepository } from '../../src/infra/repository/prisma-assignor.repository';

describe('# Test de Integração - Payable Usecase', () => {
  let usecase: PayableUsecase;
  let repository: PrismaAssignorRepository;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(() => {
    repository = new PrismaAssignorRepository(prisma);
    usecase = new PayableUsecase(repository);
  });

  it('deve adicionar um novo cedente', async () => {
    const input = {
      document: '54.501.989/0001-46',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
      receivables: [{
        value: faker.number.int({ min: 11111, max: 99999 }),
        emissionDate: faker.date.recent()
      }]
    };

    await usecase.execute(input);
    const created = await prisma.assignor.findUnique({ where: { document: '54501989000146' } });

    expect(created).toBeDefined();
  });

  it('deve manter cedente se encontrado por campo "document"', async () => {
    const id = faker.string.uuid();

    const input = {
      document: '54.501.989/0001-46',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
      receivables: [{
        value: faker.number.int({ min: 11111, max: 99999 }),
        emissionDate: faker.date.recent()
      }]
    };

    await prisma.assignor.create({
      data: {
        id,
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      }
    });

    await usecase.execute(input);
    const created = await prisma.assignor.findUnique({ where: { document: '54501989000146' } });

    expect(created).toBeDefined();
  });
});