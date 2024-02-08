import { Payable } from "@prisma/client";
import { IsNotEmpty, Length } from "class-validator";

export class Assignor {
    public id: string

    @IsNotEmpty()
    @Length(0, 30)
    public document: string

    @IsNotEmpty()
    @Length(0, 140)
    public email: string

    @IsNotEmpty()
    @Length(0, 20)
    public phone: string

    @IsNotEmpty()
    @Length(0, 140)
    public name: string

    public payable: Payable[]

    public deleted: boolean
}