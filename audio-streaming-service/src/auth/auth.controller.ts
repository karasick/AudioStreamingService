import {Controller, Request, Post, UseGuards, Get, Body, Response} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {Public} from "./decorators/public.decorator";
import {UserCredentialsDto} from "../user/dto/user-credentials.dto";
import {JwtRefreshAuthGuard} from "./guards/jwt-refresh-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() userDto: UserCredentialsDto, @Response({passthrough: true}) res) {
        const userData = await this.authService.register(userDto)

        this.setRefreshCookie(res, userData)

        return userData
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response({passthrough: true}) res) {
        const userData = await this.authService.login(req.user)

        this.setRefreshCookie(res, userData)

        return userData
    }

    @Get('verify')
    verify(@Request() req) {
        return req.user
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Get('refresh')
    async refresh(@Request() req, @Response({passthrough: true}) res) {
        const userData = await this.authService.refresh(req.user)

        this.setRefreshCookie(res, userData)
        return userData
    }


    private setRefreshCookie(res, userData) {
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    }
}
