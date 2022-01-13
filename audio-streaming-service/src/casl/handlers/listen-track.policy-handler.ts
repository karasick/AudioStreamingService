import {IPolicyHandler} from "../policy.interface";
import {AppAbility} from "../casl-ability.factory";
import {Action} from "../action";
import {Track} from "../../track/schemas/track.model";

export class ListenTrackPolicyHandler implements IPolicyHandler {
    handle(ability: AppAbility): boolean {
        return ability.can(Action.Listen, Track)
    }

}