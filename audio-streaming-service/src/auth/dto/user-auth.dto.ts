import {UserDto} from "../../user/dto/user.dto";

export type UserAuthDto = {
    accessToken: string,
    refreshToken: string,
    user: UserDto
}