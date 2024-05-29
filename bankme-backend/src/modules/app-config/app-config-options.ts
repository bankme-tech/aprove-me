import { ConfigModuleOptions } from '@nestjs/config';
import { existsSync } from 'fs';

const envFilePath = `${process.cwd()}/.env`;
const configOptions: ConfigModuleOptions = {
	isGlobal: true,
	envFilePath: undefined,
};

if (existsSync(envFilePath)) {
	configOptions.envFilePath = envFilePath;
}

export { configOptions };
