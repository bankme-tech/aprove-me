import { Assignor } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class Payable {

    public id: string
    
    @IsNotEmpty()
    public value: number
    
    @IsNotEmpty()
    public emissionDate: Date
    
    public assignor: Assignor
    
    @IsNotEmpty()
    public assignorId: string
}