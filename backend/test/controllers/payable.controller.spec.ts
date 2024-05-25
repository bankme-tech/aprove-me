import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from '../../src/payable/payable.controller';
import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { CreatePayableUseCaseStub } from 'test/mocks/usecases/payable/create-payable.usecase.mock';
import { FindAllPayablesUseCaseStub } from 'test/mocks/usecases/payable/find-all-payable.usecase.mock';
import { FindPayableUseCaseStub } from 'test/mocks/usecases/payable/find-payable.usecase.mock';
import { UpdatePayableUseCaseStub } from 'test/mocks/usecases/payable/update-payable.usecase.mock';
import { RemovePayableUseCaseStub } from 'test/mocks/usecases/payable/remove-payable.usecase.mock';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { FindPayableInputDTO } from 'src/payable/dto/find-payable.input.dto';
import {
  UpdatePayableInputBodyDTO,
  UpdatePayableInputParamsDTO,
} from 'src/payable/dto/update-payable.input.dto';
import { ICreatePayableUseCase } from 'src/payable/usecases/create-payable.usecase.interface';
import { IFindAllPayablesUseCase } from 'src/payable/usecases/find-all-payables.usecase.interface';
import { IFindPayableUseCase } from 'src/payable/usecases/find-payable.usecase.interface';
import { IUpdatePayableUseCase } from 'src/payable/usecases/update-payable.usecase.interface';
import { IRemovePayableUseCase } from 'src/payable/usecases/remove-payable.usecase.interface';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';
import { RemovePayableInputDTO } from 'src/payable/dto/remove-payable.input.dto';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/persistence/prisma.module';
import { PrismaClient } from '@prisma/client';
import { batchOutputDTO } from 'src/payable/dto/batch.output.dto';
import { makeBatchInputDTO } from 'test/mocks/dtos.mock';
import { IProducer } from 'src/rabbitmq/interfaces/producer.interface';
import { BatchInputDTO } from 'src/payable/dto/batch.input.dto';

describe('PayableController', () => {
  let sut: PayableController;
  const prismaClient = new PrismaClient();

  let createPayableUseCaseStub: CreatePayableUseCaseStub;
  let findAllPayablesUseCaseStub: FindAllPayablesUseCaseStub;
  let findPayableUseCaseStub: FindPayableUseCaseStub;
  let updatePayableUseCaseStub: UpdatePayableUseCaseStub;
  let removePayableUseCaseStub: RemovePayableUseCaseStub;
  let producerSpy: jest.SpyInstance;

  let entity: PayableEntity;
  let createPayableDTO: CreatePayableInputDTO;
  let findPayableDTO: FindPayableInputDTO;
  let updatePayableParamsDTO: UpdatePayableInputParamsDTO;
  let updatePayableBodyDTO: UpdatePayableInputBodyDTO;
  let removePayableDTO: RemovePayableInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      imports: [AuthModule, PrismaModule.forTest(prismaClient)],
      providers: [
        {
          provide: ICreatePayableUseCase,
          useClass: CreatePayableUseCaseStub,
        },
        {
          provide: IFindAllPayablesUseCase,
          useClass: FindAllPayablesUseCaseStub,
        },
        {
          provide: IFindPayableUseCase,
          useClass: FindPayableUseCaseStub,
        },
        {
          provide: IUpdatePayableUseCase,
          useClass: UpdatePayableUseCaseStub,
        },
        {
          provide: IRemovePayableUseCase,
          useClass: RemovePayableUseCaseStub,
        },
        {
          provide: IProducer,
          useValue: {
            publishMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<PayableController>(PayableController);
    createPayableUseCaseStub = module.get<CreatePayableUseCaseStub>(
      ICreatePayableUseCase,
    );
    findAllPayablesUseCaseStub = module.get<FindAllPayablesUseCaseStub>(
      IFindAllPayablesUseCase,
    );
    findPayableUseCaseStub =
      module.get<FindPayableUseCaseStub>(IFindPayableUseCase);
    updatePayableUseCaseStub = module.get<UpdatePayableUseCaseStub>(
      IUpdatePayableUseCase,
    );
    removePayableUseCaseStub = module.get<RemovePayableUseCaseStub>(
      IRemovePayableUseCase,
    );
    producerSpy = jest.spyOn(
      module.get<IProducer<BatchInputDTO>>(IProducer),
      'publishMessage',
    );

    entity = makePayableEntity();
    createPayableDTO = {
      value: entity.value,
      assignorId: entity.assignorId,
      emissionDate: entity.emissionDate,
    };
    findPayableDTO = {
      id: entity.id,
    };
    updatePayableParamsDTO = findPayableDTO;
    updatePayableBodyDTO = createPayableDTO;
    removePayableDTO = findPayableDTO;
  });

  describe('create()', () => {
    test('should call createPayableUseCase with correct values', async () => {
      await sut.create(createPayableDTO);

      expect(createPayableUseCaseStub.data).toEqual(createPayableDTO);
    });

    test('should return a new payable', async () => {
      createPayableUseCaseStub.response = {
        ...entity,
      };
      const response = await sut.create(createPayableDTO);

      expect(response).toEqual(createPayableUseCaseStub.response);
    });
  });

  describe('findAll()', () => {
    test('should call findAllPayableUseCase with correct values', async () => {
      const findAllSpy = jest.spyOn(findAllPayablesUseCaseStub, 'execute');

      await sut.findAll();

      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    test('should return a list of payables', async () => {
      const response = await sut.findAll();

      expect(response).toEqual(findAllPayablesUseCaseStub.response);
    });
  });

  describe('findOne()', () => {
    test('should call findOnePayableUseCase with correct values', async () => {
      await sut.findOne(findPayableDTO);

      expect(findPayableUseCaseStub.data).toBe(findPayableDTO);
    });

    test('should return payable', async () => {
      const response = await sut.findOne(findPayableDTO);

      expect(response).toEqual(findPayableUseCaseStub.response);
    });
  });

  describe('update()', () => {
    test('should call updatePayableUseCase with correct values', async () => {
      await sut.update(updatePayableParamsDTO, updatePayableBodyDTO);

      expect(updatePayableUseCaseStub.data).toEqual({
        ...updatePayableParamsDTO,
        ...updatePayableBodyDTO,
      });
    });

    test('should return a new payable', async () => {
      const response = await sut.update(
        updatePayableParamsDTO,
        updatePayableBodyDTO,
      );

      expect(response).toEqual(updatePayableUseCaseStub.response);
    });
  });

  describe('remove()', () => {
    test('should call removePayableUseCase with correct values', async () => {
      await sut.remove(removePayableDTO);

      expect(removePayableUseCaseStub.data).toEqual(removePayableDTO);
    });

    test('should return undefined', async () => {
      const response = await sut.remove(removePayableDTO);

      expect(response).toBeUndefined();
    });
  });

  describe('createBatch()', () => {
    test('should call producer with correct values', async () => {
      const batchInputDTO = makeBatchInputDTO();

      await sut.createBatch(batchInputDTO);

      expect(producerSpy).toHaveBeenCalledWith(batchInputDTO);
    });

    test('should return correct message', async () => {
      const result = await sut.createBatch(makeBatchInputDTO());

      expect(result).toEqual(batchOutputDTO);
    });
  });
});
