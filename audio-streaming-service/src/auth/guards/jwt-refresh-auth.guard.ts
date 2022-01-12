import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}