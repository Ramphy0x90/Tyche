import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<UserState>("user");
export const selectUserIsLogged = createSelector(
    selectUserState,
    (state: UserState) => !!(state?.user && state?.token)
);