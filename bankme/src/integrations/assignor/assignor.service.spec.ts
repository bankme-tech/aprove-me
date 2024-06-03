import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import AssignorRepository from './assignor.repository';
import { assignorEntityMock, assignorToCreationMock } from './mocks/mock';
import AssignorDto from '../dto/AssignorDto';
import * as bcrypt from 'bcrypt';

describe('AssignorService', () => {
  let assignorService: AssignorService;
  let assignorRepository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            createAssignorRegister: jest.fn(),
            findAssignorById: jest.fn(),
            updateAssignorById: jest.fn(),
            deleteAssignorById: jest.fn(),
          },
        },
      ],
    }).compile();

    assignorService = module.get<AssignorService>(AssignorService);
    assignorRepository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(assignorService).toBeDefined();
    expect(assignorRepository).toBeDefined();
  });

  describe('createAssignorRegister', () => {
    it('should create a new assignor with success', async () => {
      const assignorEntityFromRepository = assignorEntityMock;

      assignorEntityFromRepository.password = await bcrypt.hash(
        assignorEntityMock.password,
        10,
      );

      assignorRepository.createAssignorRegister = jest
        .fn()
        .mockResolvedValue(assignorEntityFromRepository);

      const assignorFromController = assignorToCreationMock.toEntity();

      const result = await assignorService.createAssignorRegister(
        assignorFromController,
      );

      expect(result).toBeInstanceOf(AssignorDto);
      expect(result).toStrictEqual(AssignorDto.fromEntity(assignorEntityMock));

      expect(assignorRepository.createAssignorRegister).toHaveBeenCalledWith(
        assignorFromController,
      );
      expect(assignorRepository.createAssignorRegister).toHaveBeenCalledTimes(
        1,
      );
      expect(assignorRepository.createAssignorRegister).toHaveReturned();
    });
  });

  describe('findAssignorById', () => {
    it('should find a assignor by id with success', async () => {
      const assignorEntityFromRepository = assignorEntityMock;

      assignorEntityFromRepository.password = await bcrypt.hash(
        assignorEntityMock.password,
        10,
      );

      assignorRepository.findAssignorById = jest
        .fn()
        .mockResolvedValue(assignorEntityFromRepository);

      const result = await assignorService.findAssignorById('1');

      expect(result).toBeInstanceOf(AssignorDto);
      expect(result).toStrictEqual(AssignorDto.fromEntity(assignorEntityMock));
      expect(assignorRepository.findAssignorById).toHaveBeenCalledWith('1');
      expect(assignorRepository.findAssignorById).toHaveBeenCalledTimes(1);
      expect(assignorRepository.findAssignorById).toHaveReturned();
    });

    it('should throw an error when assignor not found', async () => {
      assignorRepository.findAssignorById = jest.fn().mockResolvedValue(null);

      try {
        await assignorService.findAssignorById('1');
      } catch (error) {
        expect(error.message).toBe('Assignor not found.');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('updateAssignorById', () => {
    it('should update a assignor by id with success', async () => {
      const assignorEntityFromRepository = assignorEntityMock;

      assignorEntityFromRepository.password = await bcrypt.hash(
        assignorEntityFromRepository.password,
        10,
      );

      assignorRepository.updateAssignorById = jest
        .fn()
        .mockResolvedValue(assignorEntityFromRepository);

      const result = await assignorService.updateAssignorById(
        assignorEntityFromRepository.id,
        assignorEntityFromRepository,
      );

      expect(result).toBeInstanceOf(AssignorDto);
      expect(result).toStrictEqual(AssignorDto.fromEntity(assignorEntityMock));
      expect(assignorRepository.updateAssignorById).toHaveBeenCalledWith(
        assignorEntityFromRepository.id,
        assignorEntityFromRepository.toCreate(),
      );
      expect(assignorRepository.updateAssignorById).toHaveBeenCalledTimes(1);
      expect(assignorRepository.updateAssignorById).toHaveReturned();
    });

    it('should throw an error when assignor not found', async () => {
      assignorRepository.updateAssignorById = jest.fn().mockResolvedValue(null);

      try {
        await assignorService.updateAssignorById(
          '1',
          assignorToCreationMock.toEntity(),
        );
      } catch (error) {
        expect(error.message).toBe('Assignor not found.');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('deleteAssignorById', () => {
    it('should delete a assignor by id with success', async () => {
      const assignorEntityFromRepository = assignorEntityMock;

      assignorEntityFromRepository.password = await bcrypt.hash(
        assignorEntityMock.password,
        10,
      );

      assignorRepository.updateAssignorById = jest
        .fn()
        .mockResolvedValue(assignorEntityFromRepository);

      await assignorService.deleteAssignorById(assignorEntityFromRepository.id);

      expect(assignorRepository.updateAssignorById).toHaveBeenCalledWith(
        assignorEntityFromRepository.id,
        { active: false },
      );
      expect(assignorRepository.updateAssignorById).toHaveBeenCalledTimes(1);
      expect(assignorRepository.updateAssignorById).toHaveReturned();
    });

    it('should throw an error when assignor not found', async () => {
      assignorRepository.deleteAssignorById = jest.fn();

      try {
        await assignorService.deleteAssignorById('1');
      } catch (error) {
        expect(error.message).toBe('Assignor not found.');
        expect(error.status).toBe(404);
      }
    });
  });
});
