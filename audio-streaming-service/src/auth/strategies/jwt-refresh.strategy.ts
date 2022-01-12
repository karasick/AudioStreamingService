import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {HttpException, Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import {jwtConstants} from "../constants";
import {Request} from "express";
import {TokenService} from "../token.service";
import {UserService} from "../../user/user.service";
import {Schema, Types} from "mongoose";
import {UserDto} from "../../user/dto/user.dto";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly tokenService: TokenService,
                private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.refreshToken
            }]),
            secretOrKey: jwtConstants.secretRefreshKey,
            ignoreExpiration: false,
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: UserDto) {
        const refreshToken = request.cookies?.refreshToken
        if(!payload || !refreshToken) {
            throw new UnauthorizedException('Invalid refresh token.')
        }

        const tokenFromDb = await this.tokenService.getOneToken({refreshToken})
        if(!tokenFromDb) {
            throw new UnauthorizedException('Refresh token already expired.')
        }

        const user = await this.userService.getUserById(payload._id)
        if(!user) {
            throw new InternalServerErrorException()
        }

        return user
    }
}