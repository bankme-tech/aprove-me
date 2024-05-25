import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from '../../src/assignor/assignor.controller';
import { ICreateAssignorUseCase } from 'src/assignor/usecases/create-assignor.usecase.interface';
import { CreateAssignorUseCaseStub } from '../mocks/usecases/assignor/create-assignor.usecase.mock';
import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { FindAllAssignorsUseCaseStub } from '../mocks/usecases/assignor/find-all-assignors.usecase.mock';
import { IFindAllAssignorsUseCase } from 'src/assignor/usecases/find-all-assignors.usecase.interface';
import { FindAssignorUseCaseStub } from '../mocks/usecases/assignor/find-assignor.usecase.mock';
import { IFindAssignorUseCase } from 'src/assignor/usecases/find-assignor.usecase.interface';
import { makeAssignorEntity } from '../mocks/entities/assignor.entity.mock';
import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { FindAssignorInputDTO } from 'src/assignor/dto/find-assignor.input.dto';
import { IUpdateAssignorUseCase } from 'src/assignor/usecases/update-assignor.usecase.interface';
import { UpdateAssignorUseCaseStub } from 'test/mocks/usecases/assignor/update-assignor.usecase.mock';
import {
  UpdateAssignorInputBodyDTO,
  UpdateAssignorInputParamsDTO,
} from 'src/assignor/dto/update-assignor.input.dto';
import { IRemoveAssignorUseCase } from 'src/assignor/usecases/remove-assignor.usecase.interface';
import { RemoveAssignorUseCaseStub } from 'test/mocks/usecases/assignor/remove-assignor.usecase.mock';
import { RemoveAssignorInputDTO } from 'src/assignor/dto/remove-assignor.input.dto';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from 'src/persistence/prisma.module';

describe('AssignorController', () => {
  let sut: AssignorController;
  const prismaClient = new PrismaClient();

  let createAssignorUseCaseStub: CreateAssignorUseCaseStub;
  let findAllAssignorsUseCaseStub: FindAllAssignorsUseCaseStub;
  let findAssignorUseCaseStub: FindAssignorUseCaseStub;
  let updateAssignorUseCaseStub: UpdateAssignorUseCaseStub;
  let removeAssignorUseCaseStub: RemoveAssignorUseCaseStub;

  let entity: AssignorEntity;
  let createAssignorDTO: CreateAssignorInputDTO;
  let findAssignorDTO: FindAssignorInputDTO;
  let updateAssignorParamsDTO: UpdateAssignorInputParamsDTO;
  let updateAssignorBodyDTO: UpdateAssignorInputBodyDTO;
  let removeAssignorDTO: RemoveAssignorInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      imports: [AuthModule, PrismaModule.forTest(prismaClient)],
      providers: [
        {
          provide: ICreateAssignorUseCase,
          useClass: CreateAssignorUseCaseStub,
        },
        {
          provide: IFindAllAssignorsUseCase,
          useClass: FindAllAssignorsUseCaseStub,
        },
        {
          provide: IFindAssignorUseCase,
          useClass: FindAssignorUseCaseStub,
        },
        {
          provide: IUpdateAssignorUseCase,
          useClass: UpdateAssignorUseCaseStub,
        },
        {
          provide: IRemoveAssignorUseCase,
          useClass: RemoveAssignorUseCaseStub,
        },
      ],
    }).compile();

    sut = module.get<AssignorController>(AssignorController);
    createAssignorUseCaseStub = module.get<CreateAssignorUseCaseStub>(
      ICreateAssignorUseCase,
    );
    findAllAssignorsUseCaseStub = module.get<FindAllAssignorsUseCaseStub>(
      IFindAllAssignorsUseCase,
    );
    findAssignorUseCaseStub =
      module.get<FindAssignorUseCaseStub>(IFindAssignorUseCase);
    updateAssignorUseCaseStub = module.get<UpdateAssignorUseCaseStub>(
      IUpdateAssignorUseCase,
    );
    removeAssignorUseCaseStub = module.get<RemoveAssignorUseCaseStub>(
      IRemoveAssignorUseCase,
    );

    entity = makeAssignorEntity();
    createAssignorDTO = {
      document: entity.document,
      email: entity.email,
      phone: entity.phone,
      name: entity.name,
    };
    findAssignorDTO = {
      id: entity.id,
    };
    updateAssignorParamsDTO = findAssignorDTO;
    updateAssignorBodyDTO = updateAssignorBodyDTO;
    removeAssignorDTO = findAssignorDTO;
  });

  describe('create()', () => {
    test('should call createAssignorUseCase with correct values', async () => {
      await sut.create(createAssignorDTO);

      expect(createAssignorUseCaseStub.data).toEqual(createAssignorDTO);
    });

    test('should return a new assignor', async () => {
      createAssignorUseCaseStub.response = {
        id: entity.id,
        ...createAssignorDTO,
      };
      const response = await sut.create(createAssignorDTO);

      expect(response).toEqual(createAssignorUseCaseStub.response);
    });
  });

  describe('findAll()', () => {
    test('should call findAllAssignorUseCase with correct values', async () => {
      const findAllSpy = jest.spyOn(findAllAssignorsUseCaseStub, 'execute');

      await sut.findAll();

      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    test('should return a list of assignors', async () => {
      const response = await sut.findAll();

      expect(response).toEqual(findAllAssignorsUseCaseStub.response);
    });
  });

  describe('findOne()', () => {
    test('should call findOneAssignorUseCase with correct values', async () => {
      await sut.findOne(findAssignorDTO);

      expect(findAssignorUseCaseStub.data).toBe(findAssignorDTO);
    });

    test('should return assignor', async () => {
      const response = await sut.findOne(findAssignorDTO);

      expect(response).toEqual(findAssignorUseCaseStub.response);
    });
  });

  describe('update()', () => {
    test('should call updateAssignorUseCase with correct values', async () => {
      await sut.update(updateAssignorParamsDTO, updateAssignorBodyDTO);

      expect(updateAssignorUseCaseStub.data).toEqual({
        ...updateAssignorParamsDTO,
        ...updateAssignorBodyDTO,
      });
    });

    test('should return a new assignor', async () => {
      const response = await sut.update(
        updateAssignorParamsDTO,
        updateAssignorBodyDTO,
      );

      expect(response).toEqual(updateAssignorUseCaseStub.response);
    });
  });

  describe('remove()', () => {
    test('should call removeAssignorUseCase with correct values', async () => {
      await sut.remove(removeAssignorDTO);

      expect(removeAssignorUseCaseStub.data).toEqual(removeAssignorDTO);
    });

    test('should return undefined', async () => {
      const response = await sut.remove(removeAssignorDTO);

      expect(response).toBeUndefined();
    });
  });
});
