"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repo_1 = require("../repositories/user-repo");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(user, jwt) {
        this.user = user;
        this.jwt = jwt;
    }
    async authenticate(body) {
        try {
            const { login, password } = body;
            const user = await this.user.getUserByLogin(login);
            if (user) {
                const unHashedPassword = await bcrypt.compare(password, user.password);
                console.log(unHashedPassword);
                if (unHashedPassword) {
                    const token = this.jwt.sign({ username: user.login, sub: user.id });
                    console.log(token);
                    return { token };
                }
            }
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repo_1.UserRepo,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth-service.js.map