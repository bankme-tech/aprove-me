import { IsEmail, IsNumberString, IsString, MaxLength } from "class-validator";

export class CreateAssignorDto {
    @IsString()
    @MaxLength(30)
    document: string;
    
    @IsEmail()
    @IsString()
    @MaxLength(140)
    email: string;
    
    @IsString()
    @MaxLength(20)
    @IsNumberString()
    phone: string;
    
    @IsString()
    @MaxLength(140)
    name: string;
}
