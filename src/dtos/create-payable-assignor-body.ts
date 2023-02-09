import { IsNotEmpty, Length } from "class-validator";

export class CreatePayableAssignorBody {
    @IsNotEmpty({ message: 'The field document should not be empty.' })
    @Length(14, 30)
    document: string;

    @IsNotEmpty({ message: 'The field email should not be empty.' })
    @Length(5, 140)
    email: string;

    @IsNotEmpty({ message: 'The field phone should not be empty.' })
    @Length(20, 20)
    phone: string;

    @IsNotEmpty({ message: 'The field name should not be empty.' })
    @Length(10, 140)
    name: string;

    @IsNotEmpty({
        message: 'The field value should not be empty.'
    })
    value: number;

    @IsNotEmpty({
        message: 'The field emissionDate should not be empty.'
    })
    emissionDate: Date;

}