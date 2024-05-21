import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PayableRepository } from './repository/repository.service';
import { CreatePayableAssignorDto } from './payable.dto';

// all the test made here will be only to verify if the service is returning the repository content due to the simplicity of the project
describe('basic CRUD operation (payable)', () => {
  let service: PayableService;
  let repository: PayableRepository;

  const mockPayableRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: mockPayableRepository,
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
    repository = module.get<PayableRepository>(PayableRepository);
  });

  // due to the simplicity, the service is only a return for the repository so due to this we don't have a great internal unit test to do
  it('should create two payables payable', async () => {

    const createPayableDto: CreatePayableAssignorDto = {
      assignor: { name: 'Henrique Mauler' },
      payables: [
        { description: 'Please approve-me bank-me', amount: 1000 },
      ],
    };

    const mockPayable = { description: 'Please approve-me bank-me', amount: 1000 };
    mockPayableRepository.create.mockResolvedValue(mockPayable);

    const result = await service.create(createPayableDto);
    expect(result).toEqual(mockPayable);
    expect(repository.create).toHaveBeenCalledWith(createPayableDto);

    // Validate the structure of the result using snapshot
    expect(result).toMatchSnapshot();
  });

  it('should return all playable', async() => {
    const allPayables = [
      {
        id: 'uuid1',
        description: 'example 1',
        amount: 10,
        assignorId: 'uuid3',
        // dueDate: new Date()
      },
      {
        id: 'uuid2',
        description: 'example 2',
        amount: 150,
        assignorId: 'uuid3',
        // dueDate: new Date()
      },
    ]

    // force the provider repository return the variable above
    mockPayableRepository.findAll.mockResolvedValue(allPayables)

    const result = await service.findAll();
    expect(result).toEqual(allPayables)
    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toMatchSnapshot()

  })

  it('should return an payable by id', async() => {
    const mockPayable = { 
      id: '1', 
      description: 'Test Payable', 
      amount: 1000, 
      assignorId: '1', 
      // dueDate: new Date() 
    };

    // force the provider repository return the variable above
    mockPayableRepository.findOne.mockResolvedValue(mockPayable)

    const result = await service.findOne('1');
    expect(result).toEqual(mockPayable)
    expect(repository.findOne).toHaveBeenCalled();
    expect(result).toMatchSnapshot()

  })

  it('should update an payable by id', async() => {
    const updatePayableDto = {
      description : "An updated description",
    }

    const mockUpdatedPayable = {
      id: '1',
      description: 'An updated description',
      amount: 1000,
      assignId: '1',
      // dueDate: new Date()
    }

    mockPayableRepository.update.mockResolvedValue(mockUpdatedPayable);

    const result = await service.update('1', updatePayableDto)
    expect(result).toEqual(mockUpdatedPayable)
    expect(repository.update).toHaveBeenCalledWith('1', updatePayableDto);
    expect(result).toMatchSnapshot();
  })

  it('should delete a payable', async () => {
    const mockPayable = { id: '1', description: 'Test Payable', amount: 1000, assignorId: '1', dueDate: new Date()};

    mockPayableRepository.delete.mockResolvedValue(mockPayable);

    const result = await service.remove('1');
    expect(result).toEqual(mockPayable);
    expect(repository.delete).toHaveBeenCalledWith('1');

    // Validate the structure of the result using snapshot
    expect(result).toMatchSnapshot();
  });
});


// import { Test, TestingModule } from '@nestjs/testing';
// import { PayableService } from './payable.service';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePayableAssignorDto } from './payable.dto';
// import { Payable, Assignor } from '@prisma/client';
// import { v4 as uuidv4 } from 'uuid';
// describe('PayableService', () => {
//   let service: PayableService;
//   let prisma: PrismaService;

//   const mockPrismaService = {
//     assignor: {
//       create: jest.fn(),
//     },
//     payable: {
//       createMany: jest.fn(),
//       findMany: jest.fn(),
//     },
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PayableService,
//         {
//           provide: PrismaService,
//           useValue: mockPrismaService,
//         },
//       ],
//     }).compile();

//     service = module.get<PayableService>(PayableService);
//     prisma = module.get<PrismaService>(PrismaService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should create a payable', async () => {
//     const createPayableDto: CreatePayableAssignorDto = {
//       assignor: { name: 'Henrique Mauler' },
//       payables: [
//         { description: 'Please approve-me bank-me', amount: 1000 },
//       ],
//     };

//     const mockAssignor = {
//       id: uuidv4(),
//       name: 'Henrique Mauler',
//     };

//     const mockPayables = createPayableDto.payables.map(payable => ({
//       ...payable,
//       id: uuidv4(),
//       assignorId: mockAssignor.id,
//       dueDate: new Date(),
//     }));

//     mockPrismaService.assignor.create.mockResolvedValue(mockAssignor);
//     mockPrismaService.payable.createMany.mockResolvedValue({ count: createPayableDto.payables.length });
//     mockPrismaService.payable.findMany.mockResolvedValue(mockPayables);

//     const result = await service.create(createPayableDto);

//     expect(result).toEqual({
//       assignor: mockAssignor,
//       payables: mockPayables,
//     });

//     expect(prisma.assignor.create).toHaveBeenCalledWith({
//       data: {
//         name: createPayableDto.assignor.name,
//       },
//     });

//     expect(prisma.payable.createMany).toHaveBeenCalledWith({
//       data: createPayableDto.payables.map(el => ({
//         description: el.description,
//         amount: el.amount,
//         dueDate: expect.any(Date), // Use expect.any(Date) para verificar qualquer instância de Date
//         assignorId: mockAssignor.id,
//       })),
//     });

//     expect(prisma.payable.findMany).toHaveBeenCalledWith({
//       where: {
//         assignorId: mockAssignor.id,
//       },
//     });
//   });

//   // Adicione os outros testes aqui, de forma semelhante.
// });
