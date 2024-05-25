import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AssignorModule } from 'src/assignor/assignor.module';
import { PrismaModule } from 'src/persistence/prisma.module';
import { PrismaExceptionFilter } from 'src/exception-filters/prisma-exception.filter';
import { PrismaClient } from '@prisma/client';
import { PersistenceExceptionFilter } from 'src/exception-filters/persistence-exception.filter';
import { PrismaDatabaseHelper } from './helpers/prisma-database.e2e';
import { CustomLogger } from './helpers/custom-logger.e2e';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserInputDTO } from 'src/user/dto/create-user.input.dto';
import { makeUserEntity } from 'test/mocks/entities/user.entity.mock';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const prismaClient = new PrismaClient();
  const prismaDatabaseHelper = new PrismaDatabaseHelper(prismaClient);

  let createUserDTO: CreateUserInputDTO;

  beforeAll(async () => {
    await prismaDatabaseHelper.dropDatabase();
    await prismaDatabaseHelper.createDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AssignorModule,
        AuthModule,
        PrismaModule.forTest(prismaClient),
      ],
    })
      .setLogger(new CustomLogger())
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new PrismaExceptionFilter());
    app.useGlobalFilters(new PersistenceExceptionFilter());
    await app.init();

    const { login, password } = makeUserEntity();
    createUserDTO = {
      login,
      password,
    };
  });

  afterEach(async () => {
    await prismaDatabaseHelper.clearDatabase();
    await app.close();
  });

  afterAll(async () => {
    await prismaDatabaseHelper.dropDatabase();
  });

  describe('POST /user', () => {
    test('should return 400 if any required field is not provided', async () => {
      const removeRandomProperty = (obj: Record<string, any>): void => {
        const keys = Object.keys(obj);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        delete obj[randomKey];
      };

      removeRandomProperty(createUserDTO);

      await request(app.getHttpServer())
        .post('/user')
        .send({
          ...createUserDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be a string|must be a number|must be a valid UUID|must be a valid date)/,
          );
        });
    });

    test('should return 409 if login already exists', async () => {
      const user = makeUserEntity();
      await prismaDatabaseHelper.addUser(user);
      createUserDTO.login = user.login;

      await request(app.getHttpServer())
        .post('/user')
        .send({
          ...createUserDTO,
        })
        .expect(409)
        .expect((res) => {
          expect(res.body.statusCode).toBe(409);
          expect(res.body.message).toMatch(
            /User with the same login already exists/,
          );
        });
    });

    test("should return 500 if something goes wrong on the server's side", async () => {
      jest.spyOn(UserService.prototype, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await request(app.getHttpServer())
        .post('/user')
        .send({
          ...createUserDTO,
        })
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 201 on success', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send({
          ...createUserDTO,
        })
        .expect(201)
        .expect((res) =>
          expect(res.body).toStrictEqual({
            id: expect.not.stringContaining(createUserDTO.password),
            login: createUserDTO.login,
          }),
        );
    });
  });
});
