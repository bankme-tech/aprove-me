import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

// MODULES
import { PrismaModule } from './modules/prisma/prisma.module';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';
import { AmqpModule } from './modules/amqp/amqp.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
	imports: [
		AppConfigModule,
		PrismaModule,
		AuthModule,
		AssignorModule,
		PayableModule,
		AmqpModule,
		MailModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
