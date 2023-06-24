import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AssignorService } from '../assignor/assignor.service';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';
import { JwtService } from '@nestjs/jwt';

const makeFakeAssignor = () => ({
  id: 1, 
  name: 'any_name',
  email: 'any_email@mail.com'
})
describe('AuthService', () => {
  let sut: AuthService;
  let assignorService: AssignorService;
  let bcryptAdapter: BcryptAdapter;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AssignorService,
          useValue: {
            findOneByUsername: jest.fn().mockResolvedValue({...makeFakeAssignor(), password: 'encrypted_password'})
          }
        },
        {
          provide: BcryptAdapter,
          useValue: {
            compare: jest.fn().mockResolvedValue(true)
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('access_token')
          }
        }
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
    assignorService = module.get<AssignorService>(AssignorService);
    bcryptAdapter = module.get<BcryptAdapter>(BcryptAdapter);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call service with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorService, 'findOneByUsername')

      await sut.validateUser('any_username', 'any_password')
      expect(findOneSpy).toHaveBeenCalledWith({ username: 'any_username' })
    });

    it('should throw if assignor does not exists', async () => {
      jest.spyOn(assignorService, 'findOneByUsername').mockResolvedValueOnce(null)
      const result = await sut.validateUser('any_username', 'any_password')
      expect(result).toBeNull()
    });

    it('should call bcrypt with correct values', async () => {
      const compareSpy = jest.spyOn(bcryptAdapter, 'compare')
      await sut.validateUser('any_username', 'any_password')
      expect(compareSpy).toHaveBeenCalledWith('any_password', 'encrypted_password')
    });

    it('should return null if passwords does not match', async () => {
      jest.spyOn(bcryptAdapter, 'compare').mockResolvedValueOnce(false)
      const result = await sut.validateUser('any_username', 'any_password')
      expect(result).toBeNull()
    });

    it('should return a assignor entity without password on success', async () => {
      const result = await sut.validateUser('any_username', 'any_password')
      expect(result).toEqual(makeFakeAssignor())
    });
  });

  describe('login', () => {
    it('should call jwtService with correct values', async () => {
      const signSpy = jest.spyOn(jwtService, 'sign')
      await sut.login(makeFakeAssignor())
      expect(signSpy).toHaveBeenCalledWith({
        sub: makeFakeAssignor().id,
        email: makeFakeAssignor().email,
      }, {
        secret: expect.any(String)
      })
    });
    
    it('should return a token on success', async () => {
      const response = await sut.login(makeFakeAssignor())
      expect(response).toEqual({
        access_token: 'access_token'
      })
    });
  });
});
