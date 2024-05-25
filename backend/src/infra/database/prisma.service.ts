import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use((params, next) => {
      if (params.action === 'delete') {
        return next({
          ...params,
          action: 'update',
          args: {
            ...params.args,
            data: {
              deletedAt: new Date(),
            },
          },
        });
      }
      if (['findMany', 'findUnique'].includes(params.action)) {
        return next({
          ...params,
          args: {
            ...params.args,
            where: {
              ...params.args?.where,
              deletedAt: null,
            },
          },
        });
      }
      return next(params);
    });
  }
}
