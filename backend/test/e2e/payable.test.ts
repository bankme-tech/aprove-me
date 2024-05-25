import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PayableModule } from 'src/payable/payable.module';
import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { AssignorModule } from 'src/assignor/assignor.module';
import { PrismaModule } from 'src/persistence/prisma.module';
import { PrismaExceptionFilter } from 'src/exception-filters/prisma-exception.filter';
import { PersistenceExceptionFilter } from 'src/exception-filters/persistence-exception.filter';
import { makeAssignorEntity } from '../mocks/entities/assignor.entity.mock';
import { CreatePayableUseCase } from 'src/payable/usecases/create-payable.usecase';
import { FindAllPayablesUseCase } from 'src/payable/usecases/find-all-payables.usecase';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';
import { PrismaClient } from '@prisma/client';
import { PrismaDatabaseHelper } from './helpers/prisma-database.e2e';
import { FindPayableInputDTO } from 'src/payable/dto/find-payable.input.dto';
import { FindPayableUseCase } from 'src/payable/usecases/find-payable.usecase';
import {
  UpdatePayableInputBodyDTO,
  UpdatePayableInputParamsDTO,
} from 'src/payable/dto/update-payable.input.dto';
import { randomUUID } from 'crypto';
import { UpdatePayableUseCase } from 'src/payable/usecases/update-payable.usecase';
import { RemovePayableInputDTO } from 'src/payable/dto/remove-payable.input.dto';
import { RemovePayableUseCase } from 'src/payable/usecases/remove-payable-usecase';
import { CustomLogger } from './helpers/custom-logger.e2e';

