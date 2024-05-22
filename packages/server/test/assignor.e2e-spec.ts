/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma.config';
import { AppModule } from 'src/modules/app.module';
import { cpf, cnpj } from 'cpf-cnpj-validator';

describe('AssignorController (e2e)', () => {
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
    await prisma.assignor.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  it('/POST integrations/assignor (create assignor)', async () => {
    const document = cpf.generate();
    const response = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document: document,
        email: 'assignor@bankme.com',
        phone: '12345678901',
        name: 'Test Assignor',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      document: document,
      email: 'assignor@bankme.com',
      phone: '12345678901',
      name: 'Test Assignor',
    });
  });

  it('/GET integrations/assignor/:id (get assignor)', async () => {
    const document = cnpj.generate();
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'testb@bankme.com',
        phone: '12345678935',
        name: 'Testb Assignor',
      })
      .expect(201);

    const assignorId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer()).get(`/integrations/assignor/${assignorId}`).expect(200);

    expect(getResponse.body).toEqual({
      id: assignorId,
      document,
      email: 'testb@bankme.com',
      phone: '12345678935',
      name: 'Testb Assignor',
    });
  });

  it('/PUT integrations/assignor/:id (update assignor)', async () => {
    let document = cnpj.generate();
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'testq@bankme.com',
        phone: '12345678940',
        name: 'Test Assignor',
      })
      .expect(201);

    const assignorId = createResponse.body.id;
    document = cpf.generate();
    const updateResponse = await request(app.getHttpServer())
      .put(`/integrations/assignor/${assignorId}`)
      .send({
        document,
        email: 'updated@bankme.com',
        phone: '12345678940',
        name: 'Updated Assignor',
      })
      .expect(200);

    expect(updateResponse.body).toEqual({
      id: assignorId,
      document,
      email: 'updated@bankme.com',
      phone: '12345678940',
      name: 'Updated Assignor',
    });
  });

  it('/DELETE integrations/assignor/:id (delete assignor)', async () => {
    const document = cnpj.generate();
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document,
        email: 'testqb@bankme.com',
        phone: '12345678902',
        name: 'Test Assignor',
      })
      .expect(201);

    const assignorId = createResponse.body.id;
    await request(app.getHttpServer()).delete(`/integrations/assignor/${assignorId}`).expect(200);

    const getResponse = await request(app.getHttpServer()).get(`/integrations/assignor/${assignorId}`).expect(404);

    expect(getResponse.body).toEqual({
      statusCode: 404,
      message: 'Assignor not found',
      error: 'Not Found',
    });
  });
});
