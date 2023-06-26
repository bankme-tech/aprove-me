import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('AssignorsController.( find | findAll ) (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/integrations/assignor/:id (GET)', async () => {
    const expectedBodyResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const createdObject = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send(expectedBodyResponse)
      .expect(HttpStatus.CREATED)

    const id = createdObject.body.id

    const res =  await request(app.getHttpServer())
      .get(`/integrations/assignor/${id}`)
      .expect(HttpStatus.OK)

    expect(Object.keys(res.body))
      .toStrictEqual(["id", "document", "email", "phone", "name", "payables"])
    expect(res.body).toEqual(expect.objectContaining(expectedBodyResponse))

  });

  it('should return NOT_FOUND status', async () => {

    const id = 'wrong_id'

    const res =  await request(app.getHttpServer())
      .get(`/integrations/assignor/${id}`)
      .expect(HttpStatus.NOT_FOUND)

  });

  it('/integrations/assignor/:id (GET)', async () => {
    const res =  await request(app.getHttpServer())
      .get(`/integrations/assignor`)
      .expect(HttpStatus.OK)

    expect(Object.keys(res.body[0]))
      .toStrictEqual(["id", "document", "email", "phone", "name", "payables"])

  });
});
