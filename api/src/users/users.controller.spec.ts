import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';

const userEntityList = [
  new User(
    'neath',
    '$2b$10$B/9WMuc8olpKrmn7UWTrhuSgdvGDZGMGo5M2WtN4Wha1cVl5yjEyW',
  ),
  new User(
    'jose',
    '$2b$10$B/9WMuc8olpKrmn7UWTrhuSgdvGDZGMGo5M2WtN4Wha1cVl5yjEyW',
  ),
];

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(userEntityList[1]),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Arrange
      const createUserDto = {
        login: 'neath',
        password: '123456',
      };

      // Act
      const user = await usersController.create(createUserDto);

      // Assert
      expect(user).toEqual(userEntityList[0]);
    });

    it('should throw an error when creating a user with invalid data', async () => {
      // Arrange
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValueOnce(new BadRequestException('User already exists'));

      const createUserDto = {
        login: 'neath',
        password: '123456',
      };

      // Act
      try {
        await usersController.create(createUserDto);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('User already exists');
      }
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Arrange
      const id = '1';
      const password = '123456';

      // Act
      const user = await usersController.update(id, password);

      // Assert
      expect(user).toEqual(userEntityList[1]);
    });

    it('should throw an error when updating a user that does not exist', async () => {
      // Arrange
      jest
        .spyOn(usersService, 'update')
        .mockRejectedValueOnce(new BadRequestException('User does not exist'));

      const id = '5';
      const password = '123456';

      // Act
      try {
        await usersController.update(id, password);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('User does not exist');
      }
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      // Arrange
      const id = '1';

      // Act
      const user = await usersController.remove(id);

      // Assert
      expect(user).toEqual({});
    });

    it('should throw an error when removing a user that does not exist', async () => {
      // Arrange
      jest
        .spyOn(usersService, 'remove')
        .mockRejectedValueOnce(new BadRequestException('User does not exist'));

      const id = '5';

      // Act
      try {
        await usersController.remove(id);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('User does not exist');
      }
    });
  });
});
