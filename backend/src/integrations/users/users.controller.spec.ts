import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findByLogin: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByLogin', () => {
    it('should call userService.findByLogin with correct login', async () => {
      const login = 'example_login';
      const findByLoginSpy = jest.spyOn(userService, 'findByLogin');

      await controller.findByLogin(login);

      expect(findByLoginSpy).toHaveBeenCalledWith(login);
    });

    it('should return a user entity', async () => {
      const login = 'example_login';
      const result = await controller.findByLogin(login);

      expect(result).toBeInstanceOf(UserEntity);
    });
  });
});
