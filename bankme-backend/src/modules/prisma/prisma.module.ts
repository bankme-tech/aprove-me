import { Global, Module } from '@nestjs/common';

// SERVICES
import { PrismaService } from './prisma.service';

@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
