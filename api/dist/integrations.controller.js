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
exports.IntegrationsController = void 0;
const common_1 = require("@nestjs/common");
const create_assignor_body_1 = require("./dtos/create-assignor-body");
const create_payable_assignor_body_1 = require("./dtos/create-payable-assignor-body");
const create_payable_body_1 = require("./dtos/create-payable-body");
const update_assignor_1 = require("./dtos/update-assignor");
const update_payable_1 = require("./dtos/update-payable");
const assignor_repository_1 = require("./repositories/assignor-repository");
const payable_repository_1 = require("./repositories/payable-repository");
let IntegrationsController = class IntegrationsController {
    constructor(assignorRepository, payableRepository) {
        this.assignorRepository = assignorRepository;
        this.payableRepository = payableRepository;
    }
    async payable(body) {
        return await this.payableRepository.payable(body);
    }
    async addAssignor(body) {
        return await this.assignorRepository.addAssignor(body);
    }
    async addPayable(body) {
        return await this.payableRepository.addPayable(body);
    }
    async getPayable(params) {
        return await this.payableRepository.getPayable(params.id);
    }
    async payableAll() {
        return await this.payableRepository.getpayableAll();
    }
    async getAssignor(params) {
        return await this.assignorRepository.getAssignor(params.id);
    }
    async assignorAll() {
        return await this.assignorRepository.getAssignorAll();
    }
    async updatePayable(params, body) {
        return await this.payableRepository.updatePayable(params.id, body);
    }
    async updateAssignor(params, body) {
        return await this.assignorRepository.updateAssignor(params.id, body);
    }
    async deletePayable(params) {
        return await this.payableRepository.deletePayable(params.id);
    }
    async deleteAssignor(params) {
        return await this.assignorRepository.deleteAssignor(params.id);
    }
};
__decorate([
    (0, common_1.Post)('payable'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payable_assignor_body_1.CreatePayableAssignorBody]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "payable", null);
__decorate([
    (0, common_1.Post)('addAssignor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignor_body_1.CreateAssignorBody]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "addAssignor", null);
__decorate([
    (0, common_1.Post)('addPayable'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payable_body_1.CreatePayableBody]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "addPayable", null);
__decorate([
    (0, common_1.Get)('payable/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "getPayable", null);
__decorate([
    (0, common_1.Get)('payableAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "payableAll", null);
__decorate([
    (0, common_1.Get)('assignor/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "getAssignor", null);
__decorate([
    (0, common_1.Get)('assignorAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "assignorAll", null);
__decorate([
    (0, common_1.Put)('payable/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_payable_1.UpdatePayable]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "updatePayable", null);
__decorate([
    (0, common_1.Put)('assignor/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_assignor_1.UpdateAssignor]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "updateAssignor", null);
__decorate([
    (0, common_1.Delete)('payable/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "deletePayable", null);
__decorate([
    (0, common_1.Delete)('assignor/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "deleteAssignor", null);
IntegrationsController = __decorate([
    (0, common_1.Controller)('integrations'),
    __metadata("design:paramtypes", [assignor_repository_1.AssignorRepository,
        payable_repository_1.PayableRepository])
], IntegrationsController);
exports.IntegrationsController = IntegrationsController;
//# sourceMappingURL=integrations.controller.js.map