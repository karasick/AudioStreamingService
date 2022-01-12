import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Token, TokenDocument} from "./schemas/token.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId, Types} from "mongoose";
import {jwtConstants} from "./constants";
import {TokensDto} from "./dto/tokens.dto";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class TokenService {
    constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
                private jwtService: JwtService) {}

    generateTokens(payload : UserDto) : TokensDto {
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: jwtConstants.secretAccessKey,
                expiresIn: jwtConstants.accessExpiresIn
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: jwtConstants.secretRefreshKey,
                expiresIn: jwtConstants.refreshExpiresIn
            })
        }
    }

    async save(userId: string, refreshToken: string) {
        const userObjectId = new Types.ObjectId(userId)
        const token = await this.tokenModel.findOne({user: userObjectId})
        if(token) {
            token.refreshToken = refreshToken

            return token.save()
        }

        const newToken = await this.tokenModel.create({
            user: userId,
            refreshToken
        })

        return newToken
    }

    async remove(refreshToken) {
        const token = await this.tokenModel.deleteOne({refreshToken})

        return token
    }

    async getOneToken(filter) : Promise<Token> {
        const token = await this.tokenModel.findOne(filter).exec()

        return token
    }

    async getOneTokenById(id: ObjectId) : Promise<Token> {
        const token = this.tokenModel.findById(id)

        return token
    }
}
