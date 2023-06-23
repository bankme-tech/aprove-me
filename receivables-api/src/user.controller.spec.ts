import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserController } from './user/controllers/user.controller';
import { UserService } from './user/service/user.service';
import { UserDto } from './user/dto/user.dto';
import { UserEntity } from './user/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const userDto: UserDto = {
        login: 'testuser',
        senha: 'password',
      };

      const expectedUser: UserEntity = {
        login: 'testuser',
        senha: 'password',
      };

      const createdUser: any = {
        id: 1,
        ...expectedUser,
      };

      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(createdUser);

      const result = await userController.createUser(userDto);

      expect(result).toEqual(createdUser);
      expect(userService.createUser).toHaveBeenCalledWith(expectedUser);
    });

    it('should throw BadRequestException when an error occurs', async () => {
      const userDto: UserDto = {
        login: 'testuser',
        senha: 'password',
      };

      const error = new Error('Test error');
      jest.spyOn(userService, 'createUser').mockRejectedValueOnce(error);

      await expect(userController.createUser(userDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
