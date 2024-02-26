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
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
      });

    await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        email: 'assignor@admin.com',
        name: 'assignor',
        document: '00000000000',
        phone: '00000000000',
      });

    await request(app.getHttpServer())
      .post('/payables/create')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        value: 120,
        assignorId: 1,
      });

    token = response.body.access_token;
  });

  it('/payables/:id (GET) not authorized', async () => {
    const response = await request(app.getHttpServer()).get('/payables/1');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/payables/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/payables/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.value).toBe(120);
    expect(response.body.userId).toBe(1);
    expect(response.body.assignorId).toBe(1);
  });
});
