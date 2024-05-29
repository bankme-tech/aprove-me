import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// INTERFACES
import { IJWTStrategy } from './interfaces/jwt-strategy.interface';
import { IJWTToken } from './interfaces/jwt-token.interface';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy
	extends PassportStrategy(Strategy, 'jwt')
	implements IJWTStrategy
{
	private readonly logger: Logger = new Logger(JwtStrategy.name);

	constructor(private readonly prismaService: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET,
		});
	}

	public async validate(payload: IJWTToken): Promise<IJWTToken> {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					id: payload.id,
				},
			});
			if (!user) {
				throw new UnauthorizedException('User not found');
			}

			return payload;
		} catch (error) {
			this.logger.error(error);
			throw new UnauthorizedException('Invalid token');
		}
	}
}
