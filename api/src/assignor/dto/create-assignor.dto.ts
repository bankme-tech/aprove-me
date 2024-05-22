import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateAssignorDto {
    @IsNotEmpty({
        message: 'O documento é obrigatório',
    })
    @IsString({
        message: 'O documento deve ser uma string',
    })
    @MaxLength(30, {
        message: 'O documento não pode ter mais de 30 caracteres',
    })
    document: string;

    @IsNotEmpty({
        message: 'O email é obrigatório',
    })
    @IsString({
        message: 'O email deve ser uma string',
    })
    @IsEmail({}, {
        message: 'O email deve ser um endereço de email válido',
    })
    @MaxLength(140, {
        message: 'O email não pode ter mais de 140 caracteres',
    })
    email: string;

    @IsNotEmpty({
        message: 'O telefone é obrigatório',
    })
    @IsString({
        message: 'O telefone deve ser uma string',
    })
    @MaxLength(20, {
        message: 'O telefone não pode ter mais de 20 caracteres',
    })
    phone: string;

    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    @IsString({
        message: 'O nome deve ser uma string',
    })
    @MaxLength(140, {
        message: 'O nome não pode ter mais de 140 caracteres',
    })
    name: string;
}
