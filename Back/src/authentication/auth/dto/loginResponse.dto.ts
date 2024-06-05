import { UserDto } from "./userDto";

export interface LoginResponseDto {
    user: UserDto;
    accessToken: string;
}
