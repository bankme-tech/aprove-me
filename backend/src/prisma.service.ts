import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params, next) => {
      // Check incoming query type
      if (params.model == 'Payable') {
        if (params.action == 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update'
          params.args['data'] = { deleted: true }
        }
        if (params.action == 'deleteMany') {
          // Delete many queries
          params.action = 'updateMany'
          if (params.args.data != undefined) {
            params.args.data['deleted'] = true
          } else {
            params.args['data'] = { deleted: true }
          }
        }
      }

      // Check incoming query type
      if (params.model == 'Assignor') {
        if (params.action == 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update'
          params.args['data'] = { deleted: true }
        }
        if (params.action == 'deleteMany') {
          // Delete many queries
          params.action = 'updateMany'
          if (params.args.data != undefined) {
            params.args.data['deleted'] = true
          } else {
            params.args['data'] = { deleted: true }
          }
        }
      }
      return next(params)
    });

    await this.$connect();
  }
}