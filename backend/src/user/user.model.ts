import { IsNotEmpty } from "class-validator";

export class User {
    public id: string;

    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    public password: string;

    public roles: any[]
}