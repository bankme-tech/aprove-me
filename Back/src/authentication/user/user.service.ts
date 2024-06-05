import { HandleHttpError } from "@/shared/utils/handleError";
import { HashUtils } from "@/shared/utils/hash";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserBasicDto } from "./dto/userBasic.dto";
import { UserCreateDto } from "./dto/userCreate.dto";
import { UserException } from "./exception/userException.enum";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly repository: UserRepository) {}

    public async save(user: UserCreateDto): Promise<void> {
        try {
            this.logger.log(`Start service save - Request - ${JSON.stringify(user)}`);
            const aldearyExistEmail = await this.repository.hasLogin(user.login);
            if (aldearyExistEmail) throw new HttpException(UserException.EMAIL_ALREADY_EXIST, HttpStatus.CONFLICT);

            const hashedPassword = await HashUtils.hash(user.password);

            const userToSave = {
                ...user,
                password: hashedPassword
            };

            await this.repository.create(userToSave);
            this.logger.log("End service save");
        } catch (error) {
            this.logger.error(`Error service save - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async validateCredential(request: UserCreateDto): Promise<UserBasicDto> {
        try {
            this.logger.log(`Start service validateCredential - Request - ${JSON.stringify(request)}`);
            const user = await this.repository.findByLogin(request.login);
            if (!user) throw new HttpException(UserException.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);

            const passwordMatch = await HashUtils.compare(request.password, user.password);
            if (!passwordMatch) {
                throw new HttpException(UserException.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
            }
            this.logger.log(`End service validateCredential - Response - ${JSON.stringify(user)}`);
            return user;
        } catch (error) {
            this.logger.error(`Error service validateCredential - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
