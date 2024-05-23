import request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { AppModule } from '../../src/app.module';

const makeReceivable = (assignorId: string) => {
  return {
    id: faker.string.uuid(),
    assignorId,
    emissionDate: faker.date.past().toISOString(),
    value: faker.number.int({ min: 11111, max: 99999 }),
  };
};

describe('# Teste de Integração - GET: POST: /integrations/assignor/:id', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    prisma = module.get<PrismaClient>(PrismaClient);

    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.receivable.deleteMany(),
      prisma.assignor.deleteMany(),
    ]);
  });

  it('deve retornar 404 quando não encontrado cedente por id', async () => {
    request(app.getHttpServer())
      .get(`/integrations/assignor/${faker.string.uuid()}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('deve retornar 200 quando encontrado cedente por id com recebíveis embedado', async () => {
    const assignor = {
      id: faker.string.uuid(),
      document: '389.967.700-51',
      email: 'joe.doe@email.com',
      name: 'Joe Doe',
      phone: '(11) 99657-1123',
    };

    const receivable = makeReceivable(assignor.id);

    await prisma.$transaction([
      prisma.assignor.create({ data: assignor }),
      prisma.receivable.createMany({ data: [receivable] }),
    ]);

    const { body } = await request(app.getHttpServer())
      .get(`/integrations/assignor/${assignor.id}`)
      .expect(HttpStatus.OK);

    expect(body).toEqual({
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
      receivables: [
        {
          id: receivable.id,
          assignorId: assignor.id,
          emissionDate: receivable.emissionDate,
          value: receivable.value,
        },
      ],
    });
  });
});
