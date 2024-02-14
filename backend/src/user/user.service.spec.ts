import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { User } from './user.model';

const user = new User();
user.login = 'aprovame';
user.password = 'arovame';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep(PrismaClient))
      .compile();

    userService = module.get(UserService);
    prismaService = module.get(PrismaService);

    prismaService.user.findFirst = jest.fn().mockResolvedValue(user)
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe("getUserByLogin", () => {
    it("should return a user successfully with the same login sent", async () => {
      const result = await userService.getUserByLogin(user.login);

      expect(result.login).toBe(user.login);
    })
  });
});
