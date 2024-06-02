import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Assignor } from '@core/assignor/model';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { AssignorDataBuilder } from '@core/test/__mocks__/data-builder';
import { EditAssignorUseCase } from '@core/assignor/usecases/edit-assignor';

describe('EditAssignorUseCase', () => {
  let sut: EditAssignorUseCase;
  let assignorRepository: AssignorRepository;

  const id = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
  const input = AssignorDataBuilder.anAssignor().build();
  const assignor = Assignor.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const AssignorRepositoryProvider = {
      provide: AssignorRepository,
      useValue: {
        findById: jest.fn().mockResolvedValue(assignor),
        save: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [EditAssignorUseCase, AssignorRepositoryProvider],
    }).compile();

    sut = app.get<EditAssignorUseCase>(EditAssignorUseCase);
    assignorRepository = app.get<AssignorRepository>(AssignorRepository);
  });

  it('should call assignorRepository find by id with correct values', async () => {
    await sut.execute({ id, ...input });

    expect(assignorRepository.findById).toHaveBeenCalledTimes(1);
    expect(assignorRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should return an exception if assignor not found', async () => {
    jest.spyOn(assignorRepository, 'findById').mockResolvedValueOnce(null);

    await expect(sut.execute({ id, ...input })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call the repository save method with the updated assignor if data is valid', async () => {
    await sut.execute({ id, ...input });

    expect(assignorRepository.save).toHaveBeenCalled();
    expect(assignorRepository.save).toHaveBeenCalledWith(expect.any(Assignor));
  });

  it('should not call the repository save method if there are notifications', async () => {
    const invalidInput = AssignorDataBuilder.anAssignor()
      .withDocument('')
      .build();

    await sut.execute({ id, ...invalidInput });

    expect(assignorRepository.save).not.toHaveBeenCalled();
  });
});
