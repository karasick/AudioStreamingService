import {PolicyHandler} from "./policy.interface";
import {SetMetadata} from "@nestjs/common";

export const CHECK_POLICIES_KEY = 'check-policy'
export const CheckPolicies = (...abilities: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, abilities)