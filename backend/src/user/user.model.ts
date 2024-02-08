import { IsNotEmpty } from "class-validator";
import { Role } from "src/role/role.enum";

export class User {
    public id: string;
    
    public username: string;

    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    public password: string;

    public roles: Role[]
}