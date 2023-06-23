import { IsEmail, IsNotEmpty, IsString, Length, Matches, Max } from "class-validator";
import { validationConstants } from "../../../constants/validation";
import { regexConstants } from "../../../constants/regex";

export class CreateAssignorDto {
    @IsNotEmpty()
    @IsString()
    @Length(validationConstants.user.document.min, validationConstants.user.document.max)
    document: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(validationConstants.user.email.min, validationConstants.user.email.max)
    email: string;

    @IsNotEmpty()
    @Length(validationConstants.user.phone.min, validationConstants.user.phone.max)
    @Matches( regexConstants.user.validatePhone, {
        message: validationConstants.user.phone.message,
    })
    phone: string;

    @IsNotEmpty()
    @Length(validationConstants.user.name.min, validationConstants.user.name.max)
    @Matches(regexConstants.user.validationName, { 
        message: validationConstants.user.name.message
    })
    name: string;

    @IsNotEmpty()
    @Matches(regexConstants.user.validationPassword, {
        message: validationConstants.user.password.message, 
    })
    password: string;
}
