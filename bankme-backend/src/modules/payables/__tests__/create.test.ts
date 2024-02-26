import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/modules/app.module';
import { faker } from '@faker-js/faker';

describe('Payables (e2e)', () => {
  let app: INestApplication;

  let token = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'admin',
      });

    await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        document: '00000000000',
        phone: '00000000000',
      });

    token = response.body.access_token;
  });

  it('/payables/create (POST) not authorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/payables/create')
      .send({
        value: 120,
        assignorId: 1,
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/payables/create (POST) created with success', async () => {
    const response = await request(app.getHttpServer())
      .post('/payables/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: faker.finance.amount({ min: 1, max: 1000 }),
        assignorId: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.value).toBe(120);
    expect(response.body.assignorId).toBe(1);
    expect(response.body.userId).toBe(1);

    const responseAllPayables = await request(app.getHttpServer())
      .get('/payables')
      .set('Authorization', `Bearer ${token}`);

    expect(responseAllPayables.body.payables).toHaveLength(1);
  });

  it('/payables/create (POST) missing value', async () => {
    const response = await request(app.getHttpServer())
      .post('/payables/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // value: 120,
        assignorId: 1,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['value should not be empty']);
  });

  it('/payables/create (POST) missing assignorId', async () => {
    const response = await request(app.getHttpServer())
      .post('/payables/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 120,
        // assignorId,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['assignorId should not be empty']);
  });
});
