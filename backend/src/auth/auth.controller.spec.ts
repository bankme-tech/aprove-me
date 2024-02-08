import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/user.model';

const user = new User();
user.login = 'testuser';
user.password = 'testuser';

const jwtToken = '123';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(jwtToken)
          }
        }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe("signIn", () => {
    it("should return a string token successfully", async () => {
      const result = await authController.signIn(user);

      expect(result).toBe(jwtToken);
    });
  });
});
