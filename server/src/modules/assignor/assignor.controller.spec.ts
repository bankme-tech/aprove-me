import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

describe('AssignorController', () => {
  let sut: AssignorController;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 'any_id',
              document: 'any_document',
              email: 'any_email',
              phone: 'any_phone',
              name: 'any_name',
            })
          }
        }
      ],
    }).compile();

    sut = module.get<AssignorController>(AssignorController);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should call service with correct values', async () => {
      const createSpy = jest.spyOn(assignorService, 'create')

      await sut.create({
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
      })

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
        }
      })
    });

    it('should return a assignor on success', async () => {
      const response = await sut.create({
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
      })

      expect(response).toEqual({
        id: 'any_id',
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
      })
    });
  });
});
 