import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

// INTERFACES
import { IAuthService } from './interfaces/auth-service.interface';
import { IJWTToken } from './interfaces/jwt-token.interface';

// DTOS
import { RegisterDTO } from './dtos/register.dto';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';
import { DoLoginDTO } from './dtos/do-login.dto';

@Injectable()
export class AuthService implements IAuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	public async register(data: RegisterDTO): Promise<void> {
		this.logger.log(`Create User - data: ${JSON.stringify(data)}`);

		const alreadyExists = await this.prismaService.user.findFirst({
			where: {
				login: data.login,
			},
		});
		if (alreadyExists) {
			throw new BadRequestException('Login already exists');
		}

		await this.prismaService.user.create({
			data,
		});
	}

	public async doLogin(data: DoLoginDTO): Promise<{ token: string }> {
		this.logger.log(`Do Login - data: ${JSON.stringify(data)}`);

		const user = await this.prismaService.user.findFirst({
			where: {
				login: data.login,
			},
		});

		if (!user) {
			this.logger.error('user not found');
			throw new BadRequestException('Invalid credentials');
		}

		if (!(await compare(data.password, user.password))) {
			throw new BadRequestException('Invalid credentials');
		}

		return {
			token: this.jwtService.sign(
				{
					id: user.id,
					login: user.login,
				} as IJWTToken,
				{
					secret: process.env.SECRET,
					expiresIn: '12h',
				},
			),
		};
	}
}