describe('PayableController (e2e)', () => {
  let app: INestApplication;
  const prismaClient = new PrismaClient();
  const prismaDatabaseHelper = new PrismaDatabaseHelper(prismaClient);

  let createPayableDTO: CreatePayableInputDTO;
  let findPayableDTO: FindPayableInputDTO;
  let updatePayableParamsDTO: UpdatePayableInputParamsDTO;
  let updatePayableBodyDTO: UpdatePayableInputBodyDTO;
  let removePayableDTO: RemovePayableInputDTO;

  beforeAll(async () => {
    await prismaDatabaseHelper.dropDatabase();
    await prismaDatabaseHelper.createDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PayableModule,
        AssignorModule,
        PrismaModule.forTest(prismaClient),
      ],
    })
      .setLogger(new CustomLogger())
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new PersistenceExceptionFilter());
    app.useGlobalFilters(new PrismaExceptionFilter());
    await app.init();

    const { id, value, emissionDate, assignorId } = makePayableEntity();
    createPayableDTO = {
      value,
      emissionDate,
      assignorId,
    };
    findPayableDTO = {
      id,
    };
    updatePayableParamsDTO = {
      id,
    };
    removePayableDTO = {
      id,
    };
    updatePayableBodyDTO = {
      value,
      assignorId,
    };
  });

  afterEach(async () => {
    await prismaDatabaseHelper.clearDatabase();
    // await app.close();
  });

  afterAll(async () => {
    await prismaDatabaseHelper.dropDatabase();
  });

  describe('POST /payable', () => {
    test('should return 400 if any required field is not provided', async () => {
      const removeRandomProperty = (obj: Record<string, any>): void => {
        const keys = Object.keys(obj);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        delete obj[randomKey];
      };

      removeRandomProperty(createPayableDTO);

      await request(app.getHttpServer())
        .post('/payable')
        .send({
          ...createPayableDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be a string|must be a number|must be a valid UUID|must be a valid date)/,
          );
        });
    });

    test('should return 404 if assignor is not found in database', async () => {
      await request(app.getHttpServer())
        .post('/payable')
        .send({
          ...createPayableDTO,
        })
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'No Assignor found',
        });
    });

    test("should return 500 if something goes wrong on the server's side", async () => {
      jest
        .spyOn(CreatePayableUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .post('/payable')
        .send({
          ...createPayableDTO,
        })
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 201 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      createPayableDTO.assignorId = assignor.id;

      await request(app.getHttpServer())
        .post('/payable')
        .send({
          ...createPayableDTO,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toEqual(expect.any(String));
          expect(res.body.value).toEqual(createPayableDTO.value);
          expect(res.body.assignorId).toEqual(createPayableDTO.assignorId);
          expect(res.body.emissionDate).toEqual(expect.any(String));
        });
    });
  });

  describe('GET /payable', () => {
    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(FindAllPayablesUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .get('/payable')
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 200 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      const payableOne = makePayableEntity();
      payableOne.assignorId = assignor.id;
      payableOne.emissionDate = new Date('2021-01-01T03:00:00.000Z');
      await prismaDatabaseHelper.addPayable(payableOne);

      const payableTwo = makePayableEntity();
      payableTwo.assignorId = assignor.id;
      payableTwo.emissionDate = new Date('2021-01-02T03:00:00.000Z');
      await prismaDatabaseHelper.addPayable(payableTwo);

      const payablesMock = [payableOne, payableTwo];

      await request(app.getHttpServer())
        .get('/payable')
        .expect(200)
        .expect((res) => {
          for (const item of res.body) {
            const payable = payablesMock.find((p) => p.id === item.id);
            expect(payable).toBeDefined();
            expect(item.id).toEqual(payable.id);
            expect(item.value).toEqual(payable.value);
            expect(item.assignorId).toEqual(payable.assignorId);
            expect(new Date(item.emissionDate).toISOString()).toEqual(
              payable.emissionDate.toISOString(),
            );
          }
        });
    });
  });

  describe('GET /payable/:id', () => {
    test('should return 400 if id is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .get('/payable/123')
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a valid UUID/);
        });
    });

    test('should return 404 if payable does not exist', async () => {
      await request(app.getHttpServer())
        .get(`/payable/${findPayableDTO.id}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Payable found/);
        });
    });

    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(FindPayableUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .get(`/payable/${findPayableDTO.id}`)
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 200 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);
      const payable = makePayableEntity();
      payable.assignorId = assignor.id;
      payable.emissionDate = new Date('2021-01-01T03:00:00.000Z');
      await prismaDatabaseHelper.addPayable(payable);

      await request(app.getHttpServer())
        .get(`/payable/${payable.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: payable.id,
            value: payable.value,
            assignorId: payable.assignorId,
            emissionDate: payable.emissionDate.toISOString(),
          });
        });
    });
  });

  describe('PATCH /payable/:id', () => {
    test('should return 400 if id is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .patch('/payable/123')
        .send({
          ...updatePayableBodyDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a valid UUID/);
        });
    });

    test('should return 400 if any field is not a valid type', async () => {
      const invalidFields = {
        value: 'invalid',
        assignorId: 'invalid',
      };

      const field =
        Object.keys(invalidFields)[
          Math.floor(Math.random() * Object.keys(invalidFields).length)
        ];

      updatePayableBodyDTO[field] = invalidFields[field];

      await request(app.getHttpServer())
        .patch(`/payable/${updatePayableParamsDTO.id}`)
        .send({
          ...updatePayableBodyDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a/);
        });
    });

    test('should return 404 if payable does not exist', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      updatePayableBodyDTO.assignorId = assignor.id;
      updatePayableParamsDTO.id = randomUUID();

      await request(app.getHttpServer())
        .patch(`/payable/${updatePayableParamsDTO.id}`)
        .send({
          ...updatePayableBodyDTO,
        })
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Payable found/);
        });
    });

    test('should return 404 if assignor does not exist', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);
      const payable = makePayableEntity();
      payable.assignorId = assignor.id;
      payable.emissionDate = new Date('2021-01-01T03:00:00.000Z');
      await prismaDatabaseHelper.addPayable(payable);

      await request(app.getHttpServer())
        .patch(`/payable/${payable.id}`)
        .send({
          ...updatePayableBodyDTO,
          assignorId: randomUUID(),
        })
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Assignor found/);
        });
    });

    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(UpdatePayableUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .patch(`/payable/${updatePayableParamsDTO.id}`)
        .send({
          ...updatePayableBodyDTO,
        })
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });
  });

  describe('DELETE /payable/:id', () => {
    test('should return 400 if id is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .delete('/payable/123')
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a valid UUID/);
        });
    });

    test('should return 404 if payable does not exist', async () => {
      await request(app.getHttpServer())
        .delete(`/payable/${removePayableDTO.id}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Payable found/);
        });
    });

    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(RemovePayableUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .delete(`/payable/${removePayableDTO.id}`)
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 204 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      const payable = makePayableEntity();
      payable.assignorId = assignor.id;
      payable.emissionDate = new Date('2021-01-01T03:00:00.000Z');
      await prismaDatabaseHelper.addPayable(payable);

      await request(app.getHttpServer())
        .delete(`/payable/${payable.id}`)
        .expect(204);
    });
  });
});
