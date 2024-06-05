import { IsNotEmpty, IsString } from "class-validator";

export class CredentialDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    login: string;
}
