import {Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects} from "@casl/ability";
import {User} from "../user/schemas/user.model";
import {Injectable} from "@nestjs/common";
import {Action} from "./action";
import {UserType, UserTypes} from "../user/user-types";
import {Track} from "../track/schemas/track.model";

type Subjects = InferSubjects<typeof User | typeof Track> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const {can, cannot, build } = new AbilityBuilder<
                Ability<[Action, Subjects]>
            >(Ability as AbilityClass<AppAbility>)

        const userType = UserTypes.getType(user.type)

        if(userType == UserType.ADMIN) {
            can(Action.Manage, 'all')
        }
        else {
            can(Action.Listen, 'all')
        }

        return build({
            detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
        })
    }
}
