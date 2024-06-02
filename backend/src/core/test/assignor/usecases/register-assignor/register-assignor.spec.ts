import { Assignor } from '@core/assignor/model';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { RegisterAssignorUseCase } from '@core/assignor/usecases/register-assignor/register-assignor.usecase';
import { AssignorDataBuilder } from '@core/test/__mocks__/data-builder';
import { Test, TestingModule } from '@nestjs/testing';

describe('RegisterAssignorUseCase', () => {
  let sut: RegisterAssignorUseCase;
  let assignorRepository: AssignorRepository;

  const input = AssignorDataBuilder.anAssignor().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const AssignorRepositoryProvider = {
      provide: AssignorRepository,
      useValue: {
        save: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [RegisterAssignorUseCase, AssignorRepositoryProvider],
    }).compile();

    sut = app.get<RegisterAssignorUseCase>(RegisterAssignorUseCase);
    assignorRepository = app.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(assignorRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should not call the repository save method if there are notifications', async () => {
      const input = AssignorDataBuilder.anAssignor().withDocument('').build();

      await sut.execute(input);

      expect(assignorRepository.save).not.toHaveBeenCalled();
    });

    it('should call assignorRepository save with correct values', async () => {
      await sut.execute(input);

      expect(assignorRepository.save).toHaveBeenCalledTimes(1);
      expect(assignorRepository.save).toHaveBeenCalledWith(
        expect.any(Assignor),
      );
    });

    it('should register a new assignor with valid data', async () => {
      const output = await sut.execute(input);

      expect(output).toBeDefined();
      expect(output.id).toBeDefined();
      expect(output.document).toBe(input.document);
      expect(output.email).toBe(input.email);
      expect(output.phone).toBe(input.phone);
      expect(output.name).toBe(input.name);
      expect(output.notifications).toEqual({});
    });
  });
});
