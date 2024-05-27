import 'jest-extended';
import * as supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorDto } from './dtos/assignor.dto';
import { PartialAssignorDto } from './dtos/partial-assignor.dto';
import { AppModule } from 'src/app.module';

describe(AssignorController.name, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  const rng = () => Math.ceil(Math.random() * 10_000);
  const dto: AssignorDto = {
    email: `devtest.${rng()}@email.com`,
    name: 'dev-test',
    document: '111.222.333-44',
    phone: '+55 (21) 9 1111 4444',
  };
  let id: string;
  describe('POST /integrations/assignor', () => {
    it('should create a new assignor', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/integrations/assignor')
        .send(dto);
      type Body = Awaited<ReturnType<AssignorController['create']>>;
      const body = response?.body as Body;
      expect(response.statusCode).toBe(HttpStatus.CREATED);
      id = body.id;
    });
  });

  describe('GET /integrations/assignor/:id', () => {
    it('should return expected dto', async () => {
      expect(id).toBeDefined();
      const response = await supertest(app.getHttpServer()).get(
        `/integrations/assignor/${id}`,
      );
      type Body = Awaited<ReturnType<AssignorController['create']>>;
      const body = response.body as Body;
      expect(body.id).toBe(id);
      expect(body.document).toBe(body.document);
      expect(body.email).toBe(body.email);
      expect(body.phone).toBe(body.phone);
      expect(body.name).toBe(body.name);
    });
  });

  describe('PATCH /integrations/assignor/:id', () => {
    it('should update assignor', async () => {
      const newDto: PartialAssignorDto = {
        name: `New Name ${rng()}`,
        email: `new.devtest.${rng()}@email.com`,
      };
      const response = await supertest(app.getHttpServer())
        .patch(`/integrations/assignor/${id}`)
        .send(newDto);
      type Body = Awaited<ReturnType<AssignorController['update']>>;
      const body = response.body as Body;
      expect(body.id).toBe(id);
      // should update data
      expect(body.email).toBe(newDto.email);
      expect(body.name).toBe(newDto.name);
      // should keep old data
      expect(body.phone).toBe(dto.phone);
      expect(body.document).toBe(dto.document);
    });
  });

  describe('DELETE /integration/assignor/:id', () => {
    it('should delete assignor', async () => {
      const response = await supertest(app.getHttpServer()).delete(
        `/integrations/assignor/${id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    describe('subsequente GET request', () => {
      it('should throw 404 not found', async () => {
        const response = await supertest(app.getHttpServer()).get(
          `/integrations/assignor/${id}`,
        );
        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
