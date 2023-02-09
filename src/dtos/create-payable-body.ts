import { IsNotEmpty, Length } from "class-validator";

export class CreatePayableBody {

    @IsNotEmpty({
        message: 'The field value should not be empty.'
    })
    value: number;

    @IsNotEmpty({
        message: 'The field emissionDate should not be empty.'
    })
    emissionDate: Date;

    @IsNotEmpty({
        message: 'The field assignor should not be empty.'
    })
    assignor: number;
}