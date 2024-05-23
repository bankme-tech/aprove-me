import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';

import { AppModule } from '../../src/app.module';

describe('Teste de Integração - POST: /integrations/payable', () => {
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

  it('deve criar um cedente com recebíveis corretamente', async () => {
    const input = {
      document: '389.967.700-51',
      email: 'joe.doe@email.com',
      phone: '(11) 99657-1123',
      name: 'Joe Doe',
      receivables: [
        {
          value: 100000,
          emissionDate: new Date(),
        },
      ],
    };

    const { body } = await request(app.getHttpServer())
      .post('/integrations/payable')
      .send(input)
      .expect(HttpStatus.CREATED);

    const created = await prisma.assignor.findUnique({
      where: { id: body.assignorId },
      include: { receivables: true },
    });

    expect(created).toBeDefined();
    expect(created?.receivables.length).toStrictEqual(1);
  });
});
