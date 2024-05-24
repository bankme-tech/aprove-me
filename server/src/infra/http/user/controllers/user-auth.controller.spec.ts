import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthController } from './user-auth.controller';

describe('UserAuthController', () => {
  let controller: UserAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAuthController],
    }).compile();

    controller = module.get<UserAuthController>(UserAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
