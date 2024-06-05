import { DateUtils } from "@/shared/utils/date";
import { HandleHttpError } from "@/shared/utils/handleError";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Secret, verify } from "jsonwebtoken";
import { AuthException } from "../exception/authException.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);
    private readonly jwtSecret = this.configService.get("auth.jwtSecret");
    constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const preAuthorized = this.reflector.get<boolean>("pre-authorized", context.getHandler());

        if (preAuthorized) return true;

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeaders(request);

        if (!token) throw new HttpException(AuthException.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);

        try {
            const decodedToken = verify(token, this.jwtSecret as Secret) as any;
            if (new Date(decodedToken.exp) < DateUtils.today())
                throw new HttpException(AuthException.EXPIRED_TOKEN, HttpStatus.UNAUTHORIZED);

            const user = JSON.parse(decodedToken.sub);

            request.user = user;

            return true;
        } catch (error) {
            this.logger.error(`Error service canActivate - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    private extractTokenFromHeaders(request: any): string | undefined {
        const authHeader = request.headers["authorization"];

        if (authHeader && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return undefined;
    }
}
