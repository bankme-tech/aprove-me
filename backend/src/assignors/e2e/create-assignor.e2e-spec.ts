import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('AssignorsController.create (e2e)', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/integrations/assignor (POST)', async () => {
    const expectedBodyResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const res = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send(expectedBodyResponse)
      .expect(HttpStatus.CREATED)
    
    expect(Object.keys(res.body))
      .toStrictEqual(["id", "document", "email", "phone", "name"])
    expect(res.body).toEqual(expect.objectContaining(expectedBodyResponse))

  });

  it('should not accept wrong data', async () => {
    const expectedBodyResponse = {
      document: faker.hacker.adjective(),
      email: faker.person.firstName(),
      phone: faker.person.firstName(),
      name: faker.person.fullName()
    }
    const res = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send(expectedBodyResponse)
      .expect(HttpStatus.BAD_REQUEST)
      
    expect(Object.keys(res.body))
    expect(res.body.message).toEqual([
      "document must be a number string",
      "email must be an email",
      "phone must be a number string",
    ])

  });

  it('should not accept missing data', async () => {
    const expectedBodyResponse = {
    }
    const res = await request(app.getHttpServer())
      .post('/integrations/assignor')
      .send(expectedBodyResponse)
      .expect(HttpStatus.BAD_REQUEST)
      
      
    expect(Object.keys(res.body))
    expect(res.body.message).toHaveLength(11)

  });
});
