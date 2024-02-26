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
        email: 'test@admin.com',
        name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    token = response.body.access_token;
  });

  it('/assignors/:id (PUT) not authorized', async () => {
    const response = await request(app.getHttpServer())
      .put('/assignors/1')
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        document: '11111111111',
        phone: '22222222222',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/assignors/:id (PUT) update assignor', async () => {
    const responseUser = await request(app.getHttpServer())
      .get('/assignors/1')
      .set('Authorization', `Bearer ${token}`);

    expect(responseUser.statusCode).toBe(200);
    expect(responseUser.body.name).toBe('test');
    expect(responseUser.body.email).toBe('test@admin.com');

    const responseUpdated = await request(app.getHttpServer())
      .put('/assignors/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        document: '11111111111',
        phone: '22222222222',
      });

    expect(responseUpdated.statusCode).toBe(200);
    expect(responseUpdated.body.name).toBe('updated');
    expect(responseUpdated.body.email).toBe('updated@admin.com');
  });

  it('/assignors/:id (PUT) missing name', async () => {
    const response = await request(app.getHttpServer())
      .put('/assignors/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // name: faker.internet.userName(),
        email: faker.internet.email(),
        document: '11111111111',
        phone: '22222222222',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['name should not be empty']);
  });

  it('/assignors/:id (PUT) missing email', async () => {
    const response = await request(app.getHttpServer())
      .put('/assignors/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.internet.userName(),
        // email: faker.internet.email(),
        document: '11111111111',
        phone: '22222222222',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
  });

  it('/assignors/:id (PUT) invalid email', async () => {
    const response = await request(app.getHttpServer())
      .put('/assignors/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: '',
        name: 'updated',
        document: '11111111111',
        phone: '22222222222',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
  });

  it('/assignors/:id (PUT) missing document', async () => {
    const response = await request(app.getHttpServer())
      .put('/assignors/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'updated@admin.com',
        name: 'updated',
        // document: '11111111111',
        phone: '22222222222',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['document should not be empty']);
  });
  it('/assignors/:id (PUT) missing phone', async () => {
    const response = await request(app.getHttpServer())
      .put('/assignors/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'updated@admin.com',
        name: 'updated',
        document: '11111111111',
        // phone: '22222222222',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['phone should not be empty']);
  });
});
