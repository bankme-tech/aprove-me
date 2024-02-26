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
        email: 'test@admin.com',
        name: 'test',
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

  it('/payables/:id (PUT) not authorized', async () => {
    const response = await request(app.getHttpServer())
      .put('/payables/1')
      .send({
        value: 300,
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/payables/:id (PUT) update user', async () => {
    const responseUser = await request(app.getHttpServer())
      .get('/payables/1')
      .set('Authorization', `Bearer ${token}`);

    expect(responseUser.statusCode).toBe(200);
    expect(responseUser.body.value).toBe(120);

    const responseUpdated = await request(app.getHttpServer())
      .put('/payables/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 600,
      });

    expect(responseUpdated.statusCode).toBe(200);
    expect(responseUpdated.body.value).toBe(600);
  });

  it('/payables/:id (PUT) missing name', async () => {
    const response = await request(app.getHttpServer())
      .put('/payables/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // value: 400
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['value should not be empty']);
  });
});
