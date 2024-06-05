import { UserBasicDto } from "@/authentication/user/dto/userBasic.dto";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((field: keyof UserBasicDto, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return field ? user?.[field] : user;
});
