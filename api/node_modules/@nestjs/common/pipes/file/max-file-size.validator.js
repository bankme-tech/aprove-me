"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxFileSizeValidator = void 0;
const file_validator_interface_1 = require("./file-validator.interface");
/**
 * Defines the built-in MaxSize File Validator
 *
 * @see [File Validators](https://docs.nestjs.com/techniques/file-upload#validators)
 *
 * @publicApi
 */
class MaxFileSizeValidator extends file_validator_interface_1.FileValidator {
    buildErrorMessage() {
        return `Validation failed (expected size is less than ${this.validationOptions.maxSize})`;
    }
    isValid(file) {
        if (!this.validationOptions) {
            return true;
        }
        return file.size < this.validationOptions.maxSize;
    }
}
exports.MaxFileSizeValidator = MaxFileSizeValidator;
