import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { makeAssignorDTO } from '../mocks/dtos.mock';
import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { AssignorModule } from 'src/assignor/assignor.module';
import { CreateAssignorUseCase } from 'src/assignor/usecases/create-assignor.usecase';
import { PrismaModule } from 'src/persistence/prisma.module';
import { makeAssignorEntity } from 'test/mocks/entities/assignor.entity.mock';
import { PrismaExceptionFilter } from 'src/exception-filters/prisma-exception.filter';
import { FindAllAssignorsUseCase } from 'src/assignor/usecases/find-all-assignors.usecase';
import { FindAssignorUseCase } from 'src/assignor/usecases/find-assignor.usecase';
import { FindAssignorInputDTO } from 'src/assignor/dto/find-assignor.input.dto';
import { PrismaClient } from '@prisma/client';
import {
  UpdateAssignorInputBodyDTO,
  UpdateAssignorInputParamsDTO,
} from 'src/assignor/dto/update-assignor.input.dto';
import { PersistenceExceptionFilter } from 'src/exception-filters/persistence-exception.filter';
import { UpdateAssignorUseCase } from 'src/assignor/usecases/update-assignor.usecase';
import { RemoveAssignorInputDTO } from 'src/assignor/dto/remove-assignor.input.dto';
import { RemoveAssignorUseCase } from 'src/assignor/usecases/remove-assignor-usecase';
import { PrismaDatabaseHelper } from './helpers/prisma-database.e2e';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';
import { CustomLogger } from './helpers/custom-logger.e2e';

