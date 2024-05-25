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
exports.AssignorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AssignorDto {
}
exports.AssignorDto = AssignorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'ID do cedente',
        type: String,
        format: 'uuid',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignorDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'É o documento do cedente, como CNPJ ou CPF',
        type: String,
        minLength: 5,
        maxLength: 140,
        example: 'CPF: 12345678901, CNPJ: 12345678901234',
    }),
    (0, class_validator_1.Length)(5, 30),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignorDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'É o email do cedente',
        type: String,
        minLength: 5,
        maxLength: 140,
        example: 'teste@teste.com',
    }),
    (0, class_validator_1.Length)(5, 140),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'É o telefone do cedente',
        type: String,
        minLength: 5,
        maxLength: 20,
        example: '123456789',
    }),
    (0, class_validator_1.Length)(5, 20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignorDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'É o nome do cedente',
        type: String,
        minLength: 5,
        maxLength: 140,
        example: 'Cedente Teste da Silva',
    }),
    (0, class_validator_1.Length)(5, 140),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignorDto.prototype, "name", void 0);
//# sourceMappingURL=assignor.js.map