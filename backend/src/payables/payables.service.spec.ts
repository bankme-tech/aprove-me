import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaService } from '../prisma/prisma.service';
import { AssignorsService } from '../assignors/assignors.service';

describe('PayablesService', () => {
  let payablesService: PayablesService;
  let assignorsService: AssignorsService;
  let assignorId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayablesService, PrismaService, AssignorsService],
    }).compile();

    payablesService = module.get<PayablesService>(PayablesService);
    assignorsService = module.get<AssignorsService>(AssignorsService);


    const assignor = {
      document: faker.helpers.replaceSymbolWithNumber('###########'),
      email: faker.internet.email(),
      phone: faker.phone.number('###########'),
      name: faker.person.fullName()
    }
    const assignorResponse = await assignorsService.create(assignor);
    assignorId = assignorResponse.id
  });

  it('should be defined', () => {
    expect(payablesService).toBeDefined();
  });


  it('should create a Payable', async () => {

    const payable = {
      value: 2.182,
      assignor: {
        connect: { id: assignorId },
      },
    }
    const expectedResponse = { value: 2.182, assignorId: assignorId }

    const payableResponse = await payablesService.create(payable);

    expect(payableResponse).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should index Payables', async () => {
    const resp = await payablesService.findAll();

    expect(Object.keys(resp[0]))
      .toStrictEqual(["id", "value", "emissionDate"])
  });

  it('should show a Payable', async () => {
    const payable = {
      value: 2.182,
      assignor: {
        connect: { id: assignorId },
      },
    }
    const expectedResponse = { value: 2.182, assignorId: assignorId }
    const createdPayable = await payablesService.create(payable);
    const resp = await payablesService.findOne({ id: createdPayable.id });

    expect(resp).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should update a Payable', async () => {
    const payable = {
      value: 2.182,
      assignor: {
        connect: { id: assignorId },
      },
    }
    const createdPayable = await payablesService.create(payable);

    const payableChange = {value: 3.2}
    const updatedPayable = await payablesService.update({where:{id:createdPayable.id},data: payableChange});

    expect(updatedPayable).toEqual(expect.objectContaining(payableChange));
  });

  it('should delete a Payable',async () => {
    const payable = {
      value: 4.98,
      assignor: {
        connect: { id: assignorId },
      },
    }
    const createdPayable = await payablesService.create(payable);
    
    const deletedPayable = await payablesService.remove({id:createdPayable.id });

    expect(deletedPayable).toEqual(expect.objectContaining({value: payable.value}));
  });

});
