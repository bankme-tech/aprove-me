import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from '../utils';
import { Role } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenException } from '@nestjs/common';

jest.mock('../utils', () => ({
  validateDto: jest.fn(),
}));

describe('UsersService', () => {
  const prismaServiceMock = mockDeep<PrismaClient>();
  let usersService: UsersService;
  let authServiceMock = mockDeep<AuthService>();
  let createUserDto: CreateUserDto;
  let responseDto: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();

    createUserDto = {
      username: 'testuser',
      password: 'password',
      role: Role.USER,
    };

    responseDto = {
      ...createUserDto,
      assignorId: null,
    };

    usersService = module.get<UsersService>(UsersService);

    authServiceMock = module.get<AuthService>(
      AuthService,
    ) as DeepMockProxy<AuthService>;
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      (validateDto as jest.Mock).mockResolvedValue(createUserDto);

      authServiceMock.hashPassword.mockResolvedValue('password');

      //@ts-ignore
      prismaServiceMock.user.create.mockResolvedValue(responseDto);

      const result = await usersService.create(createUserDto);

      expect(result).toEqual(responseDto);
      expect(validateDto).toHaveBeenCalledWith(createUserDto, CreateUserDto);
      expect(authServiceMock.hashPassword).toHaveBeenCalledWith('password');
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: 'password',
        },
        select: {
          assignorId: true,
          role: true,
          username: true,
        },
      });
    });
  });

  describe('findByUsername', () => {
    it('should return a user without password', async () => {
      const username = 'testuser';
      prismaServiceMock.user.findUnique.mockResolvedValue(responseDto);

      const result = await usersService.findByUsername(username);

      expect(result).toEqual(responseDto);

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { username },
        select: {
          role: true,
          assignor: true,
          username: true,
          password: false,
        },
      });
    });

    it('should return a user with password', async () => {
      const username = 'testuser';
      prismaServiceMock.user.findUnique.mockResolvedValue(responseDto);

      const result = await usersService.findByUsername(username, true);

      expect(result).toEqual(responseDto);

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { username },
        select: {
          role: true,
          assignor: true,
          username: true,
          password: true,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { assignorId: null, role: 'user', username: 'user1' },
        { assignorId: null, role: 'admin', username: 'user2' },
      ];

      prismaServiceMock.user.findMany
        .calledWith({
          select: {
            assignorId: true,
            role: true,
            username: true,
          },
        })
        .mockResolvedValue(users as any);

      prismaServiceMock.user.findMany.mockResolvedValue(users as any);

      const result = await usersService.findAll();

      expect(result).toEqual(users);
      expect(prismaServiceMock.user.findMany).toHaveBeenCalledWith({
        select: {
          assignorId: true,
          role: true,
          username: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const username = 'testuser';
      const updateUserDto: UpdateUserDto = { password: 'newpassword' };
      const updatedUser = {
        assignorId: null,
        role: 'admin',
        username: 'testuser',
      };

      (validateDto as jest.Mock).mockResolvedValue(updateUserDto);
      prismaServiceMock.user.update.mockResolvedValue(updatedUser as any);

      const result = await usersService.update(username, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(validateDto).toHaveBeenCalledWith(updateUserDto, UpdateUserDto);
      expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
        where: { username },
        data: updateUserDto,
        select: {
          assignorId: true,
          role: true,
          username: true,
        },
      });
    });

    it('should throw an error if trying to update "aprovame" user', async () => {
      const username = 'aprovame';
      const updateUserDto: UpdateUserDto = { role: Role.ADMIN };

      await expect(
        usersService.update(username, updateUserDto),
      ).rejects.toThrow('You cannot update the aprovame user');
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const username = 'testuser';
      prismaServiceMock.user.delete.mockResolvedValue({
        assignorId: null,
        role: 'user',
        username: 'testuser',
      } as any);

      const result = await usersService.remove(username);

      expect(result).toEqual({
        assignorId: null,
        role: 'user',
        username: 'testuser',
      });
      expect(prismaServiceMock.user.delete).toHaveBeenCalledWith({
        where: { username },
      });
    });

    it('should throw an error if trying to delete "aprovame" user', async () => {
      const username = 'aprovame';

      await expect(usersService.remove(username)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
