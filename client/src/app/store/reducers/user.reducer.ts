import { createReducer, on } from "@ngrx/store"
import { UserRestricted } from "src/app/models/user.restricted"
import { user } from "../actions/user.actions"

export interface UserState {
    user?: UserRestricted,
    token?: string
};

export const userState: UserState = {
    user: undefined,
    token: undefined
};

export const userReducer = createReducer(
    userState,
    on(user.loggedIn, (state, data) => ({ ...state, ...data })),
    on(user.loggedOut, (state, data) => ({ ...state, ...data }))
);