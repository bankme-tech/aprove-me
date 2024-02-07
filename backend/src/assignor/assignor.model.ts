import { Payable } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class Assignor {
    public id: string

    @IsNotEmpty()
    public document: string

    @IsNotEmpty()
    public email: string

    @IsNotEmpty()
    public phone: string

    @IsNotEmpty()
    public name: string

    public payable: Payable[]
}