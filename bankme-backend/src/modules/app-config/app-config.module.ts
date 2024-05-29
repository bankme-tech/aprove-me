import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configOptions } from './app-config-options';

@Global()
@Module({
	imports: [ConfigModule.forRoot(configOptions)],
})
export class AppConfigModule {}
