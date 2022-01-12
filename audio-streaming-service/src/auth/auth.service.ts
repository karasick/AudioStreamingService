import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {UserCredentialsDto} from "../user/dto/user-credentials.dto";
import * as bcrypt from "bcryptjs"
import {User} from "../user/schemas/user.model";
import {TokenService} from "./token.service";
import {UserAuthDto} from "./dto/user-auth.dto";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private tokenService: TokenService) {}

    async register(userDto: UserCredentialsDto) {
        const candidate = await this.userService.getOneUser(userDto.email)
        if(candidate) {
            throw new HttpException(`User with email: '${userDto.email}' is already exist.`, HttpStatus.BAD_REQUEST)
        }

        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(userDto.password, salt)

        const user = await this.userService.createUser({...userDto, password: hashPassword})

        const payload = this.makePayload(user)

        const tokens = this.tokenService.generateTokens(payload)
        await this.tokenService.save(payload._id, tokens.refreshToken)

        return {
            ...tokens,
            user: payload
        }
    }

    async login(user: User) {
        const payload = this.makePayload(user)

        const tokens = await this.tokenService.generateTokens(payload)
        await this.tokenService.save(payload._id, tokens.refreshToken)

        return {
            ...tokens,
            user: payload
        }
    }

    async validateUser(userDto: UserCredentialsDto) : Promise<User> {
        const user = await this.userService.getOneUser(userDto.email)
        if(!user) {
            throw new HttpException(`User with this email: '${userDto.email}' - is not exist.`, HttpStatus.BAD_REQUEST)
        }

        const isPasswordsEqual = await bcrypt.compare(userDto.password, user.password)
        if(!isPasswordsEqual) {
            throw new UnauthorizedException('Incorrect password.')
        }

        return user
    }

    async refresh(user: User) : Promise<UserAuthDto> {
        const payload = this.makePayload(user)

        const tokens = this.tokenService.generateTokens(payload)
        await this.tokenService.save(payload._id, tokens.refreshToken)

        return {
            ...tokens,
            user: payload
        }
    }

    private makePayload(user: any) : UserDto {
        return {
            _id: user._id,
            email: user.email,
            profile: user.profile
        }
    }
}
