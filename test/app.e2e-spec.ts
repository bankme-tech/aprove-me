import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // create e2e test based on payable.controller.spec.ts
  describe('the create function', () => {
    it('should create a payable', async () => {
      const payable = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        value: 1000,
        emissionDate: '2021-01-01',
        assignor: {
          document: '12345678901',
          email: 'contato@asdrubalcorp.com',
          phone: '11999999999',
          name: 'Asdrubal Silva'
        }
      };
      const result = await request(app.getHttpServer())
        .post('/integrations/payable')
        .send(payable)
        .expect(201);
      expect(result.body).toEqual(payable);
    }
    );
    it('should throw an error when id is not a valid UUID', async () => {
      const payable = {
        id: '1',
        value: 1000,
        emissionDate: '2021-01-01',
        assignor: {
          document: '12345678901',
          email: 'test@alonsoft.com',
          phone: '11999999999',
          name: 'Alonsoft'
        }
      };
      const result = await request(app.getHttpServer())
        .post('/integrations/payable')
        .send(payable)
        .expect(400);
      expect(result.body).toEqual({
        statusCode: 400,
        message: 'O id do recebível deve ser um UUID válido'
      });
    }
    );
    it('should throw an error when document is longer than 30 characters', async () => {
      const payable = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        value: 1000,
        emissionDate: '2021-01-01',
        assignor: {
          document: '1234567890123456789012345678901',
          email: 'contato@asdrubalcorp.com',
          phone: '11999999999',
          name: 'Asdrubal Silva'
        }
      };
      const result = await request(app.getHttpServer())
        .post('/integrations/payable')
        .send(payable)
        .expect(400);
      expect(result.body).toEqual({
        statusCode: 400,
        message: 'O documento do cedente deve ter no máximo 30 caracteres'
      });
    });
  });
});
