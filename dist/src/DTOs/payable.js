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
exports.PayableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PayableDto {
}
exports.PayableDto = PayableDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        format: 'uuid',
        example: '2c91808f-e1d0-4b8b-b8c2-e8e7f7e8e8e8',
        description: 'ID do recebível',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayableDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
        example: 1000,
        description: 'Valor do recebível',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PayableDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Date,
        example: '2021-06-01T00:00:00.000Z',
        description: 'Data de emissão do recebível',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PayableDto.prototype, "emissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        format: 'uuid',
        example: '2c91808f-e1d0-4b8b-b8c2-e8e7f7e8e8e8',
        description: 'Referência do identificador do cedente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayableDto.prototype, "assignor", void 0);
//# sourceMappingURL=payable.js.map