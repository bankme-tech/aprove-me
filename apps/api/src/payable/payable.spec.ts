import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

describe('Payable (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let token;
  let assignor;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await prismaService.payable.deleteMany();
    await prismaService.assignor.deleteMany();
    await prismaService.user.deleteMany();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/integrations/auth/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        password: '123123123',
      });

    token = response.body.token;

    const assignorResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '010.443.710-30',
        phone: '48999928877',
        email: faker.internet.email(),
        name: faker.person.fullName(),
      });

    assignor = assignorResponse.body;
  });

  afterEach(async () => {
    await prismaService.payable.deleteMany();
  });

  afterAll(async () => {
    await prismaService.assignor.deleteMany();
    await prismaService.user.deleteMany();
    await app.close();
  });

  it('/integrations/payable (POST) success', async () => {
    const data = {
      value: 2000,
      emissionDate: '2024-01-01',
      assignorId: assignor.id,
    };

    const response = await request(app.getHttpServer())
      .post('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201);

    expect({
      value: response.body.value,
      emissionDate: response.body.emissionDate,
      assignorId: response.body.assignorId,
    }).toEqual({
      ...data,
      emissionDate: new Date(data.emissionDate).toISOString(),
    });
  });

  it('/integrations/payable (POST) unauthorized', async () => {
    await request(app.getHttpServer())
      .post('/integrations/payable')
      .send({
        value: 2000,
        emissionDate: '2024-01-01',
        assignorId: assignor.id,
      })
      .expect(401);
  });

  it('/integrations/payable/:id (GET) success', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 2000,
        emissionDate: '2024-01-01',
        assignorId: assignor.id,
      })
      .expect(201);

    const payable = createResponse.body;
    const response = await request(app.getHttpServer())
      .get(`/integrations/payable/${payable.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);

    expect(payable).toEqual(response.body);
  });

  it('/integrations/payable/:id (GET) not found', async () => {
    await request(app.getHttpServer())
      .get(`/integrations/payable/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(404);
  });

  it('/integrations/payable/:id (GET) unauthorized', async () => {
    await request(app.getHttpServer())
      .get(`/integrations/payable/${faker.string.uuid()}`)
      .send()
      .expect(401);
  });

  it('/integrations/payable/ (GET) success', async () => {
    await request(app.getHttpServer())
      .post('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 2000,
        emissionDate: '2024-01-01',
        assignorId: assignor.id,
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 2000,
        emissionDate: '2024-01-01',
        assignorId: assignor.id,
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(2);
  });

  it('/integrations/payable/:id (DELETE) success', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 2000,
        emissionDate: '2024-01-01',
        assignorId: assignor.id,
      })
      .expect(201);

    const payable = createResponse.body;
    await request(app.getHttpServer())
      .delete(`/integrations/payable/${payable.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(204);
  });

  it('/integrations/payable/:id (DELETE) not found', async () => {
    await request(app.getHttpServer())
      .delete(`/integrations/payable/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(404);
  });

  it('/integrations/payable/:id (PATCH) success', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/payable')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 2000,
        emissionDate: '2024-01-01',
        assignorId: assignor.id,
      })
      .expect(201);

    const payable = createResponse.body;
    const response = await request(app.getHttpServer())
      .patch(`/integrations/payable/${payable.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ value: 100 })
      .expect(200);

    expect(response.body).toEqual({
      ...payable,
      value: 100,
    });
  });

  it('/integrations/payable/:id (PATCH) not found', async () => {
    await request(app.getHttpServer())
      .patch(`/integrations/payable/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ value: 100 })
      .expect(404);
  });
});
