import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/user.entity';
import {
  ForbiddenException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { SafeUserDto } from './dto/safe-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersServiceMock: DeepMockProxy<UsersService>;

  let createUserDto: CreateUserDto;
  let responseDto: SafeUserDto;

  beforeEach(async () => {
    usersServiceMock = mockDeep<UsersService>();
    createUserDto = {
      username: 'testuserr',
      password: 'password',
      role: Role.USER,
    };

    responseDto = {
      role: createUserDto.role,
      username: createUserDto.username,
      assignorId: undefined,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      controllers: [UsersController],
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      usersServiceMock.create.mockResolvedValue(responseDto as any);

      const result = await usersController.create(createUserDto);

      expect(result).toEqual(responseDto);
      expect(usersServiceMock.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { assignorId: null, role: 'user', username: 'user1' },
        { assignorId: null, role: 'admin', username: 'user2' },
      ];

      usersServiceMock.findAll.mockResolvedValue(users as any);

      const result = await usersController.findAll();

      expect(result).toEqual(users);
      expect(usersServiceMock.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const username = 'testuser';
      const responseDto = {
        assignorId: null,
        role: 'user',
        username: 'testuser',
      };

      usersServiceMock.findByUsername.mockResolvedValue(responseDto as any);

      const result = await usersController.findOne(username);

      expect(result).toEqual(responseDto);
      expect(usersServiceMock.findByUsername).toHaveBeenCalledWith(username);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const username = 'nonexistentuser';

      usersServiceMock.findByUsername.mockResolvedValue(null);

      await expect(usersController.findOne(username)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const username = 'testuser';
      const updateUserDto: UpdateUserDto = { password: 'newpassword' };
      const responseDto = {
        assignorId: null,
        role: 'user',
        username: 'testuser',
      };
      const req = { user: { username: 'testuser' } };

      usersServiceMock.update.mockResolvedValue(responseDto as any);

      const result = await usersController.update(username, updateUserDto, req);

      expect(result).toEqual(responseDto);
      expect(usersServiceMock.update).toHaveBeenCalledWith(
        username,
        updateUserDto,
      );
    });

    it('should throw a ForbiddenException if trying to update "aprovame" user', async () => {
      const username = 'aprovame';
      const updateUserDto: UpdateUserDto = { role: Role.ADMIN };
      const req = { user: { username: 'testuser' } };

      await expect(
        usersController.update(username, updateUserDto, req),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const username = 'testuser';
      const responseDto = {
        assignorId: null,
        role: 'user',
        username: 'testuser',
      };

      usersServiceMock.remove.mockResolvedValue(responseDto as any);

      const result = await usersController.remove(username);

      expect(result).toEqual(responseDto);
      expect(usersServiceMock.remove).toHaveBeenCalledWith(username);
    });

    it('should throw a ForbiddenException if trying to delete "aprovame" user', async () => {
      const username = 'aprovame';

      usersServiceMock.remove.mockRejectedValue(new ForbiddenException());

      await expect(usersController.remove(username)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
