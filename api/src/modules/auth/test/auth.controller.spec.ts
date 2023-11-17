import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { mock } from 'jest-mock-extended';
import { IAuthService } from '../interfaces/auth.service.interface';

describe('AuthController', () => {
  let controller: AuthController;
  const authServiceMock = mock<IAuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('signIn()', () => {
    it('should call signIn with correct params', () => {
      // ACT
      controller.signIn({ username: 'username', password: 'password' });

      // ASSERT
      expect(authServiceMock.signIn).toHaveBeenCalledWith(
        'username',
        'password',
      );
    });
  });
});
