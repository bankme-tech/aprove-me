import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await prismaService.user.deleteMany({ where: {} });
    await app.init();
  });

  afterEach(async () => {
    await prismaService.user.deleteMany({ where: {} });
  });

  afterAll(async () => {
    await app.close(); // Close NestJS app after all tests
  });

  it('/integrations/auth/register (POST) success', async () => {
    const response = await request(app.getHttpServer())
      .post('/integrations/auth/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        password: '123123123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  it('/integrations/auth/register (POST) conflict', async () => {
    const data = {
      email: 'admin@admin.com',
      name: 'admin',
      password: '123123123',
    };

    await prismaService.user.create({
      data,
    });

    const response = await request(app.getHttpServer())
      .post('/integrations/auth/register')
      .send(data);

    expect(response.statusCode).toBe(409);
  });

  it('/integrations/auth/login (POST) success', async () => {
    const data = {
      email: 'admin@admin.com',
      name: 'admin',
      password: '123123123',
    };

    await prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 8),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/integrations/auth/login')
      .send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('/integrations/auth/login (POST) wrong credentials', async () => {
    const data = {
      email: 'admin@admin.com',
      name: 'admin',
      password: '123123123',
    };

    await prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 8),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/integrations/auth/login')
      .send({ ...data, password: '123123122' });

    expect(response.statusCode).toBe(401);
  });
});
