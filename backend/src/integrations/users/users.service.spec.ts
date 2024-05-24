import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByLogin', () => {
    it('should call prisma.user.findUnique with correct login', async () => {
      const login = 'example_login';
      const findUniqueSpy = jest.spyOn(prismaService.user, 'findUnique');

      await service.findByLogin(login);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { login },
      });
    });

    it('should return a user if found', async () => {
      const login = 'example_login';
      const user = {
        id: '1',
        login: 'example_login',
        password: 'example_password',
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findByLogin(login);

      expect(result).toEqual(user);
    });

    it('should return undefined if user not found', async () => {
      const login = 'unknown_login';
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findByLogin(login);

      expect(result).toBeNull();
    });
  });
});
