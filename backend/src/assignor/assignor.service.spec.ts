import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { AssignorRepository } from './repository/repository.service';
import { CreatePayableAssignorDto } from 'src/payable/payable.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// describe('AssignorService', () => {
//   let service: AssignorService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AssignorService],
//     }).compile();

//     service = module.get<AssignorService>(AssignorService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });



// all the test made here will be only to verify if the service is returning the repository content due to the simplicity of the project
describe('basic CRUD operation (assignor)', () => {
  let service: AssignorService;
  let repository: AssignorRepository;

  const mockAssignorRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: mockAssignorRepository,
        },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  // // not necessary, Payable test case already create assignor as well.
  // // due to the simplicity, the service is only a return for the repository so due to this we don't have a great internal unit test to do
  // it('should create two payables payable', async () => {

  //   const createPayableDto: CreatePayableAssignorDto = {
  //     assignor: { name: 'Henrique Mauler' },
  //     payables: [
  //       { description: 'Please approve-me bank-me', amount: 1000 },
  //     ],
  //   };
  
  //   const mockPayable = { description: 'Please approve-me bank-me', amount: 1000 };
  //   mockAssignorRepository.create.mockResolvedValue(mockPayable);

  //   const result = await service.create(createPayableDto);
  //   expect(result).toEqual(mockPayable);
  //   expect(repository.create).toHaveBeenCalledWith(createPayableDto);

  //   // Validate the structure of the result using snapshot
  //   expect(result).toMatchSnapshot();
  // });

  it('should return all assignor', async() => {
    const allAssignor = [
      {
        name: "Henrique"
      },
      {
        name: "Mauler"
      },
    ]

    // force the provider repository return the variable above
    mockAssignorRepository.findAll.mockResolvedValue(allAssignor)

    const result = await service.findAll();
    expect(result).toEqual(allAssignor)
    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toMatchSnapshot()
  })

  it('should return an assignor by id', async() => {
    const mockAssignor = { 
      id: '1', 
      name: "Frederico"
    };

    // force the provider repository return the variable above
    mockAssignorRepository.findOne.mockResolvedValue(mockAssignor)

    const result = await service.findOne('1');
    expect(result).toEqual(mockAssignor)
    expect(repository.findOne).toHaveBeenCalled();
    expect(result).toMatchSnapshot()

  })

  it('should update an payable by id', async() => {
    const updatePayableDto : Prisma.AssignorUpdateInput = {
      name: "Frederico da Silva"
    }

    const mockUpdatedAssignor = {
      id: '1',
      description: 'An updated description',
      amount: 1000,
      assignId: '1',
      // dueDate: new Date()
    }

    mockAssignorRepository.update.mockResolvedValue(mockUpdatedAssignor);

    const result = await service.update('1', updatePayableDto)
    expect(result).toEqual(mockUpdatedAssignor)
    expect(repository.update).toHaveBeenCalledWith('1', updatePayableDto);
    expect(result).toMatchSnapshot();
  })

  it('should delete a payable', async () => {
    // doesn't matter the format of mockPayable, 
    // what we're testing here is repository is calling correctly by the servicwa
    const mockPayable = {
      "id": "f880ae47-39fe-4ea7-8d3d-210bbd179b63",
      "name": "Assignor Name"
    };

    mockAssignorRepository.delete.mockResolvedValue(mockPayable);

    const result = await service.remove('1');
    expect(result).toEqual(mockPayable);
    expect(repository.delete).toHaveBeenCalledWith('1');

    // Validate the structure of the result using snapshot
    expect(result).toMatchSnapshot();
  });
  	
});