import { IsEmail, IsNotEmpty, IsString, Length, Matches, Max } from "class-validator";

// TODO - values to constant folder
export class CreateAssignorDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    document: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(3, 140)
    email: string;

    @IsNotEmpty()
    @Length(3, 20)
    phone: string;

    @IsNotEmpty()
    @Matches(/^(?=.*\s)[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, { 
        message: 'Name must be with at least two words with valid characters.',
    })
    name: string;
}
