import { UserRestricted } from "./user.restricted";

export interface UserLoginResponse {
    user: UserRestricted,
    token: string
}