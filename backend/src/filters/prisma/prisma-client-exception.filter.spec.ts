import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { Prisma } from '@prisma/client';
import { ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('PrismaClientExceptionFilter', () => {
  let filter: PrismaClientExceptionFilter;
  let host: DeepMockProxy<ArgumentsHost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaClientExceptionFilter,
        {
          provide: HttpAdapterHost,
          useValue: {
            httpAdapter: {
              reply: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    filter = module.get<PrismaClientExceptionFilter>(
      PrismaClientExceptionFilter,
    );
    host = mockDeep<ArgumentsHost>();
  });

  it('should be defined', () => {
    expect(new PrismaClientExceptionFilter()).toBeDefined();
  });

  it('should catch Prisma.PrismaClientKnownRequestError with known code', () => {
    const exception: Prisma.PrismaClientKnownRequestError = {
      code: 'P2000',
      message: 'Prisma error message',
      meta: {},
      clientVersion: '',
      [Symbol.toStringTag]: '',
      name: '',
    };

    expect(() => filter.catch(exception, host)).not.toThrow();
  });

  it('should return void when host type is not http', () => {
    const exception: Prisma.PrismaClientKnownRequestError = {
      code: 'P2002',
      message: 'Prisma error message',
      meta: {},
      clientVersion: '',
      [Symbol.toStringTag]: '',
      name: '',
    };

    host.getType.mockReturnValue('ws');

    expect(filter.catch(exception, host)).toBeUndefined();
  });
});
