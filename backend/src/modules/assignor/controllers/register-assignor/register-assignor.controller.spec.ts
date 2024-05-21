import { Test, TestingModule } from '@nestjs/testing';
import { RegisterAssignorController } from './register-assignor.controller';
import { RegisterAssignorService } from '../../services/register-assignor/register-assignor.service';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '../../repositories/in-memory/assignor.repository';
import { faker } from '@faker-js/faker';

describe('RegisterAssignorController', () => {
  let controller: RegisterAssignorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterAssignorController],
      providers: [
        RegisterAssignorService,
        {
          provide: IAssignorRepository,
          useClass: InMemoryAssignorRepository,
        },
      ],
    }).compile();

    controller = module.get<RegisterAssignorController>(
      RegisterAssignorController,
    );
  });

  it('should register an assignor', async () => {
    const result = await controller.handle({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      document: '123.456.789-00',
      phone: `+55 31 90000-0000`,
    });

    expect(result).toEqual(
      expect.objectContaining({
        document: '123.456.789-00',
        phone: `+55 31 90000-0000`,
      }),
    );
  });
});
