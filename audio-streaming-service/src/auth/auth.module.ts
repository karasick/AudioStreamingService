import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {Token, TokenSchema} from "./schemas/token.model";
import {TokenService} from "./token.service";
import {JwtRefreshStrategy} from "./strategies/jwt-refresh.strategy";

@Module({
  providers: [
      AuthService,
      TokenService,
      LocalStrategy,
      JwtStrategy,
      JwtRefreshStrategy
  ],
  imports: [
      UserModule,
      PassportModule,
      JwtModule.register({}),
      MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}]),
  ],
  controllers: [AuthController]
})
export class AuthModule {}
