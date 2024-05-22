import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

describe('Assignor (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let token;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

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
  });

  afterEach(async () => {
    await prismaService.assignor.deleteMany();
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  it('/integrations/assignor (POST) success', async () => {
    const data = {
      document: '010.443.710-30',
      phone: '48999928877',
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };

    const response = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201);

    expect({
      document: response.body.document,
      phone: response.body.phone,
      email: response.body.email,
      name: response.body.name,
    }).toEqual(data);
  });

  it('/integrations/assignor (POST) not authorized', async () => {
    await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send({
        document: '532.661.120-16',
        phone: '48999928875',
        email: faker.internet.email(),
        name: faker.person.fullName(),
      })
      .expect(401);
  });

  it('/integrations/assignor (POST) document missing', async () => {
    const data = {
      phone: '48999828877',
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };

    await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(400);
  });

  it('/integrations/assignor (POST) email missing', async () => {
    const data = {
      document: '971.718.190-00',
      phone: '48999928377',
      name: faker.person.fullName(),
    };

    await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(400);
  });

  it('/integrations/assignor (POST) phone missing', async () => {
    const data = {
      document: '532.661.120-16',
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };

    await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(400);
  });

  it('/integrations/assignor/:id (GET) success', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '635.657.370-85',
        phone: '48999928857',
        email: faker.internet.email(),
        name: faker.person.fullName(),
      })
      .expect(201);

    const assignor = createResponse.body;
    const response = await request(app.getHttpServer())
      .get(`/integrations/assignor/${assignor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);

    expect(assignor).toEqual(response.body);
  });

  it('/integrations/assignor/:id (GET) not found', async () => {
    await request(app.getHttpServer())
      .get(`/integrations/assignor/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(404);
  });

  it('/integrations/assignor/:id (GET) unauthorized', async () => {
    await request(app.getHttpServer())
      .get(`/integrations/assignor/${faker.string.uuid()}`)
      .send()
      .expect(401);
  });

  it('/integrations/assignor (GET) success', async () => {
    await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '773.836.980-96',
        phone: '48999928856',
        email: faker.internet.email(),
        name: faker.person.fullName(),
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '635.657.370-85',
        phone: '48999928857',
        email: faker.internet.email(),
        name: faker.person.fullName(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);

    expect(response.body.length).toBe(2);
  });

  it('/integrations/assignor/:id (DELETE) success', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '635.657.370-85',
        phone: '48999928857',
        email: faker.internet.email(),
        name: faker.person.fullName(),
      })
      .expect(201);

    const assignor = createResponse.body;
    await request(app.getHttpServer())
      .delete(`/integrations/assignor/${assignor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(204);
  });

  it('/integrations/assignor/:id (DELETE) not found', async () => {
    await request(app.getHttpServer())
      .delete(`/integrations/assignor/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(404);
  });

  it('/integrations/assignor/:id (PATCH) success', async () => {
    const data = {
      document: '635.657.370-85',
      phone: '48999928857',
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };

    const createResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201);

    const assignor = createResponse.body;
    const response = await request(app.getHttpServer())
      .patch(`/integrations/assignor/${assignor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        phone: '48999928855',
      })
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(String),
      ...data,
      phone: '48999928855',
    });
  });

  it('/integrations/assignor/:id (PATCH) not found', async () => {
    await request(app.getHttpServer())
      .patch(`/integrations/assignor/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(404);
  });
});
