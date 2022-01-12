import { Injectable } from '@nestjs/common';
import {User, UserDocument} from "./schemas/user.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {UserCredentialsDto} from "./dto/user-credentials.dto";
import {Profile, ProfileDocument} from "./schemas/profile.model";
import * as uuid from "uuid"

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

    async createUser(dto: UserCredentialsDto): Promise<User> {
        const user = new this.userModel(dto)
        const profile = new this.profileModel({
            username: this.getUniqueUsername()
        })

        user.profile = profile
        await user.save()
        await profile.save()

        return user
    }

    private getUniqueUsername() : string {
        return uuid.v4().replace('-', '')
    }

    async getAllUsers() : Promise<User[]> {
        const users = this.userModel.find().exec()
        return users
    }

    async getOneUser(email: string) : Promise<User> {
        const user = this.userModel.findOne({email}).populate('profile').exec()
        return user
    }

    async getUserById(id: string) : Promise<User> {
        const user = this.userModel.findById(id).populate('profile').exec()
        return  user
    }
}
