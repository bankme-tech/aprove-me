import { DateUtils } from "@/shared/utils/date";
import { HandleHttpError } from "@/shared/utils/handleError";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sign } from "jsonwebtoken";
import { UserBasicDto } from "../user/dto/userBasic.dto";

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);
    private readonly quantityMinutesToken = this.configService.get("auth.expirationMinutes");
    private readonly secretToken = this.configService.get("auth.jwtSecret");

    constructor(private readonly configService: ConfigService) {}

    public generateAccessToken(user: UserBasicDto): string {
        try {
            this.logger.log(`Start service generateAccessToken - Request - ${JSON.stringify({ user })}`);

            const now = DateUtils.today();

            const payload = {
                sub: JSON.stringify(user),
                exp: new Date(now.setMinutes(now.getMinutes() + this.quantityMinutesToken)).getTime(),
                iat: now.getTime()
            };

            const token = sign(payload, this.secretToken);

            this.logger.log("End service generateAccessToken");

            return token;
        } catch (error) {
            this.logger.error(`Error service generateAccessToken - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
