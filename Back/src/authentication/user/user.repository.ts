import { PrismaService } from "@/shared/prisma/prisma.service";
import { UserDto } from "./dto/user.dto";
import { UserCreateDto } from "./dto/userCreate.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(private readonly database: PrismaService) {}

    async create(data: UserCreateDto): Promise<void> {
        await this.database.user.create({
            data
        });
    }
    async hasLogin(login: string): Promise<boolean> {
        const count = await this.database.user.count({
            where: { login }
        });
        return count > 0;
    }
    async findByLogin(login: string): Promise<UserDto | null> {
        return await this.database.user.findUnique({
            where: { login }
        });
    }
}
