import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { StoreSources } from "../store.module";

export enum UserActionEvents {
    LOG_IN = "Logged in",
    LOG_OUT = "Logged out",
    CREATE = "Created",
    EDIT = "Edited",
    DELETE = "Deleted"
};

export interface UserAuthenticationAction {
    userId: string,
    userDisplayName: string,
    authenticated: boolean,
};

export const user = createActionGroup({
    source: StoreSources.USER,
    events: {
        [UserActionEvents.CREATE]: props<any>(),
        [UserActionEvents.EDIT]: props<any>(),
        [UserActionEvents.DELETE]: emptyProps(),
        [UserActionEvents.LOG_IN]: props<UserAuthenticationAction>(),
        [UserActionEvents.LOG_OUT]: props<UserAuthenticationAction>(),
    }
});