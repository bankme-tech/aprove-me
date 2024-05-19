import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user-repository';
import { userMock } from './user.service.spec';
import { User } from './entities/user.entity';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: UserRepository, useValue: {} }],
    }).compile();

    service = module.get(UserService);
    controller = module.get(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeInstanceOf(UserController);
  });

  it('should create an user and return it', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(userMock);

    const user = await controller.create(userMock);

    expect(user).toEqual(userMock);
    expect(user).toBeInstanceOf(User);
  });
});
