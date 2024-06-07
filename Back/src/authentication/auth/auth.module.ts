import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TokenModule } from "../token/token.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TokenModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
    exports: [AuthService]
})
export class AuthModule {}
