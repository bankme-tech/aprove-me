import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { TokenService } from "../token/token.service";
import { CredentialDto } from "./dto/credential.dto";
import { LoginResponseDto } from "./dto/loginResponse.dto";
import { UserDto } from "./dto/userDto";
import { HandleHttpError } from "@/shared/utils/handleError";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly expectedLogin = "aprovame";
    private readonly expectedPassword = "aprovame";
    private readonly mockId = 1;

    constructor(private readonly tokenService: TokenService) {}

    public async login(request: CredentialDto): Promise<LoginResponseDto> {
        try {
            this.logger.log(`Start service login - Request - ${JSON.stringify(request)}`);

            const user = await this.validateCredential(request);

            if (!user) throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED);

            const accessToken = this.tokenService.generateAccessToken(user);

            return { user, accessToken };
        } catch (error) {
            this.logger.error(`Error service login - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    private async validateCredential(request: CredentialDto): Promise<UserDto> {
        try {
            this.logger.log(`Start service validateCredential - Request - ${JSON.stringify(request)}`);
            const { login, password } = request;

            if (login !== this.expectedLogin || password !== this.expectedPassword)
                throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED);

            const user: UserDto = {
                id: this.mockId,
                login: this.expectedLogin
            };
            this.logger.log(`End service validateCredential - Response - ${JSON.stringify(user)}`);
            return user;
        } catch (error) {
            this.logger.error(`Error service validateCredential - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
