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

    token = response.body.access_token;
  });

  it('/assignors/create (POST) not authorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignors/create')
      .send({
        email: 'test@admin.com',
        name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/assignors/create (POST) created with success', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('test');
    expect(response.body.email).toBe('test@admin.com');

    const responseAllAssignors = await request(app.getHttpServer())
      .get('/assignors')
      .set('Authorization', `Bearer ${token}`)

    expect(responseAllAssignors.body.assignors).toHaveLength(1);

  });

  it('/assignors/create (POST) missing name', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        // name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['name should not be empty']);
  });
  it('/assignors/create (POST) invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test',
        name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
  });

  it('/assignors/create (POST) missing document', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        name: 'test',
        // document: '00000000000',
        phone: '00000000000',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['document should not be empty']);
  });

  it('/assignors/create (POST) missing phone', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@admin.com',
        name: 'test',
        document: '00000000000',
        // phone: '00000000000',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['phone should not be empty']);
  });
});
