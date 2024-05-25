import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthInputDTO } from 'src/auth/dto/auth.input.dto';
import { makeAuthDTO } from 'test/mocks/dtos.mock';
import { AuthService } from 'src/auth/auth.service';

describe('AuthController', () => {
  let sut: AuthController;
  let dto: AuthInputDTO;
  let authServiceSpy: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            authenticate: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<AuthController>(AuthController);
    authServiceSpy = module.get<AuthService>(AuthService);

    dto = makeAuthDTO();
  });

  describe('authenticate()', () => {
    test('should call authService with correct values', async () => {
      await sut.authenticate(dto);

      expect(authServiceSpy.authenticate).toHaveBeenCalledWith(dto);
    });

    test('should return a token', async () => {
      jest
        .spyOn(authServiceSpy, 'authenticate')
        .mockResolvedValue({ token: 'jwt-token' });
      const result = await sut.authenticate(dto);

      expect(result).toHaveProperty('token');
      expect(typeof result.token).toBe('string');
    });
  });
});
