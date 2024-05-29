import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePayableDTO {
	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	public value: number;

	@IsNotEmpty()
	@IsString()
	@IsUUID()
	public assignorId: string;
}
