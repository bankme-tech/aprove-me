import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateAssignorDTO {
	@IsString()
	@MaxLength(140)
	@IsNotEmpty()
	public name: string;

	@IsString()
	@MaxLength(140)
	@IsNotEmpty()
	public email: string;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	public document: string;

	@IsString()
	@MaxLength(20)
	@IsNotEmpty()
	public phone: string;
}
