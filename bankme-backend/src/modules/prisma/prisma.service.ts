import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			log: ['info'],
		});
	}

	public async onModuleInit(): Promise<void> {
		await this.$connect();
		this.$use(async (params, next) => {
			if (params.action === 'create' && params.model === 'User') {
				const user = params.args.data as User;
				const salt = await genSalt(12);
				const hashedPass = await hash(user.password, salt);

				user.password = hashedPass;
				params.args.data = user;
			}

			return next(params);
		});
	}

	public async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
