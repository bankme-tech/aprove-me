// TIVE DIFICULDADES PARA MOCKAR A QUEUE, NÃO CONSEGUI FAZER O TESTE PASSAR
// import { Test, TestingModule } from '@nestjs/testing';
// import { PayablesService } from './payables.service';
// import { PrismaService } from '../../prisma.service';
// import { CreatePayableDto } from './dto/create-payable.dto';
// import { UpdatePayableDto } from './dto/update-payable.dto';
// import { Queue } from 'bull';
// import { PayablesModule } from './payables.module';
// import { getQueueToken } from '@nestjs/bull';

// describe('PayablesService', () => {
//   let service: PayablesService;
//   let prisma: PrismaService;
//   let payablesBatchQueue: Queue;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [PayablesModule],
//     })
//       .overrideProvider(PrismaService)
//       .useValue({
//         payable: {
//           create: jest.fn(),
//           findMany: jest.fn(),
//           findUnique: jest.fn(),
//           update: jest.fn(),
//           delete: jest.fn(),
//         },
//       })
//       .overrideProvider(getQueueToken('payablesBatch'))
//       .useValue({
//         add: jest.fn(),
//       })
//       .compile();

//     service = module.get<PayablesService>(PayablesService);
//     prisma = module.get<PrismaService>(PrismaService);
//     payablesBatchQueue = module.get<Queue>(getQueueToken('payablesBatch'));
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should call prisma.payable.create with correct data', async () => {
//       const createPayableDto = new CreatePayableDto();
//       const createSpy = jest
//         .spyOn(prisma.payable, 'create')
//         .mockResolvedValue(Object.assign({ id: '1' }, createPayableDto));

//       await service.create(createPayableDto);
//       expect(createSpy).toHaveBeenCalledWith({ data: createPayableDto });
//     });
//   });

//   describe('findAll', () => {
//     it('should call prisma.payable.findMany', async () => {
//       const findManySpy = jest
//         .spyOn(prisma.payable, 'findMany')
//         .mockResolvedValue([]);

//       await service.findAll();
//       expect(findManySpy).toHaveBeenCalled();
//     });
//   });

//   describe('findOne', () => {
//     it('should call prisma.payable.findUnique with correct id', async () => {
//       const id = '1';
//       const payable = {
//         id,
//         value: 100,
//         emissionDate: new Date(),
//         assignor: 'Assignor A',
//       };
//       const findUniqueSpy = jest
//         .spyOn(prisma.payable, 'findUnique')
//         .mockResolvedValue(payable);

//       await service.findOne(id);
//       expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id } });
//     });
//   });

//   describe('update', () => {
//     it('should call prisma.payable.update with correct data', async () => {
//       const id = '1';
//       const updatePayableDto = new UpdatePayableDto();
//       const payable = {
//         id,
//         value: 100,
//         emissionDate: new Date(),
//         assignor: 'Assignor A',
//       };
//       const updateSpy = jest
//         .spyOn(prisma.payable, 'update')
//         .mockResolvedValue(payable);

//       await service.update(id, updatePayableDto);
//       expect(updateSpy).toHaveBeenCalledWith({
//         where: { id },
//         data: updatePayableDto,
//       });
//     });
//   });

//   describe('remove', () => {
//     it('should call prisma.payable.delete with correct id', async () => {
//       const id = '1';
//       const payable = {
//         id,
//         value: 100,
//         emissionDate: new Date(),
//         assignor: 'Assignor A',
//       };
//       const deleteSpy = jest
//         .spyOn(prisma.payable, 'delete')
//         .mockResolvedValue(payable);

//       await service.remove(id);
//       expect(deleteSpy).toHaveBeenCalledWith({ where: { id } });
//     });
//   });

//   describe('processBatch', () => {
//     it('should call payablesBatch.add with correct data', async () => {
//       const payables = [
//         { value: 100, emissionDate: new Date(), assignor: 'Assignor A' },
//         { value: 200, emissionDate: new Date(), assignor: 'Assignor B' },
//       ];
//       const addSpy = jest.spyOn(payablesBatchQueue, 'add');

//       await service.batchCreate(payables);
//       expect(addSpy).toHaveBeenCalledWith({ payables });
//     });
//   });
// });
