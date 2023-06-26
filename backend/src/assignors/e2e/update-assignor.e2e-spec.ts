import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('AssignorsController.update (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/integrations/assignor/:id (PATCH)', async () => {
    const createdBody = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const createdBodyResponse = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send(createdBody)
      .expect(HttpStatus.CREATED)

    const id = createdBodyResponse.body.id

    const expectedBodyResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }


    const updatedBodyResponse = await request(app.getHttpServer())
      .patch(`/integrations/assignor/${id}`)
      .send(expectedBodyResponse)
      .expect(HttpStatus.OK)

      

    expect(Object.keys(updatedBodyResponse.body))
      .toStrictEqual(["id", "document", "email", "phone", "name"])
    expect(updatedBodyResponse.body).toEqual(expect.objectContaining(expectedBodyResponse))

  });

  it('should return NOT_FOUND status', async () => {
    const id = 'wrong_id'

    await request(app.getHttpServer())
      .get(`/integrations/assignor/${id}`)
      .send({})
      .expect(HttpStatus.NOT_FOUND)
  });
});
