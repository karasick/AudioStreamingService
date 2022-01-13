import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";
import {PolicyHandler} from "./policy.interface";
import {CHECK_POLICIES_KEY} from "./policy.decorator";
import {Reflector} from "@nestjs/core";
import {AppAbility, CaslAbilityFactory} from "./casl-ability.factory";

export class PolicyGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private caslAbilityFactor: CaslAbilityFactory) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const policyHandlers = this.reflector.get<PolicyHandler[]>(
            CHECK_POLICIES_KEY,
            context.getHandler()
        ) || []

        const {user} = context.switchToHttp().getRequest()
        const ability = this.caslAbilityFactor.createForUser(user)

        return policyHandlers.every((handler) => {
            this.execPolicyHandler(handler, ability)
        })
    }

    private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
        if(typeof handler === 'function') {
            return handler(ability)
        }

        return handler.handle(ability)
    }

}