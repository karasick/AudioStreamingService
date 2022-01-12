import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {UserCredentialsDto} from "../../user/dto/user-credentials.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string) {
        const userDto = {email, password}
        const user = await this.authService.validateUser(userDto)

        return user
    }
}