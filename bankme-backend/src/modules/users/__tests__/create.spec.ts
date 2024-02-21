import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserRepository } from '../users.repository';

// Mocking the UserRepository
const mockUserRepository = {
  create: jest.fn(),
  findOne: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const mockCreatedUser = { id: 1, ...userData };
      mockUserRepository.create.mockResolvedValue(mockCreatedUser);

      const result = await service.create(userData);

      expect(result).toEqual(mockCreatedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        userData.name,
        userData.email,
        userData.password,
      );
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const userId = 1;
      const mockUser = { id: userId, name: 'John Doe', email: 'john@example.com' };
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne({ id: userId });

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);
    });
  });

  // Add similar tests for other methods like findByEmail, findAll, update, and delete
});
