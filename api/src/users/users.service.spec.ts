import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { PrismaService } from '../db/prisma.service';
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

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(userEntityList[0]),
              findUnique: jest.fn().mockResolvedValue(userEntityList[1]),
              findUniqueOrThrow: jest.fn().mockResolvedValue(userEntityList[1]),
              update: jest.fn().mockResolvedValue(userEntityList[1]),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Arrange
      const createUserDto = {
        login: 'neath',
        password: 'simple_password',
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      // Act
      const user = await usersService.create(createUserDto);

      // Assert
      expect(user).toEqual(userEntityList[0]);
    });

    it('should throw an error when creating a user with invalid data', async () => {
      // Arrange
      const createUserDto = {
        login: 'neath',
        password: 'simple_password',
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: '1',
        ...userEntityList[0],
      });

      // Act
      try {
        await usersService.create(createUserDto);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findOneByLogin', () => {
    it('should find a user by login', async () => {
      // Arrange
      const login = 'jose';

      // Act
      const user = await usersService.findOneByLogin(login);

      // Assert
      expect(user).toEqual(userEntityList[1]);
    });

    it('should throw an error when user does not exist', async () => {
      // Arrange
      const login = 'jose';
      jest
        .spyOn(prismaService.user, 'findUniqueOrThrow')
        .mockRejectedValueOnce(new Error());

      // Act
      try {
        await usersService.findOneByLogin(login);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('comparePasswords', () => {
    it('should compare passwords', async () => {
      // Arrange
      const password = 'simple_password';
      const hashedPassword =
        '$2b$10$B/9WMuc8olpKrmn7UWTrhuSgdvGDZGMGo5M2WtN4Wha1cVl5yjEyW';

      // Act
      const result = await usersService.comparePasswords(
        password,
        hashedPassword,
      );

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Arrange
      const id = '1';
      const password = 'simple_password';

      // Act
      const user = await usersService.update(id, password);

      // Assert
      expect(user).toEqual(userEntityList[1]);
    });

    it('should throw an error when updating a user that does not exist', async () => {
      // Arrange
      const id = '1';
      const password = 'simple_password';
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      // Act
      try {
        await usersService.update(id, password);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      // Arrange
      const id = '1';

      // Act
      const user = await usersService.remove(id);

      // Assert
      expect(user).toEqual({});
    });

    it('should throw an error when removing a user that does not exist', async () => {
      // Arrange
      const id = '1';
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      // Act
      try {
        await usersService.remove(id);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
