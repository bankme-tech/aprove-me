import { HandleHttpError } from "@/shared/utils/handleError";
import { Injectable, Logger } from "@nestjs/common";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { CredentialDto } from "./dto/credential.dto";
import { LoginResponseDto } from "./dto/loginResponse.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly tokenService: TokenService, private readonly userService: UserService) {}

    public async login(request: CredentialDto): Promise<LoginResponseDto> {
        try {
            this.logger.log(`Start service login - Request - ${JSON.stringify(request)}`);
            const user = await this.userService.validateCredential(request);
            const accessToken = this.tokenService.generateAccessToken(user);
            const response = { user, accessToken };
            this.logger.log(`End service login - Response - ${JSON.stringify(response)}`);
            return response;
        } catch (error) {
            this.logger.error(`Error service login - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
