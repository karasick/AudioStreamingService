import {Profile} from "../schemas/profile.model";

export type UserDto = {
    _id: string,
    email: string,
    profile: Profile
}