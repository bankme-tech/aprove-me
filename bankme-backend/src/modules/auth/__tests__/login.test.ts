import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/modules/app.module';
import { faker } from '@faker-js/faker';

describe('Auth login (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'admin',
    });
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login com sucesso');
    expect(response.body.access_token).toBeTruthy();
  });

  it('/auth/login (POST) password incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'ad',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email or password incorrect');
    expect(response.body.access_token).toBeFalsy();
  });

  it('/auth/login (POST) invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/auth/login (POST) without email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        // email: 'admin',
        password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['email must be an email']);
    expect(response.body.access_token).toBeFalsy();
  });

  it('/auth/login (POST) without password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com',
        // password: 'admin',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['password should not be empty']);
    expect(response.body.access_token).toBeFalsy();
  });
});
