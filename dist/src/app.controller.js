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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const payable_1 = require("./DTOs/payable");
const assignor_1 = require("./DTOs/assignor");
const payable_repo_1 = require("./repositories/payable-repo");
const assignor_repo_1 = require("./repositories/assignor-repo");
const user_1 = require("./DTOs/user");
const user_repo_1 = require("./repositories/user-repo");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth/auth-service");
const passport_1 = require("@nestjs/passport");
let AppController = class AppController {
    constructor(payable, assignor, user, authService) {
        this.payable = payable;
        this.assignor = assignor;
        this.user = user;
        this.authService = authService;
    }
    async auth(body) {
        try {
            const response = await this.authService.authenticate(body);
            if (response) {
                return response;
            }
            throw new common_1.NotFoundException('Login or password incorrect');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(body) {
        try {
            const userExist = await this.user.getUserByLogin(body.login);
            if (userExist) {
                throw new common_1.BadRequestException('User already exists');
            }
            const createUser = await this.user.createUser(body);
            return createUser;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserById(id) {
        try {
            const user = await this.user.getUserById(+id);
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserByLogin(login) {
        try {
            const user = await this.user.getUserByLogin(login);
            if (!user) {
                throw new common_1.NotFoundException(`User with login ${login} not found`);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserAll() {
        try {
            const users = await this.user.getUsersAll();
            if (!users) {
                throw new common_1.NotFoundException('Users not found');
            }
            return users;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, body) {
        try {
            const userExist = await this.user.getUserById(+id);
            if (!userExist) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            const user = await this.user.updateUser(+id, body);
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        try {
            const userExist = await this.user.getUserById(+id);
            if (!userExist) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            await this.user.deleteUser(+id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createPayable(body) {
        try {
            const payableExist = await this.payable.getPayableById(body.id);
            if (payableExist) {
                throw new common_1.BadRequestException('Payable already exists');
            }
            const newReceived = await this.payable.createPayable(body);
            return newReceived;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPayableById(id) {
        try {
            const payable = await this.payable.getPayableById(id);
            if (!payable) {
                throw new common_1.NotFoundException(`Payable with ID ${id} not found`);
            }
            return payable;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPayableAll() {
        try {
            const payables = await this.payable.getAllPayables();
            if (!payables) {
                throw new common_1.NotFoundException('Payables not found');
            }
            return payables;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePayable(id, body) {
        try {
            const payableExist = await this.payable.getPayableById(id);
            if (!payableExist) {
                throw new common_1.NotFoundException(`Payable with ID ${id} not found`);
            }
            const payableUpdated = await this.payable.updatePayable(id, body);
            return payableUpdated;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePayable(id) {
        try {
            const payableExist = await this.payable.getPayableById(id);
            if (!payableExist) {
                throw new common_1.NotFoundException(`Payable with ID ${id} not found`);
            }
            await this.payable.deletePayable(id);
            return null;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAssignor(body) {
        try {
            const assignorExist = await this.assignor.getAssignorById(body.id);
            if (assignorExist) {
                throw new common_1.BadRequestException('Assignor already exists');
            }
            const newAssignor = await this.assignor.createAssignor(body);
            return newAssignor;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAssignorById(id) {
        try {
            const assignors = await this.assignor.getAssignorById(id);
            if (!assignors) {
                throw new common_1.NotFoundException(`Assignor with ID ${id} not found`);
            }
            return assignors;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAssignorsAll() {
        try {
            const assignors = await this.assignor.getAllAssignors();
            if (assignors.length === 0 || !assignors) {
                throw new common_1.NotFoundException('Assignors not found');
            }
            return assignors;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAssignor(id, body) {
        try {
            const assignorExist = await this.assignor.getAssignorById(id);
            if (!assignorExist) {
                throw new common_1.NotFoundException(`Assignor with ID ${id} not found`);
            }
            const assignorUpdated = await this.assignor.updateAssignor(id, body);
            return assignorUpdated;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAssignor(id) {
        try {
            await this.assignor.deleteAssignor(id);
            return null;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Post)('auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.UserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "auth", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Post)('user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.UserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Get)('user/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Get)('user/login/search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('login')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUserByLogin", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Get)('user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUserAll", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Put)('user/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.UserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Delete)('user/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiTags)('Payables'),
    (0, common_1.Post)('payable'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payable_1.PayableDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createPayable", null);
__decorate([
    (0, swagger_1.ApiTags)('Payables'),
    (0, common_1.Get)('payable/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPayableById", null);
__decorate([
    (0, swagger_1.ApiTags)('Payables'),
    (0, common_1.Get)('payable'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPayableAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Payables'),
    (0, common_1.Put)('payable/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payable_1.PayableDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updatePayable", null);
__decorate([
    (0, swagger_1.ApiTags)('Payables'),
    (0, common_1.Delete)('payable/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deletePayable", null);
__decorate([
    (0, swagger_1.ApiTags)('Assignors'),
    (0, common_1.Post)('assignor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assignor_1.AssignorDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createAssignor", null);
__decorate([
    (0, swagger_1.ApiTags)('Assignors'),
    (0, common_1.Get)('assignor/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAssignorById", null);
__decorate([
    (0, swagger_1.ApiTags)('Assignors'),
    (0, common_1.Get)('assignor'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAssignorsAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Assignors'),
    (0, common_1.Put)('assignor/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assignor_1.AssignorDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateAssignor", null);
__decorate([
    (0, swagger_1.ApiTags)('Assignors'),
    (0, common_1.Delete)('assignor/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteAssignor", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('integrations'),
    __metadata("design:paramtypes", [payable_repo_1.PayableRepo,
        assignor_repo_1.AssignorRepo,
        user_repo_1.UserRepo,
        auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map