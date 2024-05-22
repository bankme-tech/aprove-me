import 'jest-extended';
import * as supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PayableDto } from './dtos/payables.dto';
import { Assignor } from '@prisma/client';
import { AssignorDto } from '../assignor/dtos/assignor.dto';
import { AssignorController } from '../assignor/assignor.controller';
import { AppModule } from 'src/app.module';
import { PartialPayableDto } from './dtos/partial-payable.dto';

describe(PayableController.name, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  const rng = () => Math.ceil(Math.random() * 10_000);

  let testAssignor: Assignor;
  beforeAll(async () => {
    const dto: AssignorDto = {
      email: `devtest.${rng()}@email.com`,
      name: 'dev-test',
      document: '111.222.333-44',
      phone: '+55 (21) 9 1111 4444',
    };
    const response = await supertest(app.getHttpServer())
      .post('/integrations/assignors')
      .send(dto);
    type Body = Awaited<ReturnType<AssignorController['create']>>;
    const body = response?.body as Body;
    expect(body.id).toBeString();
    testAssignor = body;
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  let id: string;
  let dto: PayableDto;
  describe('POST /integrations/payable', () => {
    it('should create a new payable', async () => {
      dto = {
        emissionDate: new Date('2000/01/01').toISOString(),
        value: 100_00,
        assignor: testAssignor.id,
      };
      const response = await supertest(app.getHttpServer())
        .post('/integrations/payable')
        .send(dto);
      type Body = Awaited<ReturnType<PayableController['create']>>;
      const body = response?.body as Body;
      expect(body.id).toBeString();
      id = body.id;
      expect(body.value).toBe(dto.value);
      expect(body.assignorId).toBe(dto.assignor);
      expect(body.emissionDate).toBe(dto.emissionDate);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('GET /integrations/payable/:id', () => {
    it('should return expected payable', async () => {
      const response = await supertest(app.getHttpServer()).get(
        `/integrations/payable/${id}`,
      );
      type Body = Awaited<ReturnType<PayableController['findOne']>>;
      const body = response?.body as Body;
      expect(body.id).toBe(id);
      expect(body.value).toBe(dto.value);
      expect(body.emissionDate).toBe(dto.emissionDate);
      expect(body.assignorId).toBe(dto.assignor);
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('PATCH ', () => {
    it('should update payable', async () => {
      const newDto: PartialPayableDto = {
        value: 123_00,
        emissionDate: new Date('2024/01/01').toISOString(),
      };
      const response = await supertest(app.getHttpServer())
        .patch(`/integrations/payable/${id}`)
        .send(newDto);
      type Body = Awaited<ReturnType<PayableController['update']>>;
      const body = response?.body as Body;

      expect(body.id).toBe(id);
      expect(body.emissionDate).toBe(newDto.emissionDate);
      expect(body.value).toBe(newDto.value);
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('DELETE /integrations/payable/:id', () => {
    it('should delete expected payable', async () => {
      const response = await supertest(app.getHttpServer()).delete(
        `/integrations/payable/${id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    describe('subsequent request', () => {
      it('should return 404 not found', async () => {
        const response = await supertest(app.getHttpServer()).get(
          `/integrations/payable/${id}`,
        );
        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
