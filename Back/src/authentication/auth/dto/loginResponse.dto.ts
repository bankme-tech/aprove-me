import { UserBasicDto } from "@/authentication/user/dto/userBasic.dto";

export interface LoginResponseDto {
    user: UserBasicDto;
    accessToken: string;
}
