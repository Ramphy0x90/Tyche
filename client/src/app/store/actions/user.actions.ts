import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { StoreSources } from "../store.module";
import { UserLoginResponse } from "src/app/models/user-login-response";

export enum UserActionEvents {
    LOG_IN = "Logged in",
    LOG_OUT = "Logged out",
    CREATE = "Created",
    EDIT = "Edited",
    DELETE = "Deleted"
};

export const user = createActionGroup({
    source: StoreSources.USER,
    events: {
        [UserActionEvents.CREATE]: props<any>(),
        [UserActionEvents.EDIT]: props<any>(),
        [UserActionEvents.DELETE]: emptyProps(),
        [UserActionEvents.LOG_IN]: props<UserLoginResponse>(),
        [UserActionEvents.LOG_OUT]: emptyProps(),
    }
});