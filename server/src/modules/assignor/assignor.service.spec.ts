import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { UnauthorizedException } from '@nestjs/common';

const makeFakeAssignor = () => ({
  id: 'any_id',
  document: 'any_document',
  email: 'any_email',
  phone: 'any_phone',
  name: 'any_name',
})

describe('AssignorService', () => {
  let sut: AssignorService;
  let assignorRepository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(makeFakeAssignor()),
            create: jest.fn().mockResolvedValue(makeFakeAssignor()),
          }
        }
      ],
    }).compile();

    sut = module.get<AssignorService>(AssignorService);
    assignorRepository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      await sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
        }
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          email: 'any_email'
        }
      })
    });

    it('should throw if assignor already exists', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce({ id: 'any_id' })

      const promise = sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
        }
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Assignor already exist'))
    });

    it('should call repository.create with correct values', async () => {
      const createSpy = jest.spyOn(assignorRepository, 'create')
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      await sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
        }
      })

      expect(createSpy).toHaveBeenCalledWith({
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name'
      })
    });

    it('should return a assignor entity on success', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      const result = await sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
        }
      })

      expect(result).toEqual({
        id: 'any_id',
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
      })
    });
  });
});
