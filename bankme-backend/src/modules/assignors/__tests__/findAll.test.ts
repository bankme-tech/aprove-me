import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/modules/app.module';
import { faker } from '@faker-js/faker';

describe('Assignors (e2e)', () => {
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
        email: 'test2@admin.com',
        name: 'test2',
        document: '00000000000',
        phone: '00000000000',
      });

    token = response.body.access_token;
  });

  it('/assignors (GET) not authorized', async () => {
    const response = await request(app.getHttpServer()).get('/assignors');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/assignors (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/assignors')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.assignors).toHaveLength(1);
  });

  it('/assignors (GET) create a new assignor', async () => {
    await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    const response = await request(app.getHttpServer())
      .get('/assignors')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.assignors).toHaveLength(2);
  });
});
