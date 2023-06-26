import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsService } from './assignors.service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaService } from '../prisma/prisma.service';

describe('AssignorsService', () => {
  let assignorsService: AssignorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorsService, PrismaService],
    }).compile();

    assignorsService = module.get<AssignorsService>(AssignorsService);
  });

  it('should be defined', () => {
    expect(assignorsService).toBeDefined();
  });
  

  it('should create a Assignor',async () => {
    const expectedResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const resp = await assignorsService.create(expectedResponse);
    
    expect(resp).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should index Assignors',async () => {
    const resp = await assignorsService.findAll();

    expect(Object.keys(resp[0]))
      .toStrictEqual(["id", "document", "email", "phone", "name", 'payables'])
  });

  it('should show an Assignor',async () => {
    const expectedResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const createdAssginor = await assignorsService.create(expectedResponse);
    const resp = await assignorsService.findOne({id: createdAssginor.id});
    
    expect(resp).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should update an Assignor',async () => {
    const expectedResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const createdAssginor = await assignorsService.create(expectedResponse);
    
    expect(createdAssginor).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should delete an Assignor',async () => {
    const expectedResponse = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const createdAssginor = await assignorsService.create(expectedResponse);
    const resp = await assignorsService.remove({id:createdAssginor.id});
    
    expect(resp).toEqual(expect.objectContaining(expectedResponse));
  });
});
