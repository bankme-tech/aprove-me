/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma.config';
import { AppModule } from 'src/modules/app.module';
import { cnpj, cpf } from 'cpf-cnpj-validator';

describe('ReceivableController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });
  afterAll(async () => {
    await prisma.receivable.deleteMany(); // 1
    await prisma.assignor.deleteMany(); // 2
    await prisma.$disconnect();
    await app.close();
  });

  it('/POST integrations/payable (create receivable)', async () => {
    const document = cnpj.generate();
    const createAssignorResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'assignor@company.com',
        phone: '99228909123',
        name: 'Test Assignor',
      })
      .expect(201);

    const assignorId = createAssignorResponse.body.id;

    const response = await request(app.getHttpServer())
      .post('/integrations/payable')
      .send({
        value: 100,
        emissionDate: '2024-05-22T20:48:59.915Z',
        assignorId,
      })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      value: 100,
      emissionDate: expect.any(String),
      assignorId,
    });
  });

  it('/GET integrations/payable/:id (get receivable)', async () => {
    const document = cpf.generate();
    const createAssignorResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'assignor.man@company.com',
        phone: '23456789012',
        name: 'Test Assignor',
      })
      .expect(201);

    const assignorId = createAssignorResponse.body.id;

    const createReceivableResponse = await request(app.getHttpServer())
      .post('/integrations/payable')
      .send({
        value: 100,
        emissionDate: '2024-05-22T20:48:59.915Z',
        assignorId,
      })
      .expect(201);

    const receivableId = createReceivableResponse.body.id;

    const getResponse = await request(app.getHttpServer()).get(`/integrations/payable/${receivableId}`).expect(200);

    expect(getResponse.body).toEqual({
      id: receivableId,
      value: 100,
      emissionDate: expect.any(String),
      assignorId,
    });
  });

  it('/PUT integrations/payable/:id (update receivable)', async () => {
    const document = cpf.generate();
    const createAssignorResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'assignor.other@company.com',
        phone: '22456789019',
        name: 'Test Assignor',
      })
      .expect(201);

    const assignorId = createAssignorResponse.body.id;

    const createReceivableResponse = await request(app.getHttpServer())
      .post('/integrations/payable')
      .send({
        value: 100,
        emissionDate: '2024-05-22T20:48:59.915Z',
        assignorId,
      })
      .expect(201);

    const receivableId = createReceivableResponse.body.id;

    const updateResponse = await request(app.getHttpServer())
      .put(`/integrations/payable/${receivableId}`)
      .send({
        value: 200,
        emissionDate: '2024-05-22T20:48:59.915Z',
        assignorId,
      })
      .expect(200);

    expect(updateResponse.body).toEqual({
      id: receivableId,
      value: 200,
      emissionDate: expect.any(String),
      assignorId,
    });
  });

  it('/DELETE integrations/payable/:id (delete receivable)', async () => {
    const document = cpf.generate();
    const createAssignorResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'assignor.delete@company.com',
        phone: '55456789019',
        name: 'Test Assignor',
      })
      .expect(201);

    const assignorId = createAssignorResponse.body.id;

    const createReceivableResponse = await request(app.getHttpServer())
      .post('/integrations/payable')
      .send({
        value: 100,
        emissionDate: '2024-05-22T20:48:59.915Z',
        assignorId,
      })
      .expect(201);

    const receivableId = createReceivableResponse.body.id;

    await request(app.getHttpServer()).delete(`/integrations/payable/${receivableId}`).expect(200);
  });
});
