import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AssignorService } from '../assignor/assignor.service';
import {
  assignorCreatedMock,
  assignorEntityMock,
} from '../assignor/mocks/mock';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { wrongLoginInfo } from './mocks/mocks';

describe('AuthService', () => {
  let authService: AuthService;
  let assignorService: AssignorService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AssignorService,
          useValue: {
            findAssignorByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    assignorService = module.get<AssignorService>(AssignorService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(assignorService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('login', () => {
    it('should return a token', async () => {
      const assignor = assignorEntityMock;
      const senha = assignor.password;
      assignor.password = await bcrypt.hash(assignor.password, 10);
      jest
        .spyOn(assignorService, 'findAssignorByEmail')
        .mockResolvedValue(assignor);

      const token = await authService.login(assignorCreatedMock.email, senha);

      expect(token).toEqual({ token: 'token' });
    });

    it('should throw an UnauthorizedException', async () => {
      const assignor = assignorEntityMock;
      assignor.password = await bcrypt.hash(assignor.password, 10);
      jest
        .spyOn(assignorService, 'findAssignorByEmail')
        .mockResolvedValue(assignor);

      try {
        authService.login(assignorCreatedMock.email, wrongLoginInfo.password);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
