import { IsDate, IsEmail, IsInt, IsString, MaxLength } from 'class-validator'

export class CreateReceivableDTO {
    // Recebível
    @IsString()
    id: string; // uuid

    @IsInt()
    value: number; // float
    
    @IsDate()
    emissionDate: Date; // date

    @IsInt()
    assignor: number; // int

    // Cedente
    @IsString()
    @MaxLength(30)
    document: string // max (30)
    
    @IsEmail()
    @MaxLength(140)
    email: string // max (140)
    
    @IsString()
    @MaxLength(20)
    phone: string // max (20)
    
    @IsString()
    @MaxLength(140)
    name: string // max (140)
}