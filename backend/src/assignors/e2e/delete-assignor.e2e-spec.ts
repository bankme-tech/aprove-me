import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('AssignorsController.remove (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/integrations/assignor/:id (DELETE)', async () => {
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

    const deletedResponse = await request(app.getHttpServer())
      .delete(`/integrations/assignor/${id}`)
      .expect(HttpStatus.OK)

    expect(Object.keys(deletedResponse.body))
      .toStrictEqual(["id", "document", "email", "phone", "name"])
    expect(deletedResponse.body).toEqual(expect.objectContaining(createdBody))

  });

  it('should return NOT_FOUND status', async () => {
    const id = 'wrong_id'

    await request(app.getHttpServer())
      .delete(`/integrations/assignor/${id}`)
      .send({})
      .expect(HttpStatus.NOT_FOUND)
  });
});
