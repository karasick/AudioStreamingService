import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {jwtConstants} from "../constants";
import {UserDto} from "../../user/dto/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secretAccessKey,
            ignoreExpiration: false
        });
    }

    async validate(payload: UserDto) : Promise<UserDto> {
        const user = {
            _id: payload._id,
            email: payload.email,
            profile: payload.profile
        }

        return user
    }
}