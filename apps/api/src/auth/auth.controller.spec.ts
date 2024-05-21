import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { secret } from '../constants/jwt';
import { hashSync } from 'bcryptjs';

describe('AuthController', () => {
  let controller: AuthController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.$executeRaw`DELETE FROM "Admin"`;
  });

  afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM "Admin"`;
  });

  it('signs up an admin', async () => {
    const { token } = await controller.signUp({
      login: 'admin',
      password: '12312313',
    });

    expect(token).toEqual(expect.any(String));
  });

  it('logs in a admin', async () => {
    const admin = await prisma.admin.create({
      data: {
        login: 'admin',
        password: hashSync('123123123'),
      },
    });

    const { token } = await controller.signIn({
      login: admin.login,
      password: '123123123',
    });

    expect(token).toEqual(expect.any(String));
  });
});