describe('AssignorController (e2e)', () => {
  let app: INestApplication;
  const prismaClient = new PrismaClient();
  const prismaDatabaseHelper = new PrismaDatabaseHelper(prismaClient);

  let createAssignorDTO: CreateAssignorInputDTO;
  let findAssignorDTO: FindAssignorInputDTO;
  let updatedAssignorParamsDTO: UpdateAssignorInputParamsDTO;
  let updateAssignorBodyDTO: UpdateAssignorInputBodyDTO;
  let removeAssignorDTO: RemoveAssignorInputDTO;

  beforeAll(async () => {
    await prismaDatabaseHelper.dropDatabase();
    await prismaDatabaseHelper.createDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AssignorModule, PrismaModule.forTest(prismaClient)],
    })
      .setLogger(new CustomLogger())
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new PrismaExceptionFilter());
    app.useGlobalFilters(new PersistenceExceptionFilter());
    await app.init();

    const { id, document, email, name, phone } = makeAssignorEntity();
    createAssignorDTO = makeAssignorDTO();
    findAssignorDTO = {
      id,
    };
    updatedAssignorParamsDTO = {
      id,
    };
    updateAssignorBodyDTO = {
      document,
      email,
      name,
      phone,
    };
    removeAssignorDTO = {
      id,
    };
  });

  afterEach(async () => {
    await prismaDatabaseHelper.clearDatabase();
    await app.close();
  });

  afterAll(async () => {
    await prismaDatabaseHelper.dropDatabase();
  });

  describe('POST /assignor', () => {
    test('should return 400 if any required field is not provided', async () => {
      const removeRandomProperty = (obj: Record<string, any>): void => {
        const keys = Object.keys(obj);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        delete obj[randomKey];
      };

      removeRandomProperty(createAssignorDTO);

      await request(app.getHttpServer())
        .post('/assignor')
        .send({
          ...createAssignorDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be a string|must be a number|must be a valid UUID|must be a valid date)/,
          );
        });
    });

    test('should return 400 if string fields exceed maximum character limit', async () => {
      const stringFields = {
        document: {
          max: 30,
          value: 'a'.repeat(31),
        },
        email: {
          max: 140,
          value: 'a'.repeat(141),
        },
        phone: {
          max: 20,
          value: 'a'.repeat(21),
        },
        name: {
          max: 140,
          value: 'a'.repeat(141),
        },
      };

      const field =
        Object.keys(stringFields)[
          Math.floor(Math.random() * Object.keys(stringFields).length)
        ];

      createAssignorDTO[field] = stringFields[field].value;

      await request(app.getHttpServer())
        .post('/assignor')
        .send({
          ...createAssignorDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be less than or equal to)/,
          );
        });
    });

    test('should return 409 if assignor with the same document already exists', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      await request(app.getHttpServer())
        .post('/assignor')
        .send({
          ...createAssignorDTO,
          document: assignor.document,
        })
        .expect(409)
        .expect((res) => {
          expect(res.body.statusCode).toBe(409);
          expect(res.body.message).toMatch(
            /Assignor with the same document already exists/,
          );
        });
    });

    test("should return 500 if something goes wrong on the server's side", async () => {
      jest
        .spyOn(CreateAssignorUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .post('/assignor')
        .send({
          ...createAssignorDTO,
        })
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 201 on success', async () => {
      await request(app.getHttpServer())
        .post('/assignor')
        .send({
          ...createAssignorDTO,
        })
        .expect(201)
        .expect((res) =>
          expect(res.body).toStrictEqual({
            id: expect.any(String),
            document: createAssignorDTO.document,
            email: createAssignorDTO.email,
            phone: createAssignorDTO.phone,
            name: createAssignorDTO.name,
          }),
        );
    });
  });

  describe('GET /assignor', () => {
    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(FindAllAssignorsUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .get('/assignor')
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 200 on success', async () => {
      const assignorOne = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignorOne);

      const assignorTwo = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignorTwo);

      const assignorsMock = await prismaDatabaseHelper.findAllAssignors();

      await request(app.getHttpServer())
        .get('/assignor')
        .expect(200)
        .expect((res) => {
          for (const item of res.body) {
            const assignor = assignorsMock.find((a) => a.id === item.id);
            expect(assignor).toBeDefined();
            expect(item.id).toEqual(assignor.id);
            expect(item.document).toEqual(assignor.document);
            expect(item.email).toEqual(assignor.email);
            expect(item.phone).toEqual(assignor.phone);
            expect(item.name).toEqual(assignor.name);
          }
        });
    });
  });

  describe('GET /assignor/:id', () => {
    test('should return 400 if id is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .get('/assignor/123')
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a valid UUID/);
        });
    });

    test('should return 404 if assignor does not exist', async () => {
      await request(app.getHttpServer())
        .get(`/assignor/${findAssignorDTO.id}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Assignor found/);
        });
    });

    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(FindAssignorUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .get(`/assignor/${findAssignorDTO.id}`)
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 200 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      await request(app.getHttpServer())
        .get(`/assignor/${assignor.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: assignor.id,
            document: assignor.document,
            email: assignor.email,
            phone: assignor.phone,
            name: assignor.name,
          });
        });
    });
  });

  describe('PATCH /assignor/:id', () => {
    test('should return 400 if id is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .patch('/assignor/123')
        .send({
          ...updateAssignorBodyDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a valid UUID/);
        });
    });

    test('should return 400 if any field is not a valid type', async () => {
      const invalidFields = {
        document: 123,
        email: 123,
        phone: 123,
        name: 123,
      };

      const field =
        Object.keys(invalidFields)[
          Math.floor(Math.random() * Object.keys(invalidFields).length)
        ];

      updateAssignorBodyDTO[field] = invalidFields[field];

      await request(app.getHttpServer())
        .patch(`/assignor/${updatedAssignorParamsDTO.id}`)
        .send({
          ...updateAssignorBodyDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a string/);
        });
    });

    test('should return 400 if string fields exceed maximum character limit', async () => {
      const stringFields = {
        document: {
          max: 30,
          value: 'a'.repeat(31),
        },
        email: {
          max: 140,
          value: 'a'.repeat(141),
        },
        phone: {
          max: 20,
          value: 'a'.repeat(21),
        },
        name: {
          max: 140,
          value: 'a'.repeat(141),
        },
      };

      const field =
        Object.keys(stringFields)[
          Math.floor(Math.random() * Object.keys(stringFields).length)
        ];

      updateAssignorBodyDTO[field] = stringFields[field].value;

      await request(app.getHttpServer())
        .patch(`/assignor/${updatedAssignorParamsDTO.id}`)
        .send({
          ...updateAssignorBodyDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be less than or equal to)/,
          );
        });
    });

    test('should return 404 if assignor does not exist', async () => {
      await request(app.getHttpServer())
        .patch(`/assignor/${updatedAssignorParamsDTO.id}`)
        .send({
          ...updateAssignorBodyDTO,
        })
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Assignor found/);
        });
    });

    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(UpdateAssignorUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .patch(`/assignor/${updatedAssignorParamsDTO.id}`)
        .send({
          ...updateAssignorBodyDTO,
        })
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 200 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, ...rest } = assignor;
      const updatedAssignor = {
        name: 'Updated Name',
        ...rest,
      };

      await request(app.getHttpServer())
        .patch(`/assignor/${assignor.id}`)
        .send({
          ...updatedAssignor,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: assignor.id,
            document: assignor.document,
            email: assignor.email,
            phone: assignor.phone,
            name: updatedAssignor.name,
          });
        });
    });
  });

  describe('DELETE /assignor/:id', () => {
    test('should return 400 if id is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .delete('/assignor/123')
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(/must be a valid UUID/);
        });
    });

    test('should return 404 if assignor does not exist', async () => {
      await request(app.getHttpServer())
        .delete(`/assignor/${removeAssignorDTO.id}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toMatch(/No Assignor found/);
        });
    });

    test('should return 409 if assignor have payables', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      const payable = makePayableEntity();
      payable.assignorId = assignor.id;
      payable.emissionDate = new Date('2021-01-01T03:00:00.000Z');
      await prismaDatabaseHelper.addPayable(payable);

      await request(app.getHttpServer())
        .delete(`/assignor/${assignor.id}`)
        .expect(409)
        .expect((res) => {
          expect(res.body.statusCode).toBe(409);
          expect(res.body.message).toMatch(
            /Assignor is being referenced by another record and cannot be removed/,
          );
        });
    });

    test('should return 500 if something goes wrong on the server side', async () => {
      jest
        .spyOn(RemoveAssignorUseCase.prototype, 'execute')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await request(app.getHttpServer())
        .delete(`/assignor/${removeAssignorDTO.id}`)
        .expect(500)
        .expect((res) => {
          expect(res.body.statusCode).toBe(500);
          expect(res.body.message).toMatch(/Internal server error/);
        });
    });

    test('should return 204 on success', async () => {
      const assignor = makeAssignorEntity();
      await prismaDatabaseHelper.addAssignor(assignor);

      await request(app.getHttpServer())
        .delete(`/assignor/${assignor.id}`)
        .expect(204);
    });
  });
});
