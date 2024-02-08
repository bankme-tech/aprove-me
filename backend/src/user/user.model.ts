import { IsNotEmpty } from "class-validator";

export class User {
    public id: string;
    
    public username: string;

    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    public password: string;
}