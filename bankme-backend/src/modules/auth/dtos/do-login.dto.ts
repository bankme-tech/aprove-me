import { IsString } from 'class-validator';

export class DoLoginDTO {
	@IsString()
	public login: string;

	@IsString()
	public password: string;
}
