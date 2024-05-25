import { UserDto } from '../../DTOs/user';
import { PrismaService } from '../../database/prisma.service';
import { UserRepo } from '../user-repo';
export declare class prismaUserRepo implements UserRepo {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(body: UserDto): Promise<any>;
    getUserById(id: number): Promise<UserDto>;
    getUserByLogin(login: string): Promise<UserDto>;
    getUsersAll(): Promise<UserDto[]>;
    updateUser(id: number, body: UserDto): Promise<UserDto>;
    deleteUser(id: number): Promise<{
        id: number;
        login: string;
        password: string;
    }>;
}
