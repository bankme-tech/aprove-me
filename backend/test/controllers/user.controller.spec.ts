import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { CreateUserInputDTO } from '../../src/user/dto/create-user.input.dto';
import { makeUserDTO } from 'test/mocks/dtos.mock';
import { makeUserEntity } from 'test/mocks/entities/user.entity.mock';

describe('UserController', () => {
  let sut: UserController;
  let dto: CreateUserInputDTO;
  let userServiceSpy: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<UserController>(UserController);
    userServiceSpy = module.get<UserService>(UserService);

    dto = makeUserDTO();
  });
  describe('create()', () => {
    test('should call userService with correct values', async () => {
      await sut.create(dto);

      expect(userServiceSpy.create).toHaveBeenCalledWith(dto);
    });

    test('should return a user', async () => {
      const expected = makeUserEntity();
      jest.spyOn(userServiceSpy, 'create').mockResolvedValue(expected);

      const result = await sut.create(dto);

      expect(result).toStrictEqual(expected);
    });
  });
});
