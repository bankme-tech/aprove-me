import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PayableModule } from 'src/payable/payable.module';
import { makeAssignorDTO, makePayableDTO } from '../../test/mocks/dtos.mock';
import { InputAssignorDTO } from 'src/assignor/dto/input-assignor.dto';
import { InputPayableDTO } from 'src/payable/dto/input-payable.dto';

describe('PayableController (e2e)', () => {
  let app: INestApplication;
  let assignorDTO: InputAssignorDTO;
  let payableDTO: InputPayableDTO;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PayableModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    assignorDTO = makeAssignorDTO();
    payableDTO = makePayableDTO();
  });

  describe('POST /payable', () => {
    test('should return 400 if any required field is not provided', () => {
      const removeRandomProperty = (obj: Record<string, any>): void => {
        const keys = Object.keys(obj);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        delete obj[randomKey];
      };

      // Randomly remove a property from either assignorDTO or payableDTO
      if (Math.random() > 0.5) {
        removeRandomProperty(assignorDTO);
      } else {
        removeRandomProperty(payableDTO);
      }

      return request(app.getHttpServer())
        .post('/payable')
        .send({
          payable: payableDTO,
          assignor: assignorDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be a string|must be a number|must be a valid UUID|must be a valid date)/,
          );
        });
    });

    test('should return 400 if Assignor String fields exceed maximum character limit', () => {
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

      // Randomly choose a field to exceed the max length
      const field =
        Object.keys(stringFields)[
          Math.floor(Math.random() * Object.keys(stringFields).length)
        ];

      assignorDTO[field] = stringFields[field].value;

      return request(app.getHttpServer())
        .post('/payable')
        .send({
          payable: payableDTO,
          assignor: assignorDTO,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.statusCode).toBe(400);
          expect(res.body.message[0]).toMatch(
            /(must be less than or equal to)/,
          );
        });
    });

    test('should return 200 if validation succeeds', () => {
      return request(app.getHttpServer())
        .post('/payable')
        .send({
          payable: payableDTO,
          assignor: assignorDTO,
        })
        .expect(200)
        .expect({
          payable: {
            id: payableDTO.id,
            value: payableDTO.value,
            emissionDate: payableDTO.emissionDate.toISOString(),
            assignor: payableDTO.assignor,
          },
          assignor: {
            id: assignorDTO.id,
            document: assignorDTO.document,
            email: assignorDTO.email,
            phone: assignorDTO.phone,
            name: assignorDTO.name,
          },
        });
    });
  });
});
