import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('register', () => {
    const user = {
      id: 'any-id',
      login: 'any-login',
      password: 'any-password',
    };

    const dto: CreateUserDto = {
      login: user.login,
      password: user.password,
    };

    test('should return the id of created user', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(user.id);

      const result = await controller.register(dto);

      expect(result).toBe(user.id);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    test('should throw if userService throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(controller.register(dto)).rejects.toThrow(new Error());
      expect(service.create).toHaveBeenCalledWith(dto)
    });
  });
});
