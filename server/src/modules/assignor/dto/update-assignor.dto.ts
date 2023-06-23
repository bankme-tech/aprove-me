import { IsOptional, Length, Matches } from "class-validator";

import { regexConstants } from "../../../constants/regex";
import { validationConstants } from "../../../constants/validation";

export class UpdateAssignorDto {
    @IsOptional()
    @Length(validationConstants.user.phone.min, validationConstants.user.phone.max)
    @Matches( regexConstants.user.validatePhone, {
        message: validationConstants.user.phone.message,
    })
    phone?: string;

    @IsOptional()
    @Length(validationConstants.user.name.min, validationConstants.user.name.max)
    @Matches(regexConstants.user.validationName, { 
        message: validationConstants.user.name.message
    })
    name?: string;
}
