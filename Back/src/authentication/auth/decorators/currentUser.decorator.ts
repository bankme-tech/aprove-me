import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDto } from "../dto/userDto";

export const CurrentUser = createParamDecorator((field: keyof UserDto, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return field ? user?.[field] : user;
});
