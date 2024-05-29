import { IsString } from 'class-validator';

export class RegisterDTO {
	@IsString()
	public login: string;

	@IsString()
	public password: string;
}
